import React, { useContext, useState } from 'react'
import { Column, Post } from 'graphql/types'
import { MinusSmIcon } from '@heroicons/react/outline'
import IconButton from 'components/IconButton'
import Card from 'components/Card'
import { useRemovePost } from 'graphql/client'
import { useAppSelector } from 'state/hooks'

interface PostProps {
  column: Column
  post: Post
  index: number
}

export default function Post(props: PostProps): JSX.Element {
  const { column, post, index } = props
  const { id: columnId } = column
  const { id: postId, content } = post

  const { id: retroId } = useAppSelector((state) => state.retro)

  const [removeComment] = useRemovePost({
    retroId,
    columnId,
    postId
  })

  const isEven = index % 2 == 0
  return (
    <div
      className={isEven ? 'my-2 bg-gray-100 rounded' : 'my-2 bg-white rounded'}
    >
      <Card
        content={<>{content}</>}
        buttons={
          <IconButton onClick={() => removeComment()}>
            <MinusSmIcon />
          </IconButton>
        }
      />
    </div>
  )
}
