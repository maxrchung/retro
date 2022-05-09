import { uid } from 'uid'
import { DEFAULT_COLUMNS, RETRO_TABLE } from './constants'
import { Retro } from './types'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

export const getDbRetro = async (
  client: DynamoDBDocument,
  retroId: string
): Promise<Retro> => {
  const response = await client.get({
    TableName: RETRO_TABLE,
    Key: {
      retroId
    }
  })
  return response.Item as Retro
}

export const createDbRetro = async (
  client: DynamoDBDocument
): Promise<string> => {
  const retroId = uid()
  await client.update({
    TableName: RETRO_TABLE,
    Key: {
      retroId
    },
    ConditionExpression: 'attribute_not_exists(retroId)',
    UpdateExpression: 'SET columns = :columns',
    ExpressionAttributeValues: {
      ':columns': DEFAULT_COLUMNS
    }
  })
  return retroId
}

export const updateDbRetro = async (
  client: DynamoDBDocument,
  retro: Retro
): Promise<Retro> => {
  await client.update({
    TableName: RETRO_TABLE,
    Key: {
      retroId: retro.id
    },
    UpdateExpression: 'SET columns = :columns',
    ExpressionAttributeValues: {
      ':columns': DEFAULT_COLUMNS
    }
  })
  return retro
}
