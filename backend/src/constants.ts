// In production, get environment variabes
// In development, use local DDB endpoint
export const DYNAMODB_CREDENTIALS =
  process.env.NODE_ENV === 'production'
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
      }
    : undefined
export const DYNAMODB_ENDPOINT =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000'

export const RETRO_TABLE = 'retro-table'
export const COLUMNS_UPDATED_SUBSCRIPTION = 'columns-updated'
export const OPTIONS_UPDATED_SUBSCRIPTION = 'options-updated'
export const RETRO_REMOVED_SUBSCRIPTION = 'retro-removed'
export const RETRO_CONNECTION_ID = 'retro-connection-id'
