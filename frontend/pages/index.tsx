import Column from 'components/column'
import Head from 'next/head'
import React, { useContext, useState } from 'react'
import { useAppSelector } from 'app/hooks'
import { SocketContext } from 'app/socketContext'

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
    <div className="container">
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
          <input
            className="block border-2 border-black"
            onChange={e => setColumnName(e.target.value)}
            value={columnName}
          />
          <button
            className="border-2 border-black p-2"
            onClick={() => handleAddColumn()}
          >
            + Column
          </button>
        </div>
      </div>
    </div>
  )
}
