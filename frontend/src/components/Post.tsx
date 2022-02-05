import React from 'react'
import * as Types from 'graphql/types'
import { MinusSmIcon } from '@heroicons/react/outline'
import IconButton from 'components/IconButton'
import Card from 'components/Card'
import { useRemovePost } from 'graphql/client'
import { useAppSelector } from 'state/hooks'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import classNames from 'classnames'

interface PostProps {
  column: Types.Column
  post: Types.Post
  index: number
}

export default function Post(props: PostProps): JSX.Element {
  const { column, post } = props
  const { id: columnId } = column
  const { id: postId, content } = post
  const { id: retroId } = useAppSelector((state) => state.retro)

  const [removeComment] = useRemovePost({
    retroId,
    columnId,
    postId
  })

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.Post,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.Post,
    hover: (item, monitor) => {},
    drop: (item, monitor) => {},
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }))

  console.log(isOver)

  return (
    <div
      ref={(ref) => {
        dragRef(ref)
        dropRef(ref)
      }}
      className={classNames(
        'border-2 hover:border-blue-500 cursor-grab my-2 bg-gray-100 rounded',
        {
          'opacity-50 cursor-grabbing': isDragging,
          'border-blue-500': isOver,
          'border-transparent': !isOver
        }
      )}
    >
      <Card
        content={<>{content}</>}
        buttons={
          <IconButton onClick={() => removeComment()}>
            <MinusSmIcon />
          </IconButton>
        }
      />
    </div>
  )
}
