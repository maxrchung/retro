import { ApolloServer, PubSub } from 'apollo-server'
import schema from './schema'
import resolvers from './resolvers'

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    pubsub: new PubSub()
  }
})

server.installSubscriptionHandlers

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server is running on ${url}`)
  console.log(`Server is running on ${subscriptionsUrl}`)
})
