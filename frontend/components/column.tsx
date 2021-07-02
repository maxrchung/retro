import React, { useContext, useState } from 'react'
import * as Types from 'backend/types'
import { SocketContext } from 'app/socketContext'
import Comment from 'components/comment'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import IconButton from 'components/iconButton'
import Card from 'components/card'

interface ColumnProps extends Types.Column {
  index: number
}

export default function Column(props: ColumnProps): JSX.Element {
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

  const isEven = props.index % 2 == 0
  return (
    <div className={isEven 
      ? "flex flex-col w-80 p-5"
      : "flex flex-col w-80 p-5 bg-gray-100"
    }>
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
          index={props.index}
          {...comment}
        />
      )}

      <Card
        content={
          // Ok https://stackoverflow.com/a/64556831/13183186
          <div className="flex">
            <textarea
              className="-ml-3 p-2 flex-1 rounded focus:outline-none border-2 border-blue-500 focus:border-blue-300 hover:border-blue-300 resize-none"
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
