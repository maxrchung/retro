import React from 'react'
import * as Types from 'backend/types'
import { TrashIcon } from '@heroicons/react/outline'

export default function Comment(props: Types.Comment): JSX.Element {
  return (
    <div>
      {props.value}
      <button
        className="h-5 w-5"
        onClick={() => console.log('clicked')}
      >
        <TrashIcon/>
      </button>
      
    </div>
  )
}
