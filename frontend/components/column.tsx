import React, { useContext, useState } from 'react'
import * as Types from 'backend/types'
import { SocketContext } from 'app/socketContext'
import Comment from 'components/comment'
import { TrashIcon } from '@heroicons/react/outline'

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

  const handleRemoveColumn = () => {
    sendRequest({
      type: 'retro/removeColumn',
      payload: {
        columnId: props.id,
      }
    })
    setComment('')
  }

  return (
    <div>
      <div>
        {props.name}
        <button
          className="h-5 w-5"
          onClick={() => handleRemoveColumn()}
        >
          <TrashIcon/>
        </button>
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
