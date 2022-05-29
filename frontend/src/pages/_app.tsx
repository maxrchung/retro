import '../styles.css'

import { AppProps } from 'next/app'
import React from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import store from 'state/store'
import ApolloWrapper from 'components/ApolloWrapper'
import SiteHeader from 'components/SiteHeader'

// https://nextjs.org/docs/advanced-features/custom-app
export default function App(props: AppProps): JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Head>
          <title>retro</title>
        </Head>
        <div className="flex flex-col overflow-hidden flex-auto break-words text-gray-800 text-base">
          <SiteHeader />
          <main className="flex flex-col overflow-hidden flex-auto">
            <ApolloWrapper {...props} />
          </main>
        </div>
      </Provider>
    </DndProvider>
  )
}
