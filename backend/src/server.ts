import { ApolloServer, PubSub } from 'apollo-server'
import { schema } from './graphql-schema'
import { resolvers } from './resolvers'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    pubsub: new PubSub()
  }
})

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
