import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import * as Types from 'backend/types'

export default function Column(props: Types.Column): JSX.Element {
  const dispatch = useAppDispatch()

  const handleAddComment = () => {}

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
