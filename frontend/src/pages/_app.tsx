import '../styles.css'

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
import IconButton from 'components/IconButton'
import TwitterIcon from 'icons/TwitterIcon'
import RetroIcon from 'icons/RetroIcon'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
    <DndProvider backend={HTML5Backend}>
      <Head>
        <title>retro</title>
      </Head>
      <div className="flex flex-col overflow-hidden flex-auto break-words text-gray-800 text-base">
        <nav className="flex justify-between items-center p-3 bg-gray-100">
          <Link href="/">
            <IconButton icon={<RetroIcon />} label="retro" title="Home" />
          </Link>
          <div className="flex justify-between gap-2 align-items-center">
            <a href="https://github.com/maxrchung/retro">
              <IconButton icon={<GitHubIcon />} title="GitHub" />
            </a>
            <a href="https://twitter.com/maxrchung">
              <IconButton icon={<TwitterIcon />} title="Twitter" />
            </a>
          </div>
        </nav>
        <main className="flex flex-col overflow-hidden flex-auto">
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </main>
      </div>
    </DndProvider>
  )
}
