import { Pool } from 'pg'
import { UserInputError } from 'apollo-server'
import { uid } from 'uid'
import { Column, Retro } from './types'

interface DbRetro {
  id: string
  name: string
  columns: Column[]
  show_posts: boolean
  created_at: Date
  last_updated: Date
  last_viewed: Date
  timer_end: Date
}

export const getDbRetro = async (client: Pool, id: string): Promise<Retro> => {
  const result = await client.query<DbRetro>(
    'UPDATE retros SET last_viewed = NOW() WHERE id = $1 RETURNING id, name, columns, show_posts, created_at, last_updated, last_viewed, timer_end',
    [id]
  )
  if (result.rowCount === 0) {
    throw new UserInputError('Retro not found')
  }
  const row = result.rows[0]
  return {
    id: row.id,
    name: row.name,
    columns: row.columns,
    showPosts: row.show_posts,
    createdAt: row.created_at.toISOString(),
    lastUpdated: row.last_updated.toISOString(),
    lastViewed: row.last_viewed.toISOString(),
    timerEnd: row.timer_end.toISOString()
  }
}

const createDefaultRetro = (columns: Column[]): Retro => {
  const isoDate = new Date().toISOString()
  return {
    id: uid(),
    name: 'My retro',
    columns,
    showPosts: true,
    createdAt: isoDate,
    lastUpdated: isoDate,
    lastViewed: isoDate,
    timerEnd: isoDate
  }
}

export const createDbRetro = async (
  client: Pool,
  columnNames: string[]
): Promise<string> => {
  const columns: Column[] = columnNames.map((column) => ({
    id: column,
    name: column,
    posts:
      // Lol this is probably not a good idea but it's current design
      column === 'Action items'
        ? [
          {
            id: 'Update the retro :)',
            content: 'Update the retro :)',
            author: 'retro',
            likes: []
          }
        ]
        : []
  }))
  const retro = createDefaultRetro(columns)
  await client.query(
    `INSERT INTO retros (id, name, columns, show_posts, created_at, last_updated, last_viewed, timer_end)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      retro.id,
      retro.name,
      JSON.stringify(retro.columns),
      retro.showPosts,
      retro.createdAt,
      retro.lastUpdated,
      retro.lastViewed,
      retro.timerEnd
    ]
  )
  return retro.id
}

export type UpdatableRetroAttribute =
  | 'columns'
  | 'name'
  | 'timerEnd'
  | 'showPosts'

export const updateDbRetro = async (
  client: Pool,
  retro: Retro,
  attributes: UpdatableRetroAttribute[]
): Promise<void> => {
  const isoDate = new Date().toISOString()
  const assignments: string[] = []
  const values: unknown[] = []

  for (const attribute of attributes) {
    switch (attribute) {
      case 'columns':
        values.push(JSON.stringify(retro.columns))
        assignments.push(`columns = $${values.length}`)
        break
      case 'name':
        values.push(retro.name)
        assignments.push(`name = $${values.length}`)
        break
      case 'timerEnd':
        values.push(retro.timerEnd)
        assignments.push(`timer_end = $${values.length}`)
        break
      case 'showPosts':
        values.push(retro.showPosts)
        assignments.push(`show_posts = $${values.length}`)
        break
    }
  }

  values.push(isoDate)
  const updatedIndex = values.length
  assignments.push(
    `last_updated = $${updatedIndex}`,
    `last_viewed = $${updatedIndex}`
  )

  values.push(retro.id)
  const idIndex = values.length

  const result = await client.query(
    `UPDATE retros SET ${assignments.join(', ')} WHERE id = $${idIndex}`,
    values
  )
  if (result.rowCount === 0) {
    throw new UserInputError('Retro not found')
  }
}

export const removeDbRetro = async (
  client: Pool,
  id: string
): Promise<boolean> => {
  await client.query('DELETE FROM retros WHERE id = $1', [id])
  return true
}

export const cloneDbRetro = async (
  client: Pool,
  oldRetro: Retro
): Promise<string> => {
  const newRetro = createDefaultRetro(oldRetro.columns)
  newRetro.name = oldRetro.name
  await client.query(
    `INSERT INTO retros (id, name, columns, show_posts, created_at, last_updated, last_viewed, timer_end)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      newRetro.id,
      newRetro.name,
      JSON.stringify(newRetro.columns),
      newRetro.showPosts,
      newRetro.createdAt,
      newRetro.lastUpdated,
      newRetro.lastViewed,
      newRetro.timerEnd
    ]
  )
  return newRetro.id
}
