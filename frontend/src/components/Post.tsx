import React, { useEffect, useRef, useState } from 'react'
import * as Types from 'backend/src/types'
import {
  CheckIcon,
  ClipboardCopyIcon,
  PencilIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  TrashIcon
} from '@heroicons/react/outline'
import IconButton from 'components/IconButton'
import PostContainer from 'components/PostContainer'
import {
  useLikePost,
  useMovePost,
  useRemovePost,
  useUnlikePost,
  useUpdatePostContent
} from 'graphql/client'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import classNames from 'classnames'
import {
  getPostHoverState,
  isKeyEnterOnly,
  PostHoverState,
  useIsMountedRef
} from '../utils'
import TextArea from './TextArea'
import { actions } from 'state/retroSlice'

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
  const { id: postId, content, likes, author } = post
  const { retro, connectionId } = useAppSelector((state) => state)
  const { id: retroId, showPosts } = retro
  const isMountedRef = useIsMountedRef()

  const ref = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [postHoverState, setPostHoverState] = useState(PostHoverState.NONE)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(content)
  const [likePost] = useLikePost({ retroId, columnId, postId })
  const [unlikePost] = useUnlikePost({ retroId, columnId, postId })

  // Pick up changes
  useEffect(() => setEditContent(content), [content])

  const hasLiked = likes.find((like) => like === connectionId)
  const isAuthor = author === connectionId

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
  const dispatch = useAppDispatch()

  const [{ isDragging }, dragRef, dragPreview] = useDrag<
    PostDragItem,
    void,
    { isDragging: boolean }
  >(
    () => ({
      type: ItemTypes.Post,
      item: { postId, columnId },
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
          setTimeout(
            () => isMountedRef.current && setPostHoverState(PostHoverState.NONE)
          )
        }
      }
    }),
    [index, postHoverState]
  )

  dragRef(dropRef(ref))
  dragPreview(previewRef, { captureDraggingState: true })

  return (
    <div ref={ref} className="py-1">
      <hr
        className={classNames('border-2 rounded -translate-y-1.5', {
          'border-blue-500': postHoverState === PostHoverState.TOP,
          'border-transparent': postHoverState !== PostHoverState.TOP
        })}
      />
      <article
        ref={previewRef}
        className={classNames(
          'border-2 border-transparent hover:border-blue-500 cursor-grab bg-white rounded',
          {
            'opacity-50 cursor-grabbing': isDragging
          }
        )}
      >
        <PostContainer
          content={
            <div className="flex flex-col gap-1">
              {isEditing ? (
                <div className="flex">
                  <TextArea
                    autoFocus
                    onFocus={(e) =>
                      // ? https://stackoverflow.com/questions/10158190/how-to-set-cursor-at-the-end-in-a-textarea
                      (e.target.selectionStart = e.target.value.length)
                    }
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
                <p
                  className={classNames('cursor-text', {
                    blur: !showPosts && !isAuthor
                  })}
                  onClick={() => (showPosts || isAuthor) && setIsEditing(true)}
                >
                  {editContent}
                </p>
              )}
              {likes.length > 0 && (
                <div className="flex items-center gap-1" title="Thumbs up">
                  <ThumbUpIcon className="w-5" /> {likes.length}
                </div>
              )}
            </div>
          }
          buttons={
            <>
              {(showPosts || isAuthor) && (
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
                  title={isEditing ? 'Confirm post' : 'Edit post'}
                />
              )}

              {!isEditing && (
                <>
                  {(showPosts || isAuthor) && (
                    <IconButton
                      icon={hasLiked ? <ThumbDownIcon /> : <ThumbUpIcon />}
                      onClick={() => (hasLiked ? unlikePost() : likePost())}
                      title={hasLiked ? 'Unlike post' : 'Like post'}
                    />
                  )}

                  {(showPosts || isAuthor) && (
                    <IconButton
                      icon={<ClipboardCopyIcon />}
                      onClick={async () => {
                        dispatch(actions.clearInfo())
                        await navigator.clipboard.writeText(editContent)
                        dispatch(actions.setInfo('Post copied to clipboard'))
                      }}
                      title="Copy post to clipboard"
                    />
                  )}

                  <IconButton
                    icon={<TrashIcon />}
                    onClick={() => confirmRemovePost()}
                    title="Delete post"
                  />
                </>
              )}
            </>
          }
        />
      </article>
      <hr
        className={classNames('border-2 rounded translate-y-1.5', {
          'border-blue-500': postHoverState === PostHoverState.BOTTOM,
          'border-transparent': postHoverState !== PostHoverState.BOTTOM
        })}
      />
    </div>
  )
}
