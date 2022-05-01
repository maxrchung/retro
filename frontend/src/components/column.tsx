import React, { useState } from 'react'
import { CheckIcon, PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid'
import IconButton from 'components/IconButton'
import Card from 'components/Card'
import Header from 'components/Header'
import { useAppSelector } from 'state/hooks'
import Post from 'components/Post'
import {
  useCreatePost,
  useRemoveColumn,
  useUpdateColumnName
} from 'graphql/client'
import * as Types from 'graphql/types'
import TextareaAutosize from 'react-textarea-autosize'

interface ColumnProps {
  column: Types.Column
  index: number
}

export default function Column({ column }: ColumnProps): JSX.Element {
  const [displayName, setDisplayName] = useState(column.name)
  const [editName, setEditName] = useState(displayName)
  const { id: columnId, posts } = column

  const { id: retroId } = useAppSelector((state) => state.retro)
  const [post, setPost] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const [removeColumn] = useRemoveColumn({
    retroId,
    columnId
  })

  const [updateColumnName] = useUpdateColumnName({
    retroId,
    columnId,
    columnName: editName
  })

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

  return (
    <div className={'flex flex-col w-80 p-5'}>
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
                        setDisplayName(editName)
                        updateColumnName({
                          variables: {
                            retroId,
                            columnId,
                            columnName: editName
                          }
                        })
                      } else if (e.key === 'Escape') {
                        setIsEditing(false)
                        setEditName(displayName)
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
                  {displayName}
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
                  isEditing
                    ? setDisplayName(editName)
                    : setEditName(displayName)
                  setIsEditing(!isEditing)
                }}
              >
                {isEditing ? <CheckIcon /> : <PencilIcon />}
              </IconButton>
            </>
          }
        />
      </Header>

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

      {posts.map((post, index) => (
        <Post key={post.id} column={column} post={post} index={index} />
      ))}
    </div>
  )
}
