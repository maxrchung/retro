import { AppProps } from 'next/app'
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
import { GRAPHQL_HTTP_URI, GRAPHQL_WEB_SOCKET_URI } from '../constants'
import Link from 'next/link'
import Head from 'next/head'
import GitHubIcon from 'icons/GitHubIcon'
import TwitterIcon from 'icons/TwitterIcon'
import { HomeIcon } from '@heroicons/react/solid'

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

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})

// https://nextjs.org/docs/advanced-features/custom-app
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>retro</title>
      </Head>
      <nav className="flex">
        <Link href="/">
          <a>
            <HomeIcon width={24} />
          </a>
        </Link>
        <a href="https://github.com/maxrchung/retro">
          <GitHubIcon />
        </a>
        <a href="https://twitter.com/maxrchung">
          <TwitterIcon />
        </a>
      </nav>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}
