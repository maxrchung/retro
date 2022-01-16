import React from 'react'

interface CardProps {
  content: JSX.Element
  buttons: JSX.Element
}

export default function Card(props: CardProps): JSX.Element {
  return (
    <div className="p-2 min-w-0 flex justify-between items-center">
      {/* wat https://stackoverflow.com/a/40612184/13183186 */}
      <div className="p-1 min-w-0 flex-1">{props.content}</div>
      <div className="p-1">{props.buttons}</div>
    </div>
  )
}
