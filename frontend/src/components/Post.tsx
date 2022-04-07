import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
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
  dragHoverIndex: number
  setDragHoverIndex: (index: number) => void
}

interface PostDragItem {
  columnId: string
  postId: string
}

export default function Post({
  column,
  post,
  index,
  dragHoverIndex,
  setDragHoverIndex
}: PostProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)

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

  const [, dropRef] = useDrop<PostDragItem, void, void>(
    () => ({
      accept: ItemTypes.Post,
      hover: (item, monitor) => {
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

        setDragHoverIndex(mouseOffset.y <= currentMiddle ? index : index + 1)
      },
      drop: (item) => {
        movePost({
          variables: {
            retroId,
            oldColumnId: item.columnId,
            oldPostId: item.postId,
            newColumnId: columnId,
            newPostIndex: dragHoverIndex
          }
        })
      },
      collect: (monitor) => {
        // if (!monitor.isOver()) {
        //   setDragHoverIndex(-1)
        // }
      }
    }),
    [index, dragHoverIndex]
  )

  // ?? from looking at examples
  dragRef(dropRef(ref))

  return (
    <div
      ref={ref}
      className={classNames(
        'border-2 border-transparent hover:border-blue-500 cursor-grab bg-gray-100 rounded',
        {
          'opacity-50 cursor-grabbing': isDragging
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
