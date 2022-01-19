import { PubSub, withFilter } from 'apollo-server'
import {
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  Resolvers,
  Retro
} from './types'
import { uid } from 'uid/secure'

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

const pubsub = new PubSub()

const publish = (retro: Retro): Retro => {
  pubsub.publish('retro-updated', { retroUpdated: retro })
  console.log(retro)
  return retro
}

// Casting to never because there's an issue with subscription resolver type
// https://github.com/dotansimha/graphql-code-generator/issues/7197
const subscribe = withFilter(
  () => pubsub.asyncIterator('retro-updated'),
  (payload, variables) => {
    console.log('payload', payload)
    console.log('variables', variables)
    payload.retroUpdated.id === variables.id
    return true
  }
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
    throw new Error(`Column with ID ${args.columnId} could not be found`)
  }
  const id = generateUid(column.posts)
  const post = {
    id,
    content: args.postContent
  }
  column.posts.push(post)
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
    removeColumn: (parent, args) => {
      const columnIndex = retro.columns.findIndex(
        (column) => column.id == args.columnId
      )
      retro.columns.splice(columnIndex, 1)
      return publish(retro)
    },
    removePost: (parent, args) => {
      return publish(retro)
    }
  }
}

export default resolvers
