import React, { useContext } from 'react'
import * as Types from 'backend/types'
import { XIcon } from '@heroicons/react/outline'
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
    <div className="p-2 my-3 bg-gray-100 rounded flex justify-between">
      {/* wat https://stackoverflow.com/a/40612184/13183186 */}
      <div className="p-1 min-w-0 break-words">
        {props.value}
      </div>
      <div className="p-1">
        <button
          className="h-5 w-5 rounded border border-gray-900 text-gray-900 focus:border-gray-500 focus:text-gray-500 hover:border-gray-500 hover:text-gray-500"
          onClick={() => handleRemoveComment()}
        >
          <XIcon/>  
        </button>
      </div>
    </div>
  )
}
