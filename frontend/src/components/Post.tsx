import React, { useRef } from 'react'
import * as Types from 'graphql/types'
import { MinusSmIcon } from '@heroicons/react/outline'
import IconButton from 'components/IconButton'
import Card from 'components/Card'
import { useMovePost, useRemovePost } from 'graphql/client'
import { useAppSelector } from 'state/hooks'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import classNames from 'classnames'

interface PostProps {
  column: Types.Column
  post: Types.Post
  index: number
}

interface PostDragItem {
  columnId: string
  postId: string
}

export default function Post(props: PostProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

  const { column, post, index } = props
  const { id: columnId } = column
  const { id: postId, content } = post
  const { id: retroId } = useAppSelector((state) => state.retro)

  const [removePost] = useRemovePost({
    retroId,
    columnId,
    postId
  })

  const [movePost] = useMovePost()

  const [{ isDragging }, dragRef] = useDrag<
    PostDragItem,
    void,
    { isDragging: boolean }
  >(() => ({
    type: ItemTypes.Post,
    item: { postId, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const [{ isOver }, dropRef] = useDrop<
    PostDragItem,
    void,
    { isOver: boolean }
  >(
    () => ({
      accept: ItemTypes.Post,
      drop: (item, monitor) => {
        // Don't handle drag on self
        if (item.postId === postId) {
          return
        }

        const current = ref.current
        if (!current) {
          return
        }

        // Mouse position
        const mouseOffset = monitor.getClientOffset()
        if (!mouseOffset) {
          return
        }

        // Bounding rect of post
        const currentRect = current.getBoundingClientRect()

        // Middle y-value of post
        const currentMiddle =
          currentRect.top + (currentRect.bottom - currentRect.top) / 2

        movePost({
          variables: {
            retroId,
            oldColumnId: item.columnId,
            oldPostId: item.postId,
            newColumnId: columnId,
            newPostIndex: mouseOffset.y <= currentMiddle ? index : index + 1
          }
        })
      },
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    }),
    [index]
  )

  dragRef(dropRef(ref))

  return (
    <div
      ref={ref}
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
          <IconButton onClick={() => removePost()}>
            <MinusSmIcon />
          </IconButton>
        }
      />
    </div>
  )
}
