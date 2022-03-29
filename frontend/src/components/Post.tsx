import React, { useRef, useState } from 'react'
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

enum HoverState {
  NONE,
  TOP,
  BOT
}

export default function Post(props: PostProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const [hoverState, setHoverState] = useState<HoverState>(HoverState.NONE)

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

        setHoverState(
          mouseOffset.y <= currentMiddle ? HoverState.TOP : HoverState.BOT
        )
      },
      drop: (item) => {
        movePost({
          variables: {
            retroId,
            oldColumnId: item.columnId,
            oldPostId: item.postId,
            newColumnId: columnId,
            newPostIndex: hoverState === HoverState.TOP ? index : index + 1
          }
        })
      },
      collect: (monitor) => {
        if (!monitor.isOver()) {
          setHoverState(HoverState.NONE)
        }
      }
    }),
    [index, hoverState]
  )

  dragRef(dropRef(ref))

  return (
    <>
      <hr
        className={classNames('border-2 mt-1', {
          'border-blue-500': hoverState === HoverState.TOP,
          'border-transparent': hoverState !== HoverState.TOP
        })}
      />
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
      <hr
        className={classNames('border-2 mb-1', {
          'border-blue-500': hoverState === HoverState.BOT,
          'border-transparent': hoverState !== HoverState.BOT
        })}
      />
    </>
  )
}
