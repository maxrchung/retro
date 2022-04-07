import classNames from 'classnames'
import React from 'react'

interface DividerProps {
  dragHoverIndex: number
  index: number
}

export default function Divider({
  dragHoverIndex,
  index
}: DividerProps): JSX.Element {
  return (
    <hr
      className={classNames('h-2 border-0 p-0 m-0', {
        'bg-blue-500': dragHoverIndex === index,
        'bg-transparent': dragHoverIndex !== index
      })}
    />
  )
}
