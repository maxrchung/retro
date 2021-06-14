import React, { useContext, useState } from 'react'
import * as Types from 'backend/types'
import { SocketContext } from 'app/socketContext'
import Comment from 'components/comment'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import IconButton from 'components/iconButton'
import Card from 'components/card'

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
    <div className="w-80 p-5">
      <Card
        content={props.name}
        buttons={
          <IconButton onClick={() => handleRemoveColumn()}>
            <XIcon/>  
          </IconButton>
        }
      />

      {props.comments.map(comment =>
        <Comment 
          key={comment.id}
          {...comment}
        />
      )}


      <Card
        content={
          <textarea
            className="block border-2 border-gray-700 block w-100"
            onChange={e => setComment(e.target.value)}
            value={comment}
          />
        }
        buttons={
          <IconButton onClick={() => handleAddComment()}>
            <PlusIcon />
          </IconButton>
        }
      />
    </div>
  )
}
