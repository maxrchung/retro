import { PubSub, withFilter } from 'apollo-server'
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
  Resolvers,
  Retro
} from './types'
import { generateUid } from './utils'

const retro: Retro = {
  id: 'test-id',
  columns: [
    {
      id: 'column-id',
      name: 'Column',
      posts: [
        {
          id: 'post-id',
          content: 'Post'
        }
      ]
    }
  ]
}

const pubsub = new PubSub()

const publish = (retro: Retro): boolean => {
  pubsub.publish('retro-updated', { retroUpdated: retro })
  return true
}

// Casting to never because there's an issue with subscription resolver type
// https://github.com/dotansimha/graphql-code-generator/issues/7197
const subscribe = withFilter(
  () => pubsub.asyncIterator('retro-updated'),
  (payload, variables) => payload.retroUpdated.id === variables.retroId
) as never

const getRetro = () => retro

const createRetro = (
  parent: unknown,
  args: unknown,
  context: ServerContext
) => {
  return ''
}

const createColumn = (parent: unknown, args: MutationCreateColumnArgs) => {
  const id = generateUid(retro.columns)
  retro.columns.push({
    id,
    name: args.columnName,
    posts: []
  })
  return publish(retro)
}

const createPost = (parent: unknown, args: MutationCreatePostArgs) => {
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    return false
  }
  const id = generateUid(column.posts)
  const post = {
    id,
    content: args.postContent
  }
  column.posts.push(post)
  return publish(retro)
}

const updateColumnName = (
  parent: unknown,
  args: MutationUpdateColumnNameArgs
) => {
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    return false
  }
  column.name = args.columnName
  return publish(retro)
}

const updatePostContent = (
  parent: unknown,
  args: MutationUpdatePostContentArgs
) => {
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    return false
  }
  const post = column.posts.find((post) => post.id === args.postId)
  if (!post) {
    return false
  }
  post.content = args.postContent
  return publish(retro)
}

const moveColumn = (parent: unknown, args: MutationMoveColumnArgs) => {
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
  return publish(retro)
}

const movePost = (parent: unknown, args: MutationMovePostArgs) => {
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

  return publish(retro)
}

const removeColumn = (parent: unknown, args: MutationRemoveColumnArgs) => {
  const columnIndex = retro.columns.findIndex(
    (column) => column.id === args.columnId
  )
  if (columnIndex < 0) {
    return false
  }
  retro.columns.splice(columnIndex, 1)
  return publish(retro)
}

const removePost = (parent: unknown, args: MutationRemovePostArgs) => {
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    return false
  }
  const postIndex = column.posts.findIndex((post) => post.id === args.postId)
  if (postIndex < 0) {
    return false
  }
  column.posts.splice(postIndex, 1)
  return publish(retro)
}

const resolvers: Resolvers<ServerContext> = {
  Subscription: {
    retroUpdated: {
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
