import React, { useRef, useState } from 'react'
import * as Types from 'graphql/types'
import { CheckIcon, PencilIcon, XIcon } from '@heroicons/react/solid'
import IconButton from 'components/IconButton'
import Card from 'components/Card'
import {
  useMovePost,
  useRemovePost,
  useUpdatePostContent
} from 'graphql/client'
import { useAppSelector } from 'state/hooks'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import classNames from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'

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

export default function Post({ column, post, index }: PostProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const [hoverState, setHoverState] = useState(HoverState.NONE)
  const [isEditing, setIsEditing] = useState(false)
  const [displayContent, setDisplayContent] = useState(post.content)
  const [editContent, setEditContent] = useState(displayContent)

  const { id: columnId } = column
  const { id: postId } = post
  const { id: retroId } = useAppSelector((state) => state.retro)

  const [removePost] = useRemovePost({
    retroId,
    columnId,
    postId
  })

  const confirmRemovePost = () => {
    if (confirm('Are you sure you want to delete this post?')) {
      removePost()
    }
  }

  const [movePost] = useMovePost()
  const [updatePostContent] = useUpdatePostContent()

  const [{ isDragging }, dragRef] = useDrag<
    PostDragItem,
    void,
    { isDragging: boolean }
  >(
    () => ({
      type: ItemTypes.Post,
      item: { postId, columnId },
      canDrag: !isEditing,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [isEditing]
  )

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
          // Hack to reduce flickering as border changes from one post to the next
          setTimeout(() => setHoverState(HoverState.NONE))
        }
      }
    }),
    [index, hoverState]
  )

  dragRef(dropRef(ref))

  return (
    <div ref={ref} className="py-1">
      <hr
        className={classNames('border-2 -translate-y-1.5', {
          'border-blue-500': hoverState === HoverState.TOP,
          'border-transparent': hoverState !== HoverState.TOP
        })}
      />
      <div
        className={classNames(
          'border-2 border-transparent hover:border-blue-500 cursor-grab bg-gray-100 rounded',
          {
            'opacity-50 cursor-grabbing': isDragging
          }
        )}
      >
        <Card
          content={
            <>
              {isEditing ? (
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
                        setIsEditing(false)
                        setDisplayContent(editContent)
                        updatePostContent({
                          variables: {
                            retroId,
                            columnId,
                            postId,
                            postContent: editContent
                          }
                        })
                      } else if (e.key === 'Escape') {
                        setIsEditing(false)
                        setEditContent(displayContent)
                      }
                    }}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Post"
                    value={editContent}
                  />
                </div>
              ) : (
                displayContent
              )}
            </>
          }
          buttons={
            <>
              <IconButton onClick={() => confirmRemovePost()}>
                <XIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  isEditing
                    ? setDisplayContent(editContent)
                    : setEditContent(displayContent)
                  setIsEditing(!isEditing)
                }}
              >
                {isEditing ? <CheckIcon /> : <PencilIcon />}
              </IconButton>
            </>
          }
        />
      </div>
      <hr
        className={classNames('border-2 translate-y-1.5', {
          'border-blue-500': hoverState === HoverState.BOT,
          'border-transparent': hoverState !== HoverState.BOT
        })}
      />
    </div>
  )
}
