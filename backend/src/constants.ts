export const DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://retro:retro@localhost:5433/retro'

export const COLUMNS_UPDATED_SUBSCRIPTION = 'columns-updated'
export const OPTIONS_UPDATED_SUBSCRIPTION = 'options-updated'
export const RETRO_REMOVED_SUBSCRIPTION = 'retro-removed'
export const RETRO_CONNECTION_ID = 'retro-connection-id'
