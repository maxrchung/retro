import Column from 'components/Column'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import Card from 'components/Card'
import IconButton from 'components/IconButton'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid'
import Header from 'components/Header'
import { useCreateColumn, useGetRetro, useColumnsUpdated } from 'graphql/client'
import { useRouter } from 'next/router'
import { actions } from 'state/retroSlice'

export default function Retro(): JSX.Element {
  const router = useRouter()
  const { id } = router.query
  const retroId = id as string

  const dispatch = useAppDispatch()
  // No point to fetch if retroId is not set
  const { error, data: dataGet } = useGetRetro({ retroId }, !retroId)
  const { data: dataColumns } = useColumnsUpdated({ retroId }, !retroId)

  const [columnName, setColumnName] = useState('')
  const { name, columns } = useAppSelector((state) => state.retro)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(name)
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

      <h1>{isEditing ? <input value={name}></input> : name}</h1>

      <IconButton onClick={() => submitCreateColumn()}>
        <PencilIcon />
      </IconButton>

      <IconButton onClick={() => submitCreateColumn()}>
        <TrashIcon />
      </IconButton>

      <div className="flex min-h-screen w-max overflow-x-auto">
        {columns.map((column, index) => (
          <Column key={column.id} column={column} index={index} />
        ))}

        <div className={'w-80 p-5'}>
          <Header>
            <Card
              alwaysShowButtons
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
              buttons={
                <IconButton onClick={() => submitCreateColumn()}>
                  <PlusIcon />
                </IconButton>
              }
            />
          </Header>
        </div>
      </div>
    </div>
  )
}
