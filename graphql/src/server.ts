import { ApolloServer } from 'apollo-server'
import schema from './schema'
import resolvers from './resolvers'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DYNAMODB_ENDPOINT, RETRO_CONNECTION_ID } from './constants'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { uid } from 'uid'

export interface ServerContext {
  client: DynamoDBDocument
  connectionId: string
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
  cors: {
    origin: ['http://localhost:3000', 'https://retro.maxrchung.com'],
    credentials: true // <-- REQUIRED backend setting
  },
  context: ({ req, res }) => {
    let connectionId = undefined
    if (req) {
      connectionId = getConnectionId(req.headers?.cookie)
      // https://stackoverflow.com/a/53546237
      if (!connectionId) {
        connectionId = uid()
        res.cookie(RETRO_CONNECTION_ID, connectionId)
      }
    }

    return {
      client: DynamoDBDocument.from(
        new DynamoDBClient({
          endpoint: DYNAMODB_ENDPOINT
        })
      ),
      connectionId
    }
  },
  // Plugin example https://stackoverflow.com/a/63355900
  plugins: [
    {
      requestDidStart(requestContext) {
        console.log('Request', JSON.stringify(requestContext.request, null, 2))
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

const getConnectionId = (cookieString: string | undefined) => {
  if (!cookieString) {
    return undefined
  }

  const cookies = cookieString.split(';')
  for (const cookie of cookies) {
    const keyValue = cookie.split('=')
    if (keyValue.length !== 2) {
      continue
    }

    const key = keyValue[0].trim()
    const value = keyValue[1].trim()

    if (key === RETRO_CONNECTION_ID) {
      return value
    }
  }

  return undefined
}

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server is running on ${url}`)
  console.log(`Server is running on ${subscriptionsUrl}`)
})
