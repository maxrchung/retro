import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument, ScanCommandInput } from '@aws-sdk/lib-dynamodb'

const TABLE_NAME = process.env.RETRO_TABLE || 'retro-table'
const DEFAULT_OUTPUT_PATH = path.join(__dirname, '../tmp/retro-export.json')

const isValidDateValue = (value: unknown): boolean => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return false
  }
  return !Number.isNaN(Date.parse(value))
}

const scanAllItems = async (
  docClient: DynamoDBDocument
): Promise<Record<string, unknown>[]> => {
  const items: Record<string, unknown>[] = []
  let lastEvaluatedKey: Record<string, unknown> | undefined
  let page = 0

  do {
    page += 1
    const params: ScanCommandInput = {
      TableName: TABLE_NAME,
      ExclusiveStartKey: lastEvaluatedKey
    }
    const response = await docClient.scan(params)
    const batch = (response.Items ?? []) as Record<string, unknown>[]
    items.push(...batch)
    lastEvaluatedKey = response.LastEvaluatedKey as
      | Record<string, unknown>
      | undefined
    console.log(
      `Scanned page ${page}: ${batch.length} items (total ${items.length})`
    )
  } while (lastEvaluatedKey)

  return items
}

const auditItems = (items: Record<string, unknown>[]): void => {
  const missingId: number[] = []
  const missingName: string[] = []
  const missingColumns: string[] = []
  const missingShowPosts: string[] = []
  const invalidDates: string[] = []
  const postsMissingLikes: string[] = []

  let earliestCreatedAt: number | undefined
  let latestCreatedAt: number | undefined
  let earliestLastUpdated: number | undefined
  let latestLastUpdated: number | undefined

  items.forEach((item, index) => {
    const id =
      typeof item.id === 'string' && item.id.length > 0 ? item.id : undefined
    if (!id) {
      missingId.push(index)
    }
    const label = id ?? `index:${index}`

    if (typeof item.name !== 'string') {
      missingName.push(label)
    }
    if (!Array.isArray(item.columns)) {
      missingColumns.push(label)
    } else {
      for (const column of item.columns) {
        if (
          column &&
          typeof column === 'object' &&
          Array.isArray((column as { posts?: unknown }).posts)
        ) {
          const posts = (column as { posts: unknown[] }).posts
          for (const post of posts) {
            if (
              post &&
              typeof post === 'object' &&
              !Array.isArray((post as { likes?: unknown }).likes)
            ) {
              postsMissingLikes.push(label)
              break
            }
          }
        }
      }
    }
    if (typeof item.showPosts !== 'boolean') {
      missingShowPosts.push(label)
    }

    const dateFields = ['createdAt', 'lastUpdated', 'lastViewed', 'timerEnd']
    if (dateFields.some((field) => !isValidDateValue(item[field]))) {
      invalidDates.push(label)
    }

    if (isValidDateValue(item.createdAt)) {
      const ts = Date.parse(item.createdAt as string)
      earliestCreatedAt =
        earliestCreatedAt === undefined ? ts : Math.min(earliestCreatedAt, ts)
      latestCreatedAt =
        latestCreatedAt === undefined ? ts : Math.max(latestCreatedAt, ts)
    }
    if (isValidDateValue(item.lastUpdated)) {
      const ts = Date.parse(item.lastUpdated as string)
      earliestLastUpdated =
        earliestLastUpdated === undefined
          ? ts
          : Math.min(earliestLastUpdated, ts)
      latestLastUpdated =
        latestLastUpdated === undefined ? ts : Math.max(latestLastUpdated, ts)
    }
  })

  console.log('\n--- DynamoDB Export Audit ---')
  console.log(`Table: ${TABLE_NAME}`)
  console.log(`Total items: ${items.length}`)
  console.log(
    `createdAt range: ${
      earliestCreatedAt ? new Date(earliestCreatedAt).toISOString() : 'n/a'
    } .. ${latestCreatedAt ? new Date(latestCreatedAt).toISOString() : 'n/a'}`
  )
  console.log(
    `lastUpdated range: ${
      earliestLastUpdated ? new Date(earliestLastUpdated).toISOString() : 'n/a'
    } .. ${
      latestLastUpdated ? new Date(latestLastUpdated).toISOString() : 'n/a'
    }`
  )
  console.log(
    `Missing/empty id (${missingId.length}): ${missingId.join(', ') || 'none'}`
  )
  console.log(
    `Missing name (${missingName.length}): ${missingName.join(', ') || 'none'}`
  )
  console.log(
    `Non-array columns (${missingColumns.length}): ${
      missingColumns.join(', ') || 'none'
    }`
  )
  console.log(
    `Missing showPosts (${missingShowPosts.length}): ${
      missingShowPosts.join(', ') || 'none'
    }`
  )
  console.log(
    `Missing/invalid dates (${invalidDates.length}): ${
      invalidDates.join(', ') || 'none'
    }`
  )
  console.log(
    `Posts missing likes (${postsMissingLikes.length}): ${
      postsMissingLikes.join(', ') || 'none'
    }`
  )
}

async function main(): Promise<void> {
  const outputPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : DEFAULT_OUTPUT_PATH

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || undefined,
    endpoint: process.env.DYNAMODB_ENDPOINT || undefined
  })
  const docClient = DynamoDBDocument.from(client)

  const items = await scanAllItems(docClient)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf8')

  auditItems(items)
  console.log(`\nWrote export to: ${outputPath}`)
}

main().catch((err) => {
  console.error('Export failed:', err)
  process.exit(1)
})
