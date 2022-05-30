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
    onConnect: () => {
      console.log('Connected!')
    },
    onDisconnect: () => {
      console.log('Disconnected!')
    }
  },
  resolvers,
  context: {
    client: DynamoDBDocument.from(
      new DynamoDBClient({
        endpoint: DYNAMODB_ENDPOINT
      })
    )
  },
  // Plugin example https://stackoverflow.com/a/63355900
  plugins: [
    {
      requestDidStart(requestContext) {
        console.log('Request', JSON.stringify(requestContext.request))
        return {
          willSendResponse(requestContext) {
            console.log(
              'Response',
              JSON.stringify(requestContext.response, null, 2)
            )
          }
        }
      }
    }
  ]
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server is running on ${url}`)
  console.log(`Server is running on ${subscriptionsUrl}`)
})
