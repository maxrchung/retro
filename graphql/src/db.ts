import { uid } from 'uid'
import { DEFAULT_COLUMNS, RETRO_TABLE } from './constants'
import { Retro } from './types'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

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
  return response.Item as Retro
}

export const createDbRetro = async (
  client: DynamoDBDocument
): Promise<string> => {
  const id = uid()
  await client.update({
    TableName: RETRO_TABLE,
    Key: {
      id
    },
    ConditionExpression: 'attribute_not_exists(retroId)',
    UpdateExpression: 'SET #columns = :columns',
    ExpressionAttributeNames: { '#columns': 'columns' },
    ExpressionAttributeValues: { ':columns': DEFAULT_COLUMNS }
  })
  return id
}

export const updateDbRetro = async (
  client: DynamoDBDocument,
  retro: Retro
): Promise<Retro> => {
  await client.update({
    TableName: RETRO_TABLE,
    Key: {
      id: retro.id
    },
    UpdateExpression: 'SET #columns = :columns',
    ExpressionAttributeNames: { '#columns': 'columns' },
    ExpressionAttributeValues: { ':columns': DEFAULT_COLUMNS }
  })
  return retro
}
