import React, { useContext, useState } from 'react'
import * as Types from 'backend/types'
import { SocketContext } from 'app/socketContext'
import Comment from 'components/comment'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import IconButton from './iconButton'

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
      <div className="p-2 min-w-0 flex justify-between items-center">
        <div className="p-1 min-w-0">
          {props.name}
        </div>
        <div className="p-1">
          <IconButton onClick={() => handleRemoveColumn()}>
            <XIcon/>  
          </IconButton>
        </div>
      </div>

      {props.comments.map(comment =>
        <Comment 
          key={comment.id}
          {...comment}
        />
      )}

      <div className="flex justify-between items-center">
        <textarea
          className="block border-2 border-black"
          onChange={e => setComment(e.target.value)}
          value={comment}
        />
        <div>
          <IconButton onClick={() => handleAddComment()}>
            <PlusIcon />
          </IconButton>
        </div>
      </div>
      
    </div>
  )
}
