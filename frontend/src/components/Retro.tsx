import Column from './Column'
import Head from 'next/head'
import React, { useState } from 'react'
import { useAppSelector } from '../state/hooks'
import Card from 'components/Card'
import IconButton from 'components/IconButton'
import { PlusIcon } from '@heroicons/react/outline'
import Header from 'components/Header'
import { useCreateColumn } from '@maxrchung/retro-graphql/src/client'

export default function Retro(): JSX.Element {
  const [columnName, setColumnName] = useState('')
  const { id: retroId, columns } = useAppSelector((state) => state.retro)
  const [createColumn] = useCreateColumn({
    retroId,
    columnName
  })

  const isEven = columns.length % 2 == 0
  return (
    <div className="container break-words text-gray-700 text-base">
      <Head>
        <title>Retro</title>
        <meta name="description" content="A retrospective tool" />
      </Head>

      <div className="flex min-h-screen w-max overflow-x-auto">
        {columns.map((column, index) => (
          <Column key={column.id} column={column} index={index} />
        ))}

        <div className={isEven ? 'w-80 p-5' : 'w-80 p-5 bg-gray-100'}>
          <Header>
            <Card
              content={
                <input
                  className="p-2 w-full rounded border-2 border-blue-500 focus:outline-none focus:border-blue-300 hover:border-blue-300"
                  onChange={(e) => setColumnName(e.target.value)}
                  value={columnName}
                />
              }
              buttons={
                <IconButton onClick={() => createColumn()}>
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
