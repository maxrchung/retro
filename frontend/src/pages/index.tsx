import React from 'react'
import { useCreateRetro } from 'graphql/client'
import { useRouter } from 'next/router'
import IconButton from 'components/IconButton'
import { PlusSmIcon } from '@heroicons/react/outline'
import RetroIcon from 'icons/RetroIcon'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import store from 'state/store'
import RetroContent from 'components/RetroContent'

export default function Home(): JSX.Element {
  const router = useRouter()
  const [createRetro, { loading, data }] = useCreateRetro()

  if (data) {
    router.push(`/${data.createRetro}`)
  }

  return (
    <Provider store={store}>
      <div className="opacity-20">
        <RetroContent />
      </div>
      <div className="fixed flex flex-col justify-center items-center h-full w-full -translate-y-14">
        <div className="flex flex-row items-center">
          <div className="h-12 w-12">
            <RetroIcon />
          </div>
          <h1 className="font-bold text-4xl">retro</h1>
        </div>

        <p className="mb-3">A simple retrospective tool.</p>

        <IconButton
          icon={<PlusSmIcon />}
          onClick={() => !loading && createRetro()}
          title="Create retro"
        />
      </div>
    </Provider>
  )
}
