import React, { useContext } from 'react'
import * as Types from 'backend/types'
import { SocketContext } from 'app/socketContext';

export default function Column(props: Types.Column): JSX.Element {
  const sendRequest = useContext(SocketContext);

  const handleAddComment = () =>
    sendRequest({
      type: 'retro/addComment',
      payload: {
        columnId: props.id,
        value: 'Hello'
      }
    })

  return (
    <div key={props.id}>
      <div>
        {props.name}
      </div>

      {props.comments.map(comment => <div key={comment.id}>{comment.value}</div>)}

      <textarea className="block border-2 border-black" />

      <button
        className="border-2 border-black p-2"
        onClick={() => handleAddComment()}
      >
        + Comment
        </button>
    </div>
  )
}
