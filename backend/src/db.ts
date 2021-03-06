import { uid } from 'uid'
import { RETRO_TABLE } from './constants'
import { Retro } from './types'
import { DynamoDBDocument, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb'
import { UserInputError } from 'apollo-server'

export const getDbRetro = async (
  client: DynamoDBDocument,
  id: string
): Promise<Retro> => {
  const response = await client.get({
    TableName: RETRO_TABLE,
    Key: {
      id
    }
  })

  if (!response.Item) {
    throw new UserInputError('Retro not found')
  }

  client.update({
    TableName: RETRO_TABLE,
    Key: {
      id
    },
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET #lastViewed = :lastViewed',
    ExpressionAttributeNames: { '#lastViewed': 'lastViewed' },
    ExpressionAttributeValues: { ':lastViewed': new Date().toISOString() }
  })

  return response.Item as Retro
}

const createDefaultRetro = (): Retro => {
  // Per DDB docs they recommend storing strings in ISO format
  const isoDate = new Date().toISOString()
  return {
    id: uid(),
    name: 'My simple retro',
    columns: [
      {
        id: 'a',
        name: 'What went well',
        posts: []
      },
      {
        id: 'b',
        name: 'What to improve',
        posts: []
      },
      {
        id: 'c',
        name: 'Action items',
        posts: [
          {
            id: 'd',
            content: 'Update the retro :)',
            author: 'retro',
            likes: []
          }
        ]
      }
    ],
    showPosts: true,
    createdAt: isoDate,
    lastUpdated: isoDate,
    lastViewed: isoDate,
    timerEnd: isoDate
  }
}

export const createDbRetro = async (
  client: DynamoDBDocument
): Promise<string> => {
  const retro = createDefaultRetro()
  await client.put({
    TableName: RETRO_TABLE,
    ConditionExpression: 'attribute_not_exists(id)',
    Item: retro
  })
  return retro.id
}

export const updateDbRetro = (
  client: DynamoDBDocument,
  retro: Retro,
  attributes: (keyof Retro)[]
): Promise<UpdateCommandOutput> => {
  const isoDate = new Date().toISOString()
  return client.update({
    TableName: RETRO_TABLE,
    Key: {
      id: retro.id
    },
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: `SET ${attributes
      .map((attribute) => `#${attribute} = :${attribute}`)
      .join(', ')}, #lastUpdated = :lastUpdated, #lastViewed = :lastViewed`,
    ExpressionAttributeNames: {
      ...attributes.reduce<Record<string, string>>((accumulator, attribute) => {
        accumulator[`#${attribute}`] = attribute
        return accumulator
      }, {}),
      '#lastUpdated': 'lastUpdated',
      '#lastViewed': 'lastViewed'
    },
    ExpressionAttributeValues: {
      ...attributes.reduce<Record<string, Retro[keyof Retro]>>(
        (accumulator, attribute) => {
          accumulator[`:${attribute}`] = retro[attribute]
          return accumulator
        },
        {}
      ),
      ':lastUpdated': isoDate,
      ':lastViewed': isoDate
    }
  })
}

export const removeDbRetro = async (
  client: DynamoDBDocument,
  id: string
): Promise<boolean> => {
  await client.delete({
    TableName: RETRO_TABLE,
    Key: {
      id
    }
  })
  return true
}

export const cloneDbRetro = async (
  client: DynamoDBDocument,
  oldRetro: Retro
): Promise<string> => {
  const newRetro = createDefaultRetro()
  newRetro.columns = oldRetro.columns
  newRetro.name = oldRetro.name
  await client.put({
    TableName: RETRO_TABLE,
    ConditionExpression: 'attribute_not_exists(id)',
    Item: newRetro
  })
  return newRetro.id
}
