import { PubSub, withFilter } from 'apollo-server'
import {
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  MutationRemoveColumnArgs,
  MutationRemovePostArgs,
  Resolvers,
  Retro
} from './types'
import { generateUid } from './utils'

const retro: Retro = {
  id: 'test-id',
  columns: [
    {
      id: 'column-id',
      name: 'column-name',
      posts: [
        {
          id: 'post-id',
          content: 'content'
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
  (payload, variables) => payload.retroUpdated.id === variables.id
) as never

const getRetro = () => retro

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
  const column = retro.columns.find((column) => column.id == args.columnId)
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

const removeColumn = (parent: unknown, args: MutationRemoveColumnArgs) => {
  const postIndex = retro.columns.findIndex(
    (column) => column.id === args.columnId
  )
  if (postIndex < 0) {
    return false
  }
  retro.columns.splice(postIndex, 1)
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

const resolvers: Resolvers = {
  Subscription: {
    retroUpdated: {
      subscribe
    }
  },
  Query: {
    getRetro
  },
  Mutation: {
    createColumn,
    createPost,
    updateColumn: (parent, args) => {
      return publish(retro)
    },
    updatePost: (parent, args) => {
      return publish(retro)
    },
    removeColumn,
    removePost
  }
}

export default resolvers
