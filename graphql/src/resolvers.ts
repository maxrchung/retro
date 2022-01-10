import { PubSub, withFilter } from 'apollo-server'
import { Resolvers, Retro } from './schema-types'
import { v4 as uuid } from 'uuid'
import { Context } from './context'

const retro: Retro = {
  id: 'test',
  columns: []
}

const publish = (context: Context, retro: Retro): Retro => {
  context.pubsub.publish('retro-updated', retro)
  return retro
}

const resolvers: Resolvers<Context> = {
  Subscription: {
    retroUpdated: {
      // Casting to any because there's an issue with subscription resolver type
      // https://github.com/dotansimha/graphql-code-generator/issues/7197
      subscribe: withFilter(
        (parent, args, context) =>
          context.pubsub.asyncIterator('retro-updated'),
        (payload, variables) => payload.id === variables.id
      ) as any
    }
  },
  Query: {
    retro: (parent, args) => retro
  },
  Mutation: {
    createColumn: (parent, args, context) => {
      retro.columns.push({
        id: uuid(),
        name: args.columnName,
        posts: []
      })
      return publish(context, retro)
    },
    createPost: (parent, args, context) => {
      const post = {
        id: uuid(),
        content: args.postContent
      }
      const columnIndex = retro.columns.findIndex(
        (column) => column.id == args.columnId
      )
      retro.columns[columnIndex].posts.push(post)
      return publish(context, retro)
    },
    updateColumnName: (parent, args, context) => {
      return publish(context, retro)
    },
    updatePostContent: (parent, args, context) => {
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

export { resolvers }
