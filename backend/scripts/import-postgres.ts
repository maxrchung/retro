import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'
import { Column, Post, Retro } from '../src/types'

const DEFAULT_INPUT_PATH = path.join(__dirname, '../tmp/retro-export.json')

const parseArgs = (argv: string[]): { inputPath: string; dryRun: boolean } => {
  let dryRun = false
  let inputPath = DEFAULT_INPUT_PATH

  for (const arg of argv) {
    if (arg === '--dry-run') {
      dryRun = true
    } else if (!arg.startsWith('--')) {
      inputPath = path.resolve(arg)
    } else {
      throw new Error(`Unknown flag: ${arg}`)
    }
  }

  return { inputPath, dryRun }
}

const shouldUseSsl = (databaseUrl: string): boolean => {
  if (
    process.env.PGSSLMODE === 'require' ||
    databaseUrl.includes('sslmode=require')
  ) {
    return true
  }
  try {
    const hostname = new URL(databaseUrl).hostname
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.railway.internal')
    ) {
      return false
    }
    return true
  } catch {
    return false
  }
}

const parseIsoOrFallback = (
  value: unknown,
  fallbackIso: string
): { iso: string; normalized: boolean } => {
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Date.parse(value)
    if (!Number.isNaN(parsed)) {
      return { iso: new Date(parsed).toISOString(), normalized: false }
    }
  }
  return { iso: fallbackIso, normalized: true }
}

const normalizePosts = (rawPosts: unknown, notes: string[]): Post[] => {
  if (!Array.isArray(rawPosts)) {
    notes.push('posts')
    return []
  }

  return rawPosts.map((rawPost, postIndex) => {
    const post = (
      rawPost && typeof rawPost === 'object' ? rawPost : {}
    ) as Record<string, unknown>
    if (!Array.isArray(post.likes)) {
      notes.push(`post[${postIndex}].likes`)
    }
    return {
      id:
        typeof post.id === 'string' && post.id.length > 0
          ? post.id
          : `post-${postIndex}`,
      content: typeof post.content === 'string' ? post.content : '',
      author: typeof post.author === 'string' ? post.author : '',
      likes: Array.isArray(post.likes)
        ? post.likes.filter((like): like is string => typeof like === 'string')
        : []
    }
  })
}

const normalizeColumns = (rawColumns: unknown, notes: string[]): Column[] => {
  if (!Array.isArray(rawColumns)) {
    notes.push('columns')
    return []
  }

  return rawColumns.map((rawColumn, colIndex) => {
    const col = (
      rawColumn && typeof rawColumn === 'object' ? rawColumn : {}
    ) as Record<string, unknown>
    return {
      id:
        typeof col.id === 'string' && col.id.length > 0
          ? col.id
          : `col-${colIndex}`,
      name: typeof col.name === 'string' ? col.name : '',
      posts: normalizePosts(col.posts, notes)
    }
  })
}

const normalizeRetro = (
  rawItem: unknown,
  index: number,
  nowIso: string
): { retro: Retro; normalizedFields: string[] } => {
  if (!rawItem || typeof rawItem !== 'object') {
    throw new Error(`Item at index ${index} is not an object`)
  }
  const item = rawItem as Record<string, unknown>
  if (typeof item.id !== 'string' || item.id.trim().length === 0) {
    throw new Error(`Item at index ${index} is missing a valid string id`)
  }

  const normalizedFields: string[] = []
  const name =
    typeof item.name === 'string'
      ? item.name
      : (normalizedFields.push('name'), 'My retro')

  const showPosts =
    typeof item.showPosts === 'boolean'
      ? item.showPosts
      : (normalizedFields.push('showPosts'), true)

  const created = parseIsoOrFallback(item.createdAt, nowIso)
  if (created.normalized) normalizedFields.push('createdAt')

  const lastUpdated = parseIsoOrFallback(item.lastUpdated, created.iso)
  if (lastUpdated.normalized) normalizedFields.push('lastUpdated')

  const lastViewed = parseIsoOrFallback(item.lastViewed, lastUpdated.iso)
  if (lastViewed.normalized) normalizedFields.push('lastViewed')

  const timerEnd = parseIsoOrFallback(item.timerEnd, created.iso)
  if (timerEnd.normalized) normalizedFields.push('timerEnd')

  const columns = normalizeColumns(item.columns, normalizedFields)

  return {
    retro: {
      id: item.id,
      name,
      columns,
      showPosts,
      createdAt: created.iso,
      lastUpdated: lastUpdated.iso,
      lastViewed: lastViewed.iso,
      timerEnd: timerEnd.iso
    },
    normalizedFields
  }
}

async function main(): Promise<void> {
  const { inputPath, dryRun } = parseArgs(process.argv.slice(2))

  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL environment variable is required to run import-postgres.ts'
    )
  }

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Export file not found: ${inputPath}`)
  }

  const rawText = fs.readFileSync(inputPath, 'utf8')
  const parsed: unknown = JSON.parse(rawText)
  if (!Array.isArray(parsed)) {
    throw new Error(`Expected JSON array in ${inputPath}`)
  }

  const nowIso = new Date().toISOString()
  const normalizedRetros: Retro[] = []
  let normalizedCount = 0

  parsed.forEach((rawItem, index) => {
    const { retro, normalizedFields } = normalizeRetro(rawItem, index, nowIso)
    if (normalizedFields.length > 0) {
      normalizedCount += 1
      console.log(
        `Normalized retro ${retro.id}: ${Array.from(
          new Set(normalizedFields)
        ).join(', ')}`
      )
    }
    normalizedRetros.push(retro)
  })

  const pool = new Pool({
    connectionString: databaseUrl,
    max: 1,
    connectionTimeoutMillis: 15000,
    ssl: shouldUseSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined
  })

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    for (const retro of normalizedRetros) {
      await client.query(
        `INSERT INTO retros (id, name, columns, show_posts, created_at, last_updated, last_viewed, timer_end)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           columns = EXCLUDED.columns,
           show_posts = EXCLUDED.show_posts,
           created_at = EXCLUDED.created_at,
           last_updated = EXCLUDED.last_updated,
           last_viewed = EXCLUDED.last_viewed,
           timer_end = EXCLUDED.timer_end`,
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
    }

    const countResult = await client.query<{ count: number }>(
      'SELECT COUNT(*)::int AS count FROM retros'
    )
    const tableCount = countResult.rows[0]?.count ?? 0

    if (dryRun) {
      await client.query('ROLLBACK')
      console.log(
        `\n[DRY RUN] Upserted ${normalizedRetros.length} retros (${normalizedCount} normalized). Count inside rolled-back tx: ${tableCount}. No changes committed.`
      )
    } else {
      await client.query('COMMIT')
      console.log(
        `\nCommitted ${normalizedRetros.length} retros (${normalizedCount} normalized). Total rows in retros table: ${tableCount}.`
      )
    }
  } catch (err) {
    await client.query('ROLLBACK').catch(() => undefined)
    throw err
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
