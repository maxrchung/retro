import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'state/store'
import React from 'react'
import 'tailwindcss/tailwind.css'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

// https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024
const webSocketLink = process.browser
  ? new WebSocketLink({
      uri: 'ws://localhost:4000/graphql',
      options: {
        reconnect: true
      }
    })
  : null

// https://www.apollographql.com/docs/react/data/subscriptions/#3-split-communication-by-operation-recommended
const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      webSocketLink as WebSocketLink,
      httpLink
    )
  : httpLink

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  // Caching issues when the server sends an update
  // https://stackoverflow.com/questions/47879016/how-to-disable-cache-in-apollo-link-or-apollo-client
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
})

// https://nextjs.org/docs/advanced-features/custom-app
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </DndProvider>
    </ApolloProvider>
  )
}
