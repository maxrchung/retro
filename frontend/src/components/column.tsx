import React, { useState } from 'react'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import IconButton from 'components/IconButton'
import Card from 'components/Card'
import Header from 'components/Header'
import { useAppSelector } from 'state/hooks'
import Post from 'components/Post'
import {
  useCreatePost,
  useRemoveColumn
} from '@maxrchung/retro-graphql/src/client'
import { Column } from '@maxrchung/retro-graphql/src/types'

interface ColumnProps {
  column: Column
  index: number
}

export default function Column(props: ColumnProps): JSX.Element {
  const { column, index } = props
  const { id: columnId, name, posts } = column

  const { id: retroId } = useAppSelector((state) => state.retro)
  const [post, setPost] = useState('')

  const [removeColumn] = useRemoveColumn({
    retroId,
    columnId
  })

  const [createPost] = useCreatePost({
    retroId,
    columnId,
    postContent: post
  })

  const isEven = index % 2 == 0
  return (
    <div
      className={
        isEven ? 'flex flex-col w-80 p-5' : 'flex flex-col w-80 p-5 bg-gray-100'
      }
    >
      <Header>
        <Card
          content={<>{name}</>}
          buttons={
            <IconButton onClick={() => removeColumn()}>
              <XIcon />
            </IconButton>
          }
        />
      </Header>

      {posts.map((post, index) => (
        <Post key={post.id} column={column} post={post} index={index} />
      ))}

      <Card
        content={
          // Ok https://stackoverflow.com/a/64556831/13183186
          <div className="flex">
            <textarea
              className="-ml-3 p-2 flex-1 rounded focus:outline-none border-2 border-blue-500 focus:border-blue-300 hover:border-blue-300 resize-none"
              onChange={(e) => setPost(e.target.value)}
              cols={0}
              rows={3}
              value={post}
            />
          </div>
        }
        buttons={
          <IconButton onClick={() => createPost()}>
            <PlusIcon />
          </IconButton>
        }
      />
    </div>
  )
}
