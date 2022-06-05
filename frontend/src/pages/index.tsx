import React, { useEffect } from 'react'
import { useCreateRetro } from 'graphql/client'
import { useRouter } from 'next/router'
import IconButton from 'components/IconButton'
import { PlusSmIcon } from '@heroicons/react/outline'
import RetroIcon from 'icons/RetroIcon'
import Retro from 'components/Retro'
import { actions } from 'state/retroSlice'
import { useAppDispatch } from 'state/hooks'

export default function Home(): JSX.Element {
  const router = useRouter()
  const [createRetro, { loading, data }] = useCreateRetro()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(actions.resetState())
  }, [])

  if (data) {
    router.push(`/${data.createRetro}`)
  }

  return (
    <div className="relative flex flex-auto overflow-hidden">
      <div className="opacity-10 flex flex-auto">
        <Retro />
      </div>

      <div className="absolute flex flex-col justify-center h-full w-full">
        <div className="flex flex-col items-center -translate-y-16">
          <div className="flex flex-row items-center">
            <div className="h-12 w-12">
              <RetroIcon />
            </div>
            <h1 className="font-bold text-4xl text-blue-500">retro</h1>
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
