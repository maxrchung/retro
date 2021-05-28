import Head from 'next/head'
import React, { useRef, useEffect } from 'react'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import { addComment } from '../app/retroSlice'  

export default function Home(): JSX.Element {
  const dispatch = useDispatch()
  const socket = useRef<WebSocket>(null)
  const columns = useSelector((state: RootStateOrAny) => state.retro.columns)

  useEffect(() => {
    socket.current = new WebSocket('ws://localhost:3010')
    socket.current.onmessage = message => {
      dispatch(JSON.parse(message.data))
    }
  }, [])

  const handleAddComment = (e, uuid) => {
    socket.current.send(JSON.stringify({
      type: 'addComment',
      uuid,
      value: 'Hello'
    }));
  }

  return (
    <div className="container">
      <Head>
        <title>Retro</title>
        <meta name="description" content="A retro tool made with some cool stuff" />
      </Head>

      <div className="flex w-screen">
        {columns.map(column =>
          <div key={column.uuid}>
              <div>
                {column.name}
              </div>

              {column.comments.map(comment => <div key={comment.uuid}>{comment.value}</div>)}

              <textarea className="block border-2 border-black" />

              <button
                className="border-2 border-black p-2"
                onClick={e => handleAddComment(e, column.uuid)}
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
