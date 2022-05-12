import { ApolloServer } from 'apollo-server'
import schema from './schema'
import resolvers from './resolvers'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DYNAMODB_ENDPOINT } from './constants'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

export interface ServerContext {
  client: DynamoDBDocument
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
  // https://stackoverflow.com/a/61152192
  formatError: (err) => {
    console.error(err)
    return err
  },
  formatResponse: (response) => {
    console.log(response)
    return response
  },
  resolvers,
  context: {
    client: DynamoDBDocument.from(
      new DynamoDBClient({
        endpoint: DYNAMODB_ENDPOINT
      })
    )
  }
})

server.installSubscriptionHandlers

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server is running on ${url}`)
  console.log(`Server is running on ${subscriptionsUrl}`)
})
