import Column from 'components/Column'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import IconButton from 'components/IconButton'
import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  RefreshIcon,
  TrashIcon
} from '@heroicons/react/outline'
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
import { isKeyEnterOnly } from 'utils'
import Timer from './Timer'
import InputContainer from './InputContainer'

export default function Retro(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const dispatch = useAppDispatch()
  // No point to fetch if retroId is not set
  const { error, data: dataGet, refetch } = useGetRetro({ retroId }, !retroId)
  const { data: dataColumns } = useColumnsUpdated({ retroId }, !retroId)
  const { data: dataName } = useNameUpdated({ retroId }, !retroId)
  const { data: dataTimer } = useTimerUpdated({ retroId }, !retroId)
  const [removeRetro, { data: dataRemove }] = useRemoveRetro({ retroId })
  const [updateRetroName] = useUpdateRetroName()

  const [columnName, setColumnName] = useState('')
  const { name, columns } = useAppSelector((state) => state.retro)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(name)
  const [createColumn] = useCreateColumn({
    retroId,
    columnName
  })

  useEffect(() => setEditName(name), [name])

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

  useEffect(() => {
    if (dataRemove) {
      router.push('/')
    }
  }, [dataRemove])

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
        <title>{editName} - retro</title>
        <meta name="description" content="A retrospective tool" />
      </Head>

      <h1>
        {isEditing ? (
          <input
            autoFocus
            className="-ml-3 p-2 flex-1 rounded border-2 border-blue-500 focus:outline-none focus:border-blue-300 hover:border-blue-300"
            onKeyDown={(e) => {
              if (isKeyEnterOnly(e)) {
                setIsEditing(false)
                updateRetroName({
                  variables: {
                    retroId,
                    retroName: editName
                  }
                })
              } else if (e.key === 'Escape') {
                setIsEditing(false)
                setEditName(name)
              }
            }}
            onChange={(e) => setEditName(e.target.value)}
            value={editName}
          />
        ) : (
          <span className="cursor-text" onClick={() => setIsEditing(true)}>
            {editName}
          </span>
        )}
      </h1>

      <IconButton icon={<RefreshIcon />} onClick={() => refetch()} />

      <IconButton
        icon={isEditing ? <CheckIcon /> : <PencilIcon />}
        onClick={() => {
          isEditing
            ? updateRetroName({
                variables: {
                  retroId,
                  retroName: editName
                }
              })
            : setEditName(name)
          setIsEditing(!isEditing)
        }}
      />

      <IconButton
        icon={<TrashIcon />}
        onClick={() =>
          confirm('Are you sure you want to delete this retro?') &&
          removeRetro()
        }
      />

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
  )
}
