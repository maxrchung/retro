import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from 'state/store'
import React from 'react'
import 'tailwindcss/tailwind.css'

// https://nextjs.org/docs/advanced-features/custom-app
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
