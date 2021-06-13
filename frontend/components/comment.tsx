import React from 'react'
import * as Types from 'backend/types'

export default function Comment(props: Types.Comment): JSX.Element {
  return (
    <div>
      {props.value}
    </div>
  )
}
