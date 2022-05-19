import Column from 'components/Column'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import IconButton from 'components/IconButton'
import { PlusIcon, TrashIcon } from '@heroicons/react/outline'
import ColumnHeader from 'components/ColumnHeader'
import {
  useCreateColumn,
  useGetRetro,
  useColumnsUpdated,
  useRemoveRetro,
  useUpdateRetroName,
  useNameUpdated,
  useTimerUpdated
} from 'graphql/client'
import { useRouter } from 'next/router'
import { actions } from 'state/retroSlice'
import Timer from './Timer'
import InputContainer from './InputContainer'
import RetroHeader from './RetroHeader'

export default function Retro(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const dispatch = useAppDispatch()
  // No point to fetch if retroId is not set
  const { error, data: dataGet } = useGetRetro({ retroId }, !retroId)
  const { data: dataColumns } = useColumnsUpdated({ retroId }, !retroId)
  const { data: dataName } = useNameUpdated({ retroId }, !retroId)
  const { data: dataTimer } = useTimerUpdated({ retroId }, !retroId)

  const [columnName, setColumnName] = useState('')
  const { name, columns } = useAppSelector((state) => state.retro)
  const [createColumn] = useCreateColumn({
    retroId,
    columnName
  })

  useEffect(() => {
    if (dataGet) {
      dispatch(actions.updateRetro(dataGet.getRetro))
    }
  }, [dataGet])

  useEffect(() => {
    if (dataColumns) {
      dispatch(actions.updateColumns(dataColumns.columnsUpdated.columns))
    }
  }, [dataColumns])

  useEffect(() => {
    if (dataName) {
      dispatch(actions.updateName(dataName.nameUpdated.name))
    }
  }, [dataName])

  useEffect(() => {
    if (dataTimer) {
      dispatch(actions.updateTimer(dataTimer.timerUpdated.timerEnd))
    }
  }, [dataTimer])

  const submitCreateColumn = () => {
    if (columnName.length > 0) {
      createColumn()
      setColumnName('')
    }
  }

  if (error) {
    return <>{`Failed to load retro: ${error.message}`}</>
  }

  if (!dataGet) {
    return <></>
  }

  return (
    <div className="container break-words text-gray-700 text-base">
      <Head>
        <title>{name} - retro</title>
        <meta name="description" content="A retrospective tool" />
      </Head>

      <div className="flex flex-col gap-y-4">
        <RetroHeader />

        <Timer />

        <div className="flex min-h-screen w-max overflow-x-auto">
          {columns.map((column, index) => (
            <Column key={column.id} column={column} index={index} />
          ))}

          <div className={'w-80 p-5'}>
            <ColumnHeader>
              <InputContainer
                content={
                  <input
                    className="p-2 w-full rounded border-2 border-blue-500 focus:outline-none focus:border-blue-300 hover:border-blue-300"
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' &&
                        !e.altKey &&
                        !e.ctrlKey &&
                        !e.shiftKey &&
                        !e.metaKey
                      ) {
                        submitCreateColumn()
                        e.preventDefault()
                      }
                    }}
                    onChange={(e) => setColumnName(e.target.value)}
                    value={columnName}
                    placeholder="Column"
                  />
                }
                button={
                  <IconButton
                    icon={<PlusIcon />}
                    onClick={() => submitCreateColumn()}
                  />
                }
              />
            </ColumnHeader>
          </div>
        </div>
      </div>
    </div>
  )
}
