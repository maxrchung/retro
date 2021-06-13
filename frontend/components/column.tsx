import React, { useContext, useState } from 'react'
import * as Types from 'backend/types'
import { SocketContext } from 'app/socketContext'

export default function Column(props: Types.Column): JSX.Element {
  const [comment, setComment] = useState('')

  const sendRequest = useContext(SocketContext)

  const handleAddComment = () => {
    sendRequest({
      type: 'retro/addComment',
      payload: {
        columnId: props.id,
        value: comment
      }
    })
    setComment('')
  }

  return (
    <div key={props.id}>
      <div>
        {props.name}
      </div>

      {props.comments.map(comment => <div key={comment.id}>{comment.value}</div>)}

      <textarea
        className="block border-2 border-black"
        onChange={e => setComment(e.target.value)}
        value={comment}
      />

      <button
        className="border-2 border-black p-2"
        onClick={() => handleAddComment()}
      >
        + Comment
      </button>
    </div>
  )
}
