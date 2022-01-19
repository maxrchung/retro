import { ApolloServer } from 'apollo-server'
import schema from './schema'
import resolvers from './resolvers'

const server = new ApolloServer({
  typeDefs: schema,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log('Connected!')
    },
    onDisconnect: (webSocket, context) => {
      console.log('Disconnected!')
    }
  },
  resolvers
})

server.installSubscriptionHandlers

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server is running on ${url}`)
  console.log(`Server is running on ${subscriptionsUrl}`)
})
