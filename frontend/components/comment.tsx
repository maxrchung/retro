import React, { useContext } from 'react'
import * as Types from 'backend/types'
import { XIcon } from '@heroicons/react/outline'
import { SocketContext } from 'app/socketContext'
import IconButton from 'components/iconButton'
import Card from 'components/card'

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
    <div className="my-3 bg-gray-100 rounded">
      <Card
        content={props.value}
        buttons={
          <IconButton onClick={() => handleRemoveComment()}>
            <XIcon/>  
          </IconButton>
        }
      />
    </div>
  )
}
