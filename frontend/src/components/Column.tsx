// TODO: Hover styling, post drop

import React, { useRef, useState } from 'react'
import { CheckIcon, PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid'
import IconButton from 'components/IconButton'
import Card from 'components/Card'
import Header from 'components/Header'
import { useAppSelector } from 'state/hooks'
import Post, { PostDragItem } from 'components/Post'
import {
  useCreatePost,
  useMoveColumn,
  useMovePost,
  useRemoveColumn,
  useUpdateColumnName
} from 'graphql/client'
import * as Types from 'graphql/types'
import TextareaAutosize from 'react-textarea-autosize'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import classNames from 'classnames'

interface ColumnProps {
  column: Types.Column
  index: number
}

interface ColumnDragItem {
  columnId: string
}

enum HoverState {
  NONE,
  LEFT,
  RIGHT
}

export default function Column({ column, index }: ColumnProps): JSX.Element {
  const { id: columnId, posts, name } = column
  const { id: retroId } = useAppSelector((state) => state.retro)

  const ref = useRef<HTMLDivElement>(null)
  const [editName, setEditName] = useState(name)
  const [post, setPost] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [hoverState, setHoverState] = useState(HoverState.NONE)
  const [isHovering, setIsHovering] = useState(false)

  const [removeColumn] = useRemoveColumn({
    retroId,
    columnId
  })

  const [updateColumnName] = useUpdateColumnName({
    retroId,
    columnId,
    columnName: editName
  })

  const [moveColumn] = useMoveColumn()
  const [movePost] = useMovePost()

  const confirmRemoveColumn = () => {
    if (confirm('Are you sure you want to delete this column?')) {
      removeColumn()
    }
  }

  const [createPost] = useCreatePost({
    retroId,
    columnId,
    postContent: post
  })

  const submitCreatePost = () => {
    if (post.length > 0) {
      createPost()
      setPost('')
    }
  }

  const [{ isDragging }, dragRef] = useDrag<
    ColumnDragItem,
    void,
    { isDragging: boolean }
  >(
    () => ({
      type: ItemTypes.Column,
      item: { columnId },
      canDrag: !isEditing,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [isEditing]
  )

  const [, dropColumnRef] = useDrop<ColumnDragItem, void, void>(
    () => ({
      accept: ItemTypes.Column,
      hover: (item, monitor) => {
        // Don't handle drag on self
        if (item.columnId === columnId) {
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

        // Bounding rect of column
        const currentRect = current.getBoundingClientRect()

        // Middle x-value of column
        const currentMiddle =
          currentRect.left + (currentRect.right - currentRect.left) / 2

        setHoverState(
          mouseOffset.x <= currentMiddle ? HoverState.LEFT : HoverState.RIGHT
        )
      },
      drop: (item) => {
        if (hoverState === HoverState.NONE) {
          return
        }

        moveColumn({
          variables: {
            retroId,
            oldColumnId: item.columnId,
            targetColumnId: columnId,
            columnMoveDirection:
              hoverState === HoverState.LEFT
                ? Types.ColumnMoveDirection.Left
                : Types.ColumnMoveDirection.Right
          }
        })
      },
      collect: (monitor) => {
        if (!monitor.isOver()) {
          // Hack to reduce flickering as border changes from one post to the next
          setTimeout(() => setHoverState(HoverState.NONE))
        }
      }
    }),
    [index, hoverState]
  )

  const [, dropPostRef] = useDrop<PostDragItem, void, void>(
    () => ({
      accept: ItemTypes.Post,
      hover: (item) => {
        // Don't handle drag on self
        if (item.columnId === columnId) {
          return
        }

        const current = ref.current
        if (!current) {
          return
        }

        setIsHovering(true)
      },
      drop: (item) => {
        if (isHovering) {
          return
        }

        movePost({
          variables: {
            retroId,
            oldColumnId: item.columnId,
            oldPostId: item.postId,
            targetColumnId: columnId,
            targetPostId: '',
            postMoveDirection: Types.PostMoveDirection.Top
          }
        })
      },
      collect: (monitor) => {
        if (!monitor.isOver()) {
          // Hack to reduce flickering as border changes from one post to the next
          setTimeout(() => setIsHovering(false))
        }
      }
    }),
    [index, hoverState]
  )

  dragRef(dropPostRef(dropColumnRef(ref)))

  return (
    <div ref={ref} className="flex">
      <hr
        className={classNames('border-2 -translate-x-0.5 h-full', {
          'border-blue-500': hoverState === HoverState.LEFT,
          'border-transparent': hoverState !== HoverState.LEFT
        })}
      />

      <div
        className={classNames('flex flex-col w-80 p-5 cursor-grab', {
          'opacity-50 cursor-grabbing': isDragging
        })}
      >
        <Header>
          <Card
            content={
              <>
                {isEditing ? (
                  <div className="flex">
                    <input
                      autoFocus
                      className="-ml-3 p-2 flex-1 rounded border-2 border-blue-500 focus:outline-none focus:border-blue-300 hover:border-blue-300"
                      onKeyDown={(e) => {
                        if (
                          e.key === 'Enter' &&
                          !e.altKey &&
                          !e.ctrlKey &&
                          !e.shiftKey &&
                          !e.metaKey
                        ) {
                          setIsEditing(false)
                          updateColumnName({
                            variables: {
                              retroId,
                              columnId,
                              columnName: editName
                            }
                          })
                        } else if (e.key === 'Escape') {
                          setIsEditing(false)
                          setEditName(name)
                        }
                      }}
                      onChange={(e) => setEditName(e.target.value)}
                      value={editName}
                    />
                  </div>
                ) : (
                  <span
                    className="cursor-text"
                    onClick={() => setIsEditing(true)}
                  >
                    {name}
                  </span>
                )}
              </>
            }
            buttons={
              <>
                <IconButton onClick={() => confirmRemoveColumn()}>
                  <XIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    !isEditing && setEditName(name)
                    setIsEditing(!isEditing)
                  }}
                >
                  {isEditing ? <CheckIcon /> : <PencilIcon />}
                </IconButton>
              </>
            }
          />
        </Header>

        <hr
          className={classNames('border-2 translate-y-0.5', {
            'border-blue-500': isHovering && posts.length === 0,
            'border-transparent': !isHovering || posts.length > 0
          })}
        />

        {posts.map((post, index) => (
          <Post key={post.id} column={column} post={post} index={index} />
        ))}

        <Card
          alwaysShowButtons
          content={
            // Ok https://stackoverflow.com/a/64556831/13183186
            <div className="flex">
              <TextareaAutosize
                className="-ml-3 p-2 flex-1 rounded focus:outline-none border-2 border-blue-500 focus:border-blue-300 hover:border-blue-300 resize-none"
                onKeyDown={(e) => {
                  if (
                    e.key === 'Enter' &&
                    !e.altKey &&
                    !e.ctrlKey &&
                    !e.shiftKey &&
                    !e.metaKey
                  ) {
                    submitCreatePost()
                    e.preventDefault()
                  }
                }}
                onChange={(e) => {
                  setPost(e.target.value)
                }}
                placeholder="Post"
                value={post}
              />
            </div>
          }
          buttons={
            <IconButton
              onClick={() => {
                submitCreatePost()
              }}
            >
              <PlusIcon />
            </IconButton>
          }
        />
      </div>

      <hr
        className={classNames('border-2 translate-x-0.5 h-full', {
          'border-blue-500': hoverState === HoverState.RIGHT,
          'border-transparent': hoverState !== HoverState.RIGHT
        })}
      />
    </div>
  )
}
