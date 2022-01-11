import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import React from 'react'
import 'tailwindcss/tailwind.css'
import SocketContextProvider from 'app/socketContext'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <SocketContextProvider>
        <Component {...pageProps} />
      </SocketContextProvider>
    </Provider>
  )
}
