import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  split
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { GRAPHQL_WEB_SOCKET_URI } from '../constants'
import { GRAPHQL_HTTP_URI } from '../constants'
import { AppProps } from 'next/app'
import React from 'react'
import { useAppDispatch } from 'state/hooks'
import { actions } from 'state/retroSlice'
import ErrorBar from './ErrorBar'

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_URI
})

// https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024
const webSocketLink = process.browser
  ? new WebSocketLink({
      uri: GRAPHQL_WEB_SOCKET_URI,
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

export default function ApolloWrapper({
  Component,
  pageProps
}: AppProps): JSX.Element {
  const dispatch = useAppDispatch()

  const errorLink = onError(({ response, graphQLErrors, networkError }) => {
    const errors = []
    if (graphQLErrors) {
      graphQLErrors.forEach(
        ({ message }) => message.length > 0 && errors.push(`Error: ${message}`)
      )
    }
    if (networkError && networkError.message.length > 0) {
      errors.push(`Network error: ${networkError.message}`)
    }
    dispatch(actions.setErrors(errors))

    // Ignore errors so that unhandled exception isn't thrown at the component level
    // https://www.apollographql.com/docs/react/data/error-handling/#ignoring-errors
    if (response) {
      response.errors = undefined
    }
  })

  const client = new ApolloClient({
    link: from([errorLink, splitLink]),
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <ErrorBar />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}