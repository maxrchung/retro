import { ApolloServer } from 'apollo-server'
import schema from './schema'
import resolvers from './resolvers'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DYNAMODB_ENDPOINT } from './constants'

export interface ServerContext {
  client: DynamoDBClient
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
  context: {
    client: new DynamoDBClient({
      endpoint: DYNAMODB_ENDPOINT
    })
  }
})

server.installSubscriptionHandlers

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server is running on ${url}`)
  console.log(`Server is running on ${subscriptionsUrl}`)
})
