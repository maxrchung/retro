import React, { useContext, useState } from 'react'
import * as Types from 'backend/types'
import { SocketContext } from 'app/socketContext'
import Comment from 'components/comment'

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
    <div>
      <div>
        {props.name}
      </div>

      {props.comments.map(comment =>
        <Comment 
          key={comment.id}
          {...comment}
        />
      )}

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
