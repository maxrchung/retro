import React from 'react'
import { useCreateRetro } from 'graphql/client'
import { useRouter } from 'next/router'
import IconButton from 'components/IconButton'
import { PlusSmIcon } from '@heroicons/react/outline'
import RetroIcon from 'icons/RetroIcon'
import Retro from 'components/Retro'

export default function Home(): JSX.Element {
  const router = useRouter()
  const [createRetro, { loading, data }] = useCreateRetro()

  if (data) {
    router.push(`/${data.createRetro}`)
  }

  return (
    <div className="relative flex flex-auto">
      <div className="opacity-20">
        <Retro />
      </div>

      <div className="absolute flex flex-col justify-center h-full w-full">
        <div className="flex flex-col items-center -translate-y-16">
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
      </div>
    </div>
  )
}
