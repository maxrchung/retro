import { withFilter } from 'apollo-server'
import {
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  Resolvers,
  Retro
} from './types'
import { v4 as uuid } from 'uuid'
import Context from './context'
import { uid } from 'uid'

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

const getUid = () => uid(7)

interface WithId {
  id: string
}

const generateUid = (array: WithId[]) => {
  let id = getUid()
  while (array.find((element) => element.id === id)) {
    id = getUid()
  }
  return id
}

const publish = (context: Context, retro: Retro): Retro => {
  context.pubsub.publish('retro-updated', retro)
  return retro
}

// Casting to never because there's an issue with subscription resolver type
// https://github.com/dotansimha/graphql-code-generator/issues/7197
const subscribe = withFilter(
  (parent, args, context) => context.pubsub.asyncIterator('retro-updated'),
  (payload, variables) => payload.id === variables.id
) as never

const getRetro = () => retro

const createColumn = (
  parent: unknown,
  args: MutationCreateColumnArgs,
  context: Context
) => {
  const id = generateUid(retro.columns)
  retro.columns.push({
    id,
    name: args.columnName,
    posts: []
  })
  return publish(context, retro)
}

const createPost = (
  parent: unknown,
  args: MutationCreatePostArgs,
  context: Context
) => {
  const column = retro.columns.find((column) => column.id == args.columnId)
  if (!column) {
    throw new Error(`Column with ID ${args.columnId} could not be found`)
  }
  const id = generateUid(column.posts)
  const post = {
    id,
    content: args.postContent
  }
  column.posts.push(post)
  return publish(context, retro)
}

const resolvers: Resolvers<Context> = {
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
    updateColumn: (parent, args, context) => {
      return publish(context, retro)
    },
    updatePost: (parent, args, context) => {
      return publish(context, retro)
    },
    removeColumn: (parent, args, context) => {
      const columnIndex = retro.columns.findIndex(
        (column) => column.id == args.columnId
      )
      retro.columns.splice(columnIndex, 1)
      return publish(context, retro)
    },
    removePost: (parent, args, context) => {
      return publish(context, retro)
    }
  }
}

export default resolvers
