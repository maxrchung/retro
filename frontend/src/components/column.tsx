import React, { useState } from 'react'
import { PencilIcon, PlusIcon, XIcon } from '@heroicons/react/solid'
import IconButton from 'components/IconButton'
import Card from 'components/Card'
import Header from 'components/Header'
import { useAppSelector } from 'state/hooks'
import Post from 'components/Post'
import { useCreatePost, useRemoveColumn } from 'graphql/client'
import * as Types from 'graphql/types'
import TextareaAutosize from 'react-textarea-autosize'

interface ColumnProps {
  column: Types.Column
  index: number
}

export default function Column(props: ColumnProps): JSX.Element {
  const { column } = props
  const { id: columnId, name, posts } = column

  const { id: retroId } = useAppSelector((state) => state.retro)
  const [post, setPost] = useState('')

  const [removeColumn] = useRemoveColumn({
    retroId,
    columnId
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
          content={<>{name}</>}
          buttons={
            <>
              <IconButton onClick={() => confirmRemoveColumn()}>
                <XIcon />
              </IconButton>
              <IconButton onClick={() => {}}>
                <PencilIcon />
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
