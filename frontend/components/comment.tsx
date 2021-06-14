import React, { useContext } from 'react'
import * as Types from 'backend/types'
import { TrashIcon } from '@heroicons/react/outline'
import { SocketContext } from 'app/socketContext'

export default function Comment(props: Types.Comment): JSX.Element {
  const sendRequest = useContext(SocketContext)

  const handleRemoveComment = () => {
    sendRequest({
      type: 'retro/removeComment',
      payload: {
        commentId: props.id
      }
    })
  }

  return (
    <div>
      {props.value}
      <button
        className="h-5 w-5"
        onClick={() => handleRemoveComment()}
      >
        <TrashIcon/>
      </button>
      
    </div>
  )
}
