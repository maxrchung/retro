import Column from 'components/column'
import Head from 'next/head'
import React, { useContext, useState } from 'react'
import { useAppSelector } from 'app/hooks'
import { SocketContext } from 'app/socketContext'
import Card from 'components/card'
import IconButton from 'components/iconButton'
import { PlusIcon } from '@heroicons/react/outline'

export default function Home(): JSX.Element {
  const [columnName, setColumnName] = useState('')
  const columns = useAppSelector(state => state.columns)
  const sendRequest = useContext(SocketContext)

  const handleAddColumn = () => {
    sendRequest({
      type: 'retro/addColumn',
      payload: {
        name: columnName
      }
    })
    setColumnName('')
  }

  return (
    <div className="container break-words text-gray-700 text-base">
      <Head>
        <title>Retro</title>
        <meta name="description" content="A retrospective tool made with some cool stuff" />
      </Head>

      <div className="flex w-max overflow-x-auto">
        {columns.map(column =>
          <Column
            key={column.id}
            {...column}
          />
        )}

        <div className="w-80 p-5">
          <Card
            content={
              <input
                className="p-2 w-full rounded border-2 border-gray-700 outline-none focus:border-gray-400 hover:border-gray-400"
                onChange={e => setColumnName(e.target.value)}
                value={columnName}
              />
            }
            buttons={
              <IconButton onClick={() => handleAddColumn()}>
                <PlusIcon />
              </IconButton>
            }
          />
        </div>
      </div>
    </div>
  )
}
