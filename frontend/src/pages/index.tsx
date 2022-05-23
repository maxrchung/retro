import React from 'react'
import { useCreateRetro } from 'graphql/client'
import { useRouter } from 'next/router'
import IconButton from 'components/IconButton'
import { PlusSmIcon } from '@heroicons/react/outline'
import RetroIcon from 'icons/RetroIcon'

export default function Home(): JSX.Element {
  const router = useRouter()
  const [createRetro, { loading, data }] = useCreateRetro()

  if (data) {
    router.push(`/${data.createRetro}`)
  }

  return (
    <div className="flex flex-col justify-center items-center h-full -translate-y-16">
      <div className="flex flex-row items-center">
        <div className="h-14 w-14">
          <RetroIcon />
        </div>
        <h1 className="font-bold text-5xl">retro</h1>
      </div>

      <p className="mb-5 mt-2">A simple retrospective tool</p>

      <IconButton
        icon={<PlusSmIcon />}
        onClick={() => !loading && createRetro()}
      />
    </div>
  )
}
