import '../styles.css'

import { AppProps } from 'next/app'
import React from 'react'
import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import Head from 'next/head'
import GitHubIcon from 'icons/GitHubIcon'
import IconButton from 'components/IconButton'
import TwitterIcon from 'icons/TwitterIcon'
import RetroIcon from 'icons/RetroIcon'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import store from 'state/store'
import ApolloWrapper from 'components/ApolloWrapper'

// https://nextjs.org/docs/advanced-features/custom-app
export default function App(props: AppProps): JSX.Element {
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
          <Provider store={store}>
            <ApolloWrapper {...props} />
          </Provider>
        </main>
      </div>
    </DndProvider>
  )
}
