import { PubSub, withFilter } from 'apollo-server'
import { uid } from 'uid'
import { ServerContext } from './server'
import {
  ColumnMoveDirection,
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  MutationMoveColumnArgs,
  MutationMovePostArgs,
  MutationRemoveColumnArgs,
  MutationRemovePostArgs,
  MutationUpdateColumnNameArgs,
  MutationUpdatePostContentArgs,
  PostMoveDirection,
  QueryGetRetroArgs,
  Resolvers,
  Retro
} from './types'
import { createDbRetro, getDbRetro, updateDbColumns } from './db'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { COLUMNS_UPDATED_SUBSCRIPTION } from './constants'

// TODO: Move PubSub into DDB as this won't be able to scale with multiple containers
const pubsub = new PubSub()

const publishColumns = (client: DynamoDBDocument, retro: Retro): boolean => {
  updateDbColumns(client, retro.id, retro.columns)
  pubsub.publish(COLUMNS_UPDATED_SUBSCRIPTION, {
    // We have to include retro id so that filtering can send to the correct clients
    columnsUpdated: retro
  })
  return true
}

// Casting to never because there's an issue with subscription resolver type
// https://github.com/dotansimha/graphql-code-generator/issues/7197
const subscribe = withFilter(
  () => pubsub.asyncIterator(COLUMNS_UPDATED_SUBSCRIPTION),
  (payload, variables) => payload.columnsUpdated.id === variables.retroId
) as never

const getRetro = async (
  parent: unknown,
  args: QueryGetRetroArgs,
  { client }: ServerContext
) => await getDbRetro(client, args.retroId)

const createRetro = async (
  parent: unknown,
  args: unknown,
  { client }: ServerContext
) => await createDbRetro(client)

const createColumn = async (
  parent: unknown,
  args: MutationCreateColumnArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  retro.columns.push({
    id: uid(),
    name: args.columnName,
    posts: []
  })
  return publishColumns(client, retro)
}

const createPost = async (
  parent: unknown,
  args: MutationCreatePostArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    return false
  }
  const post = {
    id: uid(),
    content: args.postContent
  }
  column.posts.push(post)
  return publishColumns(client, retro)
}

const updateColumnName = async (
  parent: unknown,
  args: MutationUpdateColumnNameArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    return false
  }
  column.name = args.columnName
  return publishColumns(client, retro)
}

const updatePostContent = async (
  parent: unknown,
  args: MutationUpdatePostContentArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    return false
  }
  const post = column.posts.find((post) => post.id === args.postId)
  if (!post) {
    return false
  }
  post.content = args.postContent
  return publishColumns(client, retro)
}

const moveColumn = async (
  parent: unknown,
  args: MutationMoveColumnArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  const oldColumnIndex = retro.columns.findIndex(
    (column) => column.id === args.oldColumnId
  )
  if (oldColumnIndex < 0) {
    return false
  }
  const oldColumn = retro.columns.splice(oldColumnIndex, 1)[0]

  const targetColumnIndex = retro.columns.findIndex(
    (column) => column.id === args.targetColumnId
  )
  retro.columns.splice(
    targetColumnIndex +
      (args.columnMoveDirection === ColumnMoveDirection.Left ? 0 : 1),
    0,
    oldColumn
  )
  return publishColumns(client, retro)
}

const movePost = async (
  parent: unknown,
  args: MutationMovePostArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  const oldColumn = retro.columns.find(
    (column) => column.id === args.oldColumnId
  )
  if (!oldColumn) {
    return false
  }
  const oldPostIndex = oldColumn.posts.findIndex(
    (post) => post.id === args.oldPostId
  )
  if (oldPostIndex < 0) {
    return false
  }
  const oldPost = oldColumn.posts.splice(oldPostIndex, 1)[0]

  const targetColumn = retro.columns.find(
    (column) => column.id === args.targetColumnId
  )
  if (!targetColumn) {
    return false
  }

  if (args.targetPostId && args.targetPostId.length > 0) {
    const targetPostIndex = targetColumn.posts.findIndex(
      (post) => post.id === args.targetPostId
    )
    targetColumn.posts.splice(
      targetPostIndex +
        (args.postMoveDirection === PostMoveDirection.Top ? 0 : 1),
      0,
      oldPost
    )
  } else if (args.postMoveDirection === PostMoveDirection.Top) {
    targetColumn.posts.unshift(oldPost)
  } else {
    targetColumn.posts.push(oldPost)
  }

  return publishColumns(client, retro)
}

const removeColumn = async (
  parent: unknown,
  args: MutationRemoveColumnArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  const columnIndex = retro.columns.findIndex(
    (column) => column.id === args.columnId
  )
  if (columnIndex < 0) {
    return false
  }
  retro.columns.splice(columnIndex, 1)
  return publishColumns(client, retro)
}

const removePost = async (
  parent: unknown,
  args: MutationRemovePostArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    return false
  }
  const postIndex = column.posts.findIndex((post) => post.id === args.postId)
  if (postIndex < 0) {
    return false
  }
  column.posts.splice(postIndex, 1)
  return publishColumns(client, retro)
}

const resolvers: Resolvers<ServerContext> = {
  Subscription: {
    columnsUpdated: {
      subscribe
    }
  },
  Query: {
    getRetro
  },
  Mutation: {
    createRetro,
    createColumn,
    createPost,
    updateColumnName,
    updatePostContent,
    moveColumn,
    movePost,
    removeColumn,
    removePost
  }
}

export default resolvers
