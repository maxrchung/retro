import { ApolloServer, PubSub, withFilter } from 'apollo-server'
import { schema } from './schema'
import { resolvers } from './resolvers'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
