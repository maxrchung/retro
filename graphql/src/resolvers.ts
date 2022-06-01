import { PubSub, UserInputError, withFilter } from 'apollo-server'
import { uid } from 'uid'
import { ServerContext } from './server'
import {
  ColumnMoveDirection,
  MutationClearColumnArgs,
  MutationClearRetroArgs,
  MutationCloneRetroArgs,
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  MutationMoveColumnArgs,
  MutationMovePostArgs,
  MutationRemoveColumnArgs,
  MutationRemovePostArgs,
  MutationRemoveRetroArgs,
  MutationUpdateColumnNameArgs,
  MutationUpdatePostContentArgs,
  MutationUpdateRetroNameArgs,
  MutationUpdateTimerArgs,
  PostMoveDirection,
  QueryGetRetroArgs,
  Resolvers,
  Retro
} from './types'
import {
  cloneDbRetro,
  createDbRetro,
  getDbRetro,
  removeDbRetro,
  updateDbRetro
} from './db'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import {
  COLUMNS_UPDATED_SUBSCRIPTION,
  NAME_UPDATED_SUBSCRIPTION,
  TIMER_UPDATED_SUBSCRIPTION
} from './constants'

// Note, this can't scale with multiple contains, we should eventually move pubsub into something like DDB
const pubsub = new PubSub()

// Casting to never because there's an issue with subscription resolver type
// https://github.com/dotansimha/graphql-code-generator/issues/7197
const subscribeColumns = withFilter(
  () => pubsub.asyncIterator(COLUMNS_UPDATED_SUBSCRIPTION),
  (payload, variables) => payload.columnsUpdated.id === variables.retroId
) as never

const publishColumns = (client: DynamoDBDocument, retro: Retro): boolean => {
  updateDbRetro(client, retro, 'columns')
  pubsub.publish(COLUMNS_UPDATED_SUBSCRIPTION, {
    // We have to include retro id so that filtering can send to the correct clients
    columnsUpdated: retro
  })
  return true
}

const subscribeName = withFilter(
  () => pubsub.asyncIterator(NAME_UPDATED_SUBSCRIPTION),
  (payload, variables) => payload.nameUpdated.id === variables.retroId
) as never

const publishName = (client: DynamoDBDocument, retro: Retro): boolean => {
  updateDbRetro(client, retro, 'name')
  pubsub.publish(NAME_UPDATED_SUBSCRIPTION, {
    nameUpdated: retro
  })
  return true
}

const subscribeTimer = withFilter(
  () => pubsub.asyncIterator(TIMER_UPDATED_SUBSCRIPTION),
  (payload, variables) => payload.timerUpdated.id === variables.retroId
) as never

const publishTimer = (client: DynamoDBDocument, retro: Retro): boolean => {
  updateDbRetro(client, retro, 'timerEnd')
  pubsub.publish(TIMER_UPDATED_SUBSCRIPTION, {
    timerUpdated: retro
  })
  return true
}

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
  if (args.columnName.length === 0) {
    throw new UserInputError('Create column: Column name cannot be empty')
  }

  if (args.columnName.length > 1000) {
    throw new UserInputError(
      'Create column: Column name has a limit of 1000 characters'
    )
  }
  const retro = await getDbRetro(client, args.retroId)
  if (retro.columns.length > 1000) {
    throw new UserInputError(
      'Create column: Retros have a limit of 1000 columns'
    )
  }
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
  if (args.postContent.length === 0) {
    throw new UserInputError('Create post: Post cannot be empty')
  }

  if (args.postContent.length > 1000) {
    throw new UserInputError(
      'Create post: Posts have a limit of 1000 characters'
    )
  }
  const retro = await getDbRetro(client, args.retroId)
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    throw new UserInputError('Create post: Column not found')
  }
  if (column.posts.length > 1000) {
    throw new UserInputError('Create post: Columns have a limit of 1000 posts')
  }
  const post = {
    id: uid(),
    content: args.postContent
  }
  column.posts.unshift(post)
  return publishColumns(client, retro)
}

const updateRetroName = async (
  parent: unknown,
  args: MutationUpdateRetroNameArgs,
  { client }: ServerContext
) => {
  if (args.retroName.length > 1000) {
    throw new UserInputError(
      'Update retro name: Retro name has a limit of 1000 characters'
    )
  }
  const retro = await getDbRetro(client, args.retroId)
  retro.name = args.retroName
  return publishName(client, retro)
}

const updateTimer = async (
  parent: unknown,
  args: MutationUpdateTimerArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  retro.timerEnd = args.timerEnd
  return publishTimer(client, retro)
}

const updateColumnName = async (
  parent: unknown,
  args: MutationUpdateColumnNameArgs,
  { client }: ServerContext
) => {
  if (args.columnName.length > 1000) {
    throw new UserInputError(
      'Update column name: Column name has a limit of 1000 characters'
    )
  }
  const retro = await getDbRetro(client, args.retroId)
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    throw new UserInputError('Update column name: Column not found')
  }
  column.name = args.columnName
  return publishColumns(client, retro)
}

const updatePostContent = async (
  parent: unknown,
  args: MutationUpdatePostContentArgs,
  { client }: ServerContext
) => {
  if (args.postContent.length > 1000) {
    throw new UserInputError(
      'Update post: Posts have a limit of 1000 characters'
    )
  }

  const retro = await getDbRetro(client, args.retroId)
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    throw new UserInputError('Update post: Column not found')
  }
  const post = column.posts.find((post) => post.id === args.postId)
  if (!post) {
    throw new UserInputError('Update post: Post not found')
  }
  post.content = args.postContent
  return publishColumns(client, retro)
}

const moveColumn = async (
  parent: unknown,
  args: MutationMoveColumnArgs,
  { client }: ServerContext
) => {
  if (args.oldColumnId === args.targetColumnId) {
    return false
  }
  const retro = await getDbRetro(client, args.retroId)
  const oldColumnIndex = retro.columns.findIndex(
    (column) => column.id === args.oldColumnId
  )
  if (oldColumnIndex < 0) {
    throw new UserInputError('Move column: Column not found')
  }
  const oldColumn = retro.columns.splice(oldColumnIndex, 1)[0]

  const targetColumnIndex = retro.columns.findIndex(
    (column) => column.id === args.targetColumnId
  )
  if (targetColumnIndex < 0) {
    throw new UserInputError('Move column: Column not found')
  }
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
  if (args.oldPostId === args.targetPostId) {
    return false
  }

  const retro = await getDbRetro(client, args.retroId)
  const oldColumn = retro.columns.find(
    (column) => column.id === args.oldColumnId
  )
  if (!oldColumn) {
    throw new UserInputError('Move post: Column not found')
  }
  const oldPostIndex = oldColumn.posts.findIndex(
    (post) => post.id === args.oldPostId
  )
  if (oldPostIndex < 0) {
    throw new UserInputError('Move post: Post not found')
  }
  const oldPost = oldColumn.posts.splice(oldPostIndex, 1)[0]

  const targetColumn = retro.columns.find(
    (column) => column.id === args.targetColumnId
  )
  if (!targetColumn) {
    throw new UserInputError('Move post: Column not found')
  }

  if (args.targetPostId && args.targetPostId.length > 0) {
    const targetPostIndex = targetColumn.posts.findIndex(
      (post) => post.id === args.targetPostId
    )
    if (targetPostIndex < 0) {
      throw new UserInputError('Move post: Post not found')
    }
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

const removeRetro = async (
  parent: unknown,
  args: MutationRemoveRetroArgs,
  { client }: ServerContext
) => await removeDbRetro(client, args.retroId)

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
    throw new UserInputError('Remove column: Column not found')
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
    throw new UserInputError('Remove post: Column not found')
  }
  const postIndex = column.posts.findIndex((post) => post.id === args.postId)
  if (postIndex < 0) {
    throw new UserInputError('Remove post: Post not found')
  }
  column.posts.splice(postIndex, 1)
  return publishColumns(client, retro)
}

const clearRetro = async (
  parent: unknown,
  args: MutationClearRetroArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  retro.columns.forEach((column) => (column.posts = []))
  return publishColumns(client, retro)
}

const clearColumn = async (
  parent: unknown,
  args: MutationClearColumnArgs,
  { client }: ServerContext
) => {
  const retro = await getDbRetro(client, args.retroId)
  const column = retro.columns.find((column) => column.id === args.columnId)
  if (!column) {
    throw new UserInputError('Clear column: Column not found')
  }
  column.posts = []
  return publishColumns(client, retro)
}

const cloneRetro = async (
  parent: unknown,
  args: MutationCloneRetroArgs,
  { client }: ServerContext
) => {
  const oldRetro = await getDbRetro(client, args.retroId)
  const newRetroId = await cloneDbRetro(client, oldRetro)
  return newRetroId
}

const resolvers: Resolvers<ServerContext> = {
  Subscription: {
    columnsUpdated: {
      subscribe: subscribeColumns
    },
    nameUpdated: {
      subscribe: subscribeName
    },
    timerUpdated: {
      subscribe: subscribeTimer
    }
  },
  Query: {
    getRetro
  },
  Mutation: {
    createRetro,
    createColumn,
    createPost,
    updateRetroName,
    updateTimer,
    updateColumnName,
    updatePostContent,
    moveColumn,
    movePost,
    removeRetro,
    removeColumn,
    removePost,
    clearRetro,
    clearColumn,
    cloneRetro
  }
}

export default resolvers
