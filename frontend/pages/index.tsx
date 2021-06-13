import Head from 'next/head'
import React, { useContext } from 'react'
import { useAppSelector } from '../app/hooks'
import { SocketContext } from '../app/socketContext'

export default function Home(): JSX.Element {
  const columns = useAppSelector(state => state.columns)
  const sendRequest = useContext(SocketContext);

  const handleAddComment = (columnId: string) =>
    sendRequest({
      type: 'retro/addComment',
      payload: {
        columnId,
        value: 'Hello'
      }
    })

  return (
    <div className="container">
      <Head>
        <title>Retro</title>
        <meta name="description" content="A retrospective tool made with some cool stuff" />
      </Head>

      <div className="flex w-screen">
        {columns.map(column =>
          <div key={column.id}>
            <div>
              {column.name}
            </div>

            {column.comments.map(comment => <div key={comment.id}>{comment.value}</div>)}

            <textarea className="block border-2 border-black" />

            <button
              className="border-2 border-black p-2"
              onClick={() => handleAddComment(column.id)}
            >
              + Comment
              </button>
          </div>
        )}

        <div>
          <input className="block border-2 border-black" />

          <button className="border-2 border-black p-2">
            + Column
          </button>
        </div>
      </div>
    </div>
  )
}
