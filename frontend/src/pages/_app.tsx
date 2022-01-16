import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'state/store'
import React from 'react'
import 'tailwindcss/tailwind.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql'
})

// https://nextjs.org/docs/advanced-features/custom-app
const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </ApolloProvider>
)

export default App
