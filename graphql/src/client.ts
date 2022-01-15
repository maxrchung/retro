// https://www.apollographql.com/docs/react/api/react/hooks/

import { gql, useQuery } from '@apollo/client'
import {
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  MutationRemoveColumnArgs,
  MutationRemovePostArgs,
  MutationUpdateColumnArgs,
  MutationUpdatePostArgs,
  QueryGetRetroArgs
} from './types'

gql`
  fragment RetroFragment on Retro {
    id
    columns {
      id
      name
      posts {
        id
        content
      }
    }
  }
`

const GET_RETRO = gql`
  query GetRetro($id: ID!) {
    getRetro(id: $id) {
      ...RetroFragment
    }
  }
`

const CREATE_COLUMN = gql`
  mutation CreateColumn($retroId: ID!, $columnId: ID!, $columnName: String!) {
    createColumn(
      retroId: $retroId
      columnId: $columnId
      columnName: $columnName
    ) {
      ...RetroFragment
    }
  }
`

const CREATE_POST = gql`
  mutation CreatePost($retroId: ID!, $columnId: ID!, $postContent: String!) {
    createPost(
      retroId: $retroId
      columnId: $columnId
      postContent: $postContent
    ) {
      ...RetroFragment
    }
  }
`

const UPDATE_COLUMN = gql`
  mutation UpdateColumn($retroId: ID!, $columnId: ID!, $columnName: String!) {
    updateColumn(
      retroId: $retroId
      columnId: $columnId
      columnName: $columnName
    ) {
      ...RetroFragment
    }
  }
`

const UPDATE_POST = gql`
  mutation UpdatePost(
    $retroId: ID!
    $columnId: ID!
    $postId: ID!
    $postContent: String!
  ) {
    updatePost(
      retroId: $retroId
      columnId: $columnId
      postId: $postId
      postContent: $postContent
    ) {
      ...RetroFragment
    }
  }
`

const REMOVE_COLUMN = gql`
  mutation RemoveColumn($retroId: ID!, $columnId: ID!) {
    removeColumn(retroId: $retroId, columnId: $columnId) {
      ...RetroFragment
    }
  }
`

const REMOVE_POST = gql`
  mutation RemovePost($retroId: ID!, $columnId: ID!, $postId: ID!) {
    removePost(retroId: $retroId, columnId: $columnId, postId: $postId) {
      ...RetroFragment
    }
  }
`

const useGetRetro = (getRetroArgs: QueryGetRetroArgs) =>
  useQuery<QueryGetRetroArgs>(GET_RETRO, { variables: getRetroArgs })

const useCreateColumn = (createColumnArgs: MutationCreateColumnArgs) =>
  useQuery<MutationCreateColumnArgs>(CREATE_COLUMN, {
    variables: createColumnArgs
  })

const useCreatePost = (createPostArgs: MutationCreatePostArgs) =>
  useQuery<MutationCreatePostArgs>(CREATE_POST, { variables: createPostArgs })

const useUpdateColumn = (updateColumnArgs: MutationUpdateColumnArgs) =>
  useQuery<MutationUpdateColumnArgs>(UPDATE_COLUMN, {
    variables: updateColumnArgs
  })

const useUpdatePost = (updatePostArgs: MutationUpdatePostArgs) =>
  useQuery<MutationUpdatePostArgs>(UPDATE_POST, { variables: updatePostArgs })

const useRemoveColumn = (removeColumnArgs: MutationRemoveColumnArgs) =>
  useQuery<MutationRemoveColumnArgs>(REMOVE_COLUMN, {
    variables: removeColumnArgs
  })

const useRemovePost = (removePostArgs: MutationRemovePostArgs) =>
  useQuery<MutationRemovePostArgs>(REMOVE_POST, { variables: removePostArgs })

export {
  useGetRetro,
  useCreateColumn,
  useCreatePost,
  useUpdateColumn,
  useUpdatePost,
  useRemoveColumn,
  useRemovePost
}
