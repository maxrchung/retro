import React, { useContext } from 'react'
import * as Types from 'graphql/types'
import { MinusSmIcon } from '@heroicons/react/outline'
import IconButton from 'components/iconButton'
import Card from 'components/card'

interface CommentProps extends Types.Comment {
  index: number
}

export default function Comment(props: CommentProps): JSX.Element {
  const sendRequest = useContext(SocketContext)

  const handleRemoveComment = () => {
    sendRequest({
      type: 'retro/removeComment',
      payload: {
        commentId: props.id
      }
    })
  }

  const isEven = props.index % 2 == 0
  return (
    <div
      className={isEven ? 'my-2 bg-gray-100 rounded' : 'my-2 bg-white rounded'}
    >
      <Card
        content={props.value}
        buttons={
          <IconButton onClick={() => handleRemoveComment()}>
            <MinusSmIcon />
          </IconButton>
        }
      />
    </div>
  )
}
