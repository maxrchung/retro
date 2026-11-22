import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { Pool } from 'pg'
import schema from './schema'
import resolvers from './resolvers'
import { DATABASE_URL, RETRO_CONNECTION_ID } from './constants'
import { uid } from 'uid'

const pool = new Pool({ connectionString: DATABASE_URL })
pool.on('error', console.error)

export interface ServerContext {
  client: Pool
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
    origin: ['http://localhost:3000', 'https://retro.max.rodeo'],
    credentials: true // <-- REQUIRED backend setting
  },
  context: ({ req, res }) => {
    let connectionId = undefined
    if (req) {
      connectionId = getConnectionId(req.headers?.cookie)
      // https://stackoverflow.com/a/53546237
      if (!connectionId) {
        connectionId = uid()
        res.cookie(RETRO_CONNECTION_ID, connectionId, {
          // Not so sure about this...
          domain:
            process.env.NODE_ENV === 'production' ? '.max.rodeo' : undefined
        })
      }
    }

    return {
      client: pool,
      connectionId
    }
  },
  // Plugin example https://stackoverflow.com/a/63355900
  plugins: [
    {
      requestDidStart(requestContext) {
        console.log(
          'Request',
          JSON.stringify(
            requestContext.request,
            null,
            process.env.NODE_ENV === 'production' ? 0 : 2
          )
        )
        return {
          willSendResponse(requestContext) {
            console.log(
              'Response',
              JSON.stringify(
                requestContext.request,
                null,
                process.env.NODE_ENV === 'production' ? 0 : 2
              )
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

server
  .listen({
    port: 5000
  })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`Server is running on ${url}`)
    console.log(`Server is running on ${subscriptionsUrl}`)
  })
