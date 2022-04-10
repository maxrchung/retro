import React from 'react'

interface CardProps {
  content: JSX.Element
  buttons: JSX.Element
}

export default function Card(props: CardProps): JSX.Element {
  const { content, buttons } = props

  return (
    <div className={'p-2 min-w-0 flex justify-between items-center'}>
      {/* wat https://stackoverflow.com/a/40612184/13183186 */}
      <div className="p-1 min-w-0 flex-1">{content}</div>
      <div className="p-1 flex flex-col gap-y-2">{buttons}</div>
    </div>
  )
}
