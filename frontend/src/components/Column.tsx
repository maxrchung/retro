// TODO: Hover styling, post drop

import React, { useEffect, useRef, useState } from 'react'
import {
  BackspaceIcon,
  CheckIcon,
  PencilIcon,
  PlusSmIcon,
  TrashIcon
} from '@heroicons/react/outline'
import IconButton from 'components/IconButton'
import ColumnHeader from 'components/ColumnHeader'
import { useAppSelector } from 'state/hooks'
import Post, { PostDragItem } from 'components/Post'
import {
  useClearColumn,
  useCreatePost,
  useMoveColumn,
  useMovePost,
  useRemoveColumn,
  useUpdateColumnName
} from 'graphql/client'
import * as Types from 'backend/src/types'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import classNames from 'classnames'
import {
  getPostHoverState,
  isKeyEnterOnly,
  PostHoverState,
  useIsMountedRef
} from '../utils'
import { ColumnHoverState, getColumnHoverState } from '../utils'
import InputContainer from './InputContainer'
import TextArea from './TextArea'

interface ColumnProps {
  column: Types.Column
  index: number
}

interface ColumnDragItem {
  columnId: string
}

// Buffer space to fix flicker from column indicator to post indicator
const selectionBuffer = 24

export default function Column({ column, index }: ColumnProps): JSX.Element {
  const { id: columnId, posts, name } = column
  const { id: retroId } = useAppSelector((state) => state.retro)

  // https://www.debuggr.io/react-update-unmounted-component/
  const isMountedRef = useIsMountedRef()

  const columnRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLTableColElement>(null)
  const postsRef = useRef<HTMLDivElement>(null)
  const [editName, setEditName] = useState(name)
  const [post, setPost] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [columnHoverState, setColumnHoverState] = useState(
    ColumnHoverState.NONE
  )
  const [postHoverState, setPostHoverState] = useState(PostHoverState.NONE)

  // Pick up updates
  useEffect(() => setEditName(name), [name])

  const [removeColumn] = useRemoveColumn({
    retroId,
    columnId
  })

  const [clearColumn] = useClearColumn({
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

  const [createPost] = useCreatePost({
    retroId,
    columnId,
    postContent: post
  })

  const submitCreatePost = () => {
    createPost()
    setPost('')
  }

  const [{ isDragging }, dragRef, dragPreview] = useDrag<
    ColumnDragItem,
    void,
    { isDragging: boolean }
  >(
    () => ({
      type: ItemTypes.Column,
      item: { columnId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [isEditing]
  )

  const [, dropColumnRef] = useDrop<ColumnDragItem, void, void>(
    () => ({
      accept: ItemTypes.Column,
      hover: (item, monitor) =>
        setColumnHoverState(getColumnHoverState(monitor, columnRef)),
      drop: (item) => {
        if (columnHoverState === ColumnHoverState.NONE) {
          return
        }

        if (columnId === item.columnId) {
          return
        }

        moveColumn({
          variables: {
            retroId,
            oldColumnId: item.columnId,
            targetColumnId: columnId,
            columnMoveDirection:
              columnHoverState === ColumnHoverState.LEFT
                ? Types.ColumnMoveDirection.Left
                : Types.ColumnMoveDirection.Right
          }
        })
      },
      collect: (monitor) => {
        if (!monitor.isOver()) {
          // Hack to reduce flickering as border changes from one post to the next
          setColumnHoverState(ColumnHoverState.NONE)
        }
      }
    }),
    [index, columnHoverState]
  )

  const [, dropPostRef] = useDrop<PostDragItem, void, void>(
    () => ({
      accept: ItemTypes.Post,
      hover: (item, monitor) => {
        const current = postsRef.current
        if (!current) {
          setPostHoverState(PostHoverState.NONE)
          return
        }

        // Mouse position
        const mouseOffset = monitor.getClientOffset()
        if (!mouseOffset) {
          setPostHoverState(PostHoverState.NONE)
          return
        }

        // Bounding rect of post
        const currentRect = current.getBoundingClientRect()
        if (
          mouseOffset.y > currentRect.top + selectionBuffer &&
          mouseOffset.y < currentRect.bottom - selectionBuffer
        ) {
          setPostHoverState(PostHoverState.NONE)
          return
        }

        setPostHoverState(getPostHoverState(monitor, postsRef))
      },
      drop: (item, monitor) => {
        const postHoverState = getPostHoverState(monitor, postsRef)
        if (postHoverState === PostHoverState.NONE) {
          return
        }

        movePost({
          variables: {
            retroId,
            oldColumnId: item.columnId,
            oldPostId: item.postId,
            targetColumnId: columnId,
            targetPostId: '',
            postMoveDirection:
              postHoverState === PostHoverState.TOP
                ? Types.PostMoveDirection.Top
                : Types.PostMoveDirection.Bottom
          }
        })
      },
      collect: (monitor) => {
        if (!monitor.isOver()) {
          // Hack to reduce flickering as border changes from one post to the next
          setTimeout(
            // Ensure we are mounted otherwise we will raise console error for updating on unmounted component
            () => isMountedRef.current && setPostHoverState(PostHoverState.NONE)
          )
        }
      }
    }),
    [index, columnHoverState]
  )

  dragRef(dropPostRef(dropColumnRef(columnRef)))
  dragPreview(previewRef, { captureDraggingState: true })

  return (
    <div className="flex items-start" ref={columnRef}>
      <hr
        className={classNames('border-2 rounded -translate-x-0.5 h-full', {
          'border-blue-500': columnHoverState === ColumnHoverState.LEFT,
          'border-transparent': columnHoverState !== ColumnHoverState.LEFT
        })}
      />

      <section
        ref={previewRef}
        className={classNames(
          'flex flex-col w-80 cursor-grab border-2 border-transparent hover:border-blue-500 bg-gray-100 rounded mx-1 h-full',
          {
            'opacity-50 cursor-grabbing': isDragging
          }
        )}
      >
        <ColumnHeader
          content={
            <>
              {isEditing ? (
                <div className="flex flex-auto py-1">
                  <TextArea
                    autoFocus
                    onFocus={(e) =>
                      // ? https://stackoverflow.com/questions/10158190/how-to-set-cursor-at-the-end-in-a-textarea
                      (e.target.selectionStart = e.target.value.length)
                    }
                    onKeyDown={(e) => {
                      if (isKeyEnterOnly(e)) {
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
                <h2
                  className="cursor-text px-3 font-bold"
                  onClick={() => setIsEditing(true)}
                >
                  {editName}
                </h2>
              )}
            </>
          }
          buttons={
            <>
              <IconButton
                icon={isEditing ? <CheckIcon /> : <PencilIcon />}
                onClick={() => {
                  isEditing
                    ? updateColumnName({
                        variables: {
                          retroId,
                          columnId,
                          columnName: editName
                        }
                      })
                    : setEditName(name)
                  setIsEditing(!isEditing)
                }}
                title={isEditing ? 'Confirm column name' : 'Edit column name'}
              />

              {!isEditing && (
                <>
                  <IconButton
                    icon={<BackspaceIcon />}
                    onClick={() =>
                      confirm(
                        'Are you sure you want to clear this column? All posts in the column will be deleted.'
                      ) && clearColumn()
                    }
                    title="Clear all posts in column"
                  />
                  <IconButton
                    icon={<TrashIcon />}
                    onClick={() =>
                      confirm(
                        'Are you sure you want to delete this column? All posts in the column will be deleted.'
                      ) && removeColumn()
                    }
                    title="Delete column"
                  />
                </>
              )}
            </>
          }
        />
        <div className="py-1 px-3">
          <InputContainer
            content={
              // Ok https://stackoverflow.com/a/64556831/13183186
              <div className="flex">
                <TextArea
                  onKeyDown={(e) => {
                    if (isKeyEnterOnly(e)) {
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
            button={
              <IconButton
                icon={<PlusSmIcon />}
                onClick={() => {
                  submitCreatePost()
                }}
                title="Create post"
              />
            }
          />
        </div>
        <div className="px-3 overflow-auto pt-3" ref={postsRef}>
          <hr
            className={classNames('border-2 rounded translate-y-0.5', {
              'border-blue-500': postHoverState === PostHoverState.TOP,
              'border-transparent': postHoverState !== PostHoverState.TOP
            })}
          />

          {posts.map((post, index) => (
            <Post key={post.id} column={column} post={post} index={index} />
          ))}

          <hr
            className={classNames('border-2 rounded -translate-y-0.5', {
              'border-blue-500': postHoverState === PostHoverState.BOTTOM,
              'border-transparent': postHoverState !== PostHoverState.BOTTOM
            })}
          />
        </div>
      </section>

      <hr
        className={classNames('border-2 rounded translate-x-0.5 h-full', {
          'border-blue-500': columnHoverState === ColumnHoverState.RIGHT,
          'border-transparent': columnHoverState !== ColumnHoverState.RIGHT
        })}
      />
    </div>
  )
}
