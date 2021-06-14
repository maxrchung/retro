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
    <div className="container break-words text-gray-700">
      <Head>
        <title>Retro</title>
        <meta name="description" content="A retrospective tool made with some cool stuff" />
      </Head>

      <div className="flex w-screen">
        {columns.map(column =>
          <Column
            key={column.id}
            {...column}
          />
        )}

        <div>
          <Card
            content={
              <input
                className="block border-2 border-black"
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
