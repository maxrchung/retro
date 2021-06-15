import React, { useContext, useState } from 'react'
import * as Types from 'backend/types'
import { SocketContext } from 'app/socketContext'
import Comment from 'components/comment'
import { PlusIcon, TrashIcon } from '@heroicons/react/outline'
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
            <TrashIcon/>  
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
          // Ok https://stackoverflow.com/a/64556831/13183186
          <div className="flex">
            <textarea
              className="-ml-3 p-3 flex-1 rounded outline-none border-2 border-gray-700 focus:border-gray-400 hover:border-gray-400 resize-none"
              onChange={e => setComment(e.target.value)}
              cols={0}
              rows={3}
              value={comment}
            />
          </div>
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
