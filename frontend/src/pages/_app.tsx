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
import ErrorBar from 'components/ErrorBar'
import InfoBar from 'components/InfoBar'

// https://nextjs.org/docs/advanced-features/custom-app
export default function App(props: AppProps): JSX.Element {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Head>
          <title>retro</title>
          <link rel="shortcut icon" href="/favicon.ico" />
          {/* https://realfavicongenerator.net/favicon_result?file_id=p1g4r148vi1dfb6vk29m1gdlerh6 */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="flex flex-col overflow-hidden flex-auto break-words text-gray-800 text-base">
          <SiteHeader />
          <main className="flex flex-col overflow-hidden flex-auto">
            <InfoBar />
            <ErrorBar />
            <ApolloWrapper {...props} />
          </main>
        </div>
      </Provider>
    </DndProvider>
  )
}
