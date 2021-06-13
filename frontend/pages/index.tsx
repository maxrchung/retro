import Head from 'next/head'
import React, { useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import * as Types from 'backend/types'

export default function Home(): JSX.Element {
  const dispatch = useAppDispatch()
  // Can't initialize WebSocket here because WebSocket is client only
  const socket = useRef<WebSocket|null>()
  const columns = useAppSelector(state => state.columns)

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:3010')
    socket.current.onmessage = (message: MessageEvent<string>) =>
      handleResponse(JSON.parse(message.data))
  }, [])

  const handleResponse = (response: Types.Response) => {
    console.log(`received: ${response}`)
    dispatch(response)
  }

  const sendRequest = (request: Types.Request) => {
    if (socket.current) {
      socket.current.send(JSON.stringify(request))
    }
  }

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
        <meta name="description" content="A retro tool made with some cool stuff" />
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
