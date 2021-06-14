import React, { useContext } from 'react'
import * as Types from 'backend/types'
import { XIcon } from '@heroicons/react/outline'
import { SocketContext } from 'app/socketContext'
import IconButton from './iconButton'

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
    <div className="p-2 my-3 bg-gray-100 rounded flex justify-between items-center">
      {/* wat https://stackoverflow.com/a/40612184/13183186 */}
      <div className="p-1 min-w-0">
        {props.value}
      </div>
      <div className="p-1">
        <IconButton onClick={() => handleRemoveComment()}>
          <XIcon/>  
        </IconButton>
      </div>
    </div>
  )
}
