import React, { useEffect } from 'react'
import { useCreateRetro } from 'graphql/client'
import { useRouter } from 'next/router'
import IconButton from 'components/IconButton'
import { PlusSmIcon } from '@heroicons/react/outline'
import RetroIcon from 'icons/RetroIcon'
import Retro from 'components/Retro'
import { actions } from 'state/retroSlice'
import { useAppDispatch } from 'state/hooks'
import { TemplateSelect } from 'components/TemplateSelect'

export default function Home(): JSX.Element {
  const router = useRouter()
  const [createRetro, { loading, data }] = useCreateRetro()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(actions.resetState())
  }, [])

  useEffect(() => {
    if (data) {
      router.push(`/${data.createRetro}`)
    }
  }, [data])

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
            <h1 className="text-4xl">retro</h1>
          </div>

          <p className="mb-4">A simple retrospective tool</p>

          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()

              if (loading) {
                return
              }

              const formData = new FormData(e.target as HTMLFormElement)
              const template = formData.get('template')?.toString()

              if (!template) {
                return
              }

              const columnNames =
                template === 'Empty'
                  ? []
                  : template.split(',').map((column) => column.trim())
              createRetro({
                variables: {
                  columnNames
                }
              })
            }}
          >
            <TemplateSelect />

            <IconButton
              icon={<PlusSmIcon />}
              // onClick={() => !loading && createRetro()}
              title="Create retro"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
