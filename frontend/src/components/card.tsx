import classNames from 'classnames'
import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

interface CardProps {
  content: JSX.Element
  buttons: JSX.Element
}

export default function Card(props: CardProps): JSX.Element {
  const { content, buttons } = props
  const [{ isDragging }, dragReference] = useDrag(() => ({
    type: ItemTypes.Card,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div
      ref={dragReference}
      className={classNames(
        'p-2 min-w-0 flex justify-between items-center cursor-grab',
        {
          'opacity-50 cursor-grabbing': isDragging
        }
      )}
    >
      {/* wat https://stackoverflow.com/a/40612184/13183186 */}
      <div className="p-1 min-w-0 flex-1">{content}</div>
      <div className="p-1">{buttons}</div>
    </div>
  )
}
