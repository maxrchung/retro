import { uid } from 'uid'
import { RETRO_TABLE } from './constants'
import { Column, Retro } from './types'
import { DynamoDBDocument, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb'

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
    throw new Error("Couldn't find retro")
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
            content: 'Update the retro :)'
          }
        ]
      }
    ],
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

export const updateDbColumns = (
  client: DynamoDBDocument,
  retroId: string,
  columns: Array<Column>
): Promise<UpdateCommandOutput> =>
  client.update({
    TableName: RETRO_TABLE,
    Key: {
      id: retroId
    },
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET #columns = :columns, #lastUpdated = :lastUpdated',
    ExpressionAttributeNames: {
      '#columns': 'columns',
      '#lastUpdated': 'lastUpdated'
    },
    ExpressionAttributeValues: {
      ':columns': columns,
      ':lastUpdated': new Date().toISOString()
    }
  })
