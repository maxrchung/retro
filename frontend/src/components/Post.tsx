import React, { useEffect, useRef, useState } from 'react'
import * as Types from 'graphql/types'
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'
import IconButton from 'components/IconButton'
import PostContainer from 'components/PostContainer'
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
import { getPostHoverState, isKeyEnterOnly, PostHoverState } from '../utils'

interface PostProps {
  column: Types.Column
  post: Types.Post
  index: number
}

export interface PostDragItem {
  columnId: string
  postId: string
}

export default function Post({ column, post, index }: PostProps): JSX.Element {
  const { id: columnId } = column
  const { id: postId, content } = post
  const { id: retroId } = useAppSelector((state) => state.retro)

  const ref = useRef<HTMLDivElement>(null)
  const [postHoverState, setPostHoverState] = useState(PostHoverState.NONE)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)

  // Pick up changes
  useEffect(() => setEditContent(content), [content])

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
      hover: (item, monitor) =>
        setPostHoverState(getPostHoverState(monitor, ref)),
      drop: (item) => {
        if (postHoverState === PostHoverState.NONE) {
          return
        }

        if (postId === item.postId) {
          return
        }

        movePost({
          variables: {
            retroId,
            oldColumnId: item.columnId,
            oldPostId: item.postId,
            targetColumnId: columnId,
            targetPostId: postId,
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
          setTimeout(() => setPostHoverState(PostHoverState.NONE))
        }
      }
    }),
    [index, postHoverState]
  )

  dragRef(dropRef(ref))

  return (
    <div ref={ref} className="py-1">
      <hr
        className={classNames('border-2 rounded -translate-y-1.5', {
          'border-blue-500': postHoverState === PostHoverState.TOP,
          'border-transparent': postHoverState !== PostHoverState.TOP
        })}
      />
      <div
        className={classNames(
          'border-2 border-transparent hover:border-blue-500 cursor-grab bg-white rounded',
          {
            'opacity-50 cursor-grabbing': isDragging
          }
        )}
      >
        <PostContainer
          content={
            <>
              {isEditing ? (
                <div className="flex">
                  <TextareaAutosize
                    autoFocus
                    onFocus={(e) =>
                      // ? https://stackoverflow.com/questions/10158190/how-to-set-cursor-at-the-end-in-a-textarea
                      (e.target.selectionStart = e.target.value.length)
                    }
                    className="-ml-3 p-3 flex-1 rounded focus:outline-none border-2 border-blue-500 focus:border-blue-300 hover:border-blue-300 resize-none"
                    onKeyDown={(e) => {
                      if (isKeyEnterOnly(e)) {
                        setIsEditing(false)
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
                        setEditContent(content)
                      }
                    }}
                    onChange={(e) => setEditContent(e.target.value)}
                    value={editContent}
                  />
                </div>
              ) : (
                <span
                  className="cursor-text"
                  onClick={() => setIsEditing(true)}
                >
                  {editContent}
                </span>
              )}
            </>
          }
          buttons={
            <>
              <IconButton
                icon={isEditing ? <CheckIcon /> : <PencilIcon />}
                onClick={() => {
                  isEditing
                    ? updatePostContent({
                        variables: {
                          retroId,
                          columnId,
                          postId,
                          postContent: editContent
                        }
                      })
                    : setEditContent(content)
                  setIsEditing(!isEditing)
                }}
              />

              <IconButton
                icon={<TrashIcon />}
                onClick={() => confirmRemovePost()}
              />
            </>
          }
        />
      </div>
      <hr
        className={classNames('border-2 rounded translate-y-1.5', {
          'border-blue-500': postHoverState === PostHoverState.BOTTOM,
          'border-transparent': postHoverState !== PostHoverState.BOTTOM
        })}
      />
    </div>
  )
}
