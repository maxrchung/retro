import classNames from 'classnames'
import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

interface CardProps {
  content: JSX.Element
  buttons: JSX.Element
}

export default function Card(props: CardProps): JSX.Element {
  const { content, buttons } = props
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.Card,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.Card,
    hover: (item, monitor) => {
      console.log('hovered on card')
    },
    drop: (item, monitor) => {
      console.log('dropped on card')
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  }))

  return (
    <div
      ref={(ref) => {
        dragRef(ref)
        dropRef(ref)
      }}
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
