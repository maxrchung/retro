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
import React, { useMemo } from 'react'
import { useAppDispatch } from 'state/hooks'
import { actions } from 'state/retroSlice'

const httpLink = new HttpLink({
  uri: GRAPHQL_HTTP_URI,
  credentials: 'include'
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

export default function ApolloWrapper({
  Component,
  pageProps
}: AppProps): JSX.Element {
  const dispatch = useAppDispatch()

  const client = useMemo(() => {
    const errorLink = onError(({ response, graphQLErrors, networkError }) => {
      const errors = []
      if (graphQLErrors) {
        console.dir(graphQLErrors)
        graphQLErrors.forEach(({ message, extensions }) =>
          errors.push(
            extensions?.code === 'INTERNAL_SERVER_ERROR'
              ? 'Internal server error'
              : message
          )
        )
      }
      if (networkError) {
        errors.push(
          networkError.message.length > 0
            ? networkError.message
            : 'Internal server error'
        )
      }
      dispatch(actions.setErrors(errors))

      // Ignore errors so that unhandled exception isn't thrown at the component level
      // https://www.apollographql.com/docs/react/data/error-handling/#ignoring-errors
      if (response) {
        response.errors = undefined
      }
    })

    // https://www.apollographql.com/docs/react/data/subscriptions/#3-split-communication-by-operation-recommended
    const splitLink = process.browser
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query)

            // These checks are necessary to address a state update issue:
            // Warning: Cannot update a component (`ErrorBar`) while rendering a different component (`Id`)
            definition.kind === 'OperationDefinition' &&
              definition.operation === 'query' &&
              dispatch(actions.clearErrors())

            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            )
          },
          webSocketLink as WebSocketLink,
          httpLink
        )
      : httpLink

    return new ApolloClient({
      link: from([errorLink, splitLink]),
      defaultOptions: {
        // Fixes some cache issues found when cloning a retro and then going back to the previous page
        query: {
          fetchPolicy: 'network-only'
        },
        watchQuery: {
          fetchPolicy: 'network-only'
        }
      },
      cache: new InMemoryCache({
        // Explicitly state that we are going to use incoming
        // https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-arrays
        typePolicies: {
          Retro: {
            fields: {
              columns: {
                merge(current, incoming) {
                  return incoming
                }
              }
            }
          },
          Column: {
            fields: {
              posts: {
                merge(current, incoming) {
                  return incoming
                }
              }
            }
          }
        }
      })
    })
  }, [dispatch])

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
