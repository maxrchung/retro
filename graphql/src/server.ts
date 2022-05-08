import { ApolloServer } from 'apollo-server'
import schema from './schema'
import resolvers from './resolvers'
import { DynamoDB, DynamoDBClient } from '@aws-sdk/client-dynamodb'

export interface ServerContext {
  client: DynamoDBClient
}

const serverContext: ServerContext = {
  client: new DynamoDBClient({
    endpoint: 'http://localhost:8000'
  })
}

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
  resolvers,
  context: {}
})

server.installSubscriptionHandlers

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server is running on ${url}`)
  console.log(`Server is running on ${subscriptionsUrl}`)
})
