// https://www.apollographql.com/docs/react/api/react/hooks/

import { gql, useQuery } from '@apollo/client'
import {
  CreateColumnMutation,
  CreateColumnMutationVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  GetRetroQuery,
  GetRetroQueryResult,
  GetRetroQueryVariables,
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  MutationRemoveColumnArgs,
  MutationRemovePostArgs,
  MutationUpdateColumnArgs,
  MutationUpdatePostArgs,
  QueryGetRetroArgs,
  RemoveColumnMutation,
  RemoveColumnMutationVariables,
  RemovePostMutation,
  RemovePostMutationVariables,
  UpdateColumnMutation,
  UpdateColumnMutationVariables,
  UpdatePostMutation,
  UpdatePostMutationVariables
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

export const useGetRetro = (getRetroArgs: QueryGetRetroArgs) =>
  useQuery<GetRetroQuery, GetRetroQueryVariables>(GET_RETRO, {
    variables: getRetroArgs
  })

export const useCreateColumn = (createColumnArgs: MutationCreateColumnArgs) =>
  useQuery<CreateColumnMutation, CreateColumnMutationVariables>(CREATE_COLUMN, {
    variables: createColumnArgs
  })

export const useCreatePost = (createPostArgs: MutationCreatePostArgs) =>
  useQuery<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST, {
    variables: createPostArgs
  })

export const useUpdateColumn = (updateColumnArgs: MutationUpdateColumnArgs) =>
  useQuery<UpdateColumnMutation, UpdateColumnMutationVariables>(UPDATE_COLUMN, {
    variables: updateColumnArgs
  })

export const useUpdatePost = (updatePostArgs: MutationUpdatePostArgs) =>
  useQuery<UpdatePostMutation, UpdatePostMutationVariables>(UPDATE_POST, {
    variables: updatePostArgs
  })

export const useRemoveColumn = (removeColumnArgs: MutationRemoveColumnArgs) =>
  useQuery<RemoveColumnMutation, RemoveColumnMutationVariables>(REMOVE_COLUMN, {
    variables: removeColumnArgs
  })

export const useRemovePost = (removePostArgs: MutationRemovePostArgs) =>
  useQuery<RemovePostMutation, RemovePostMutationVariables>(REMOVE_POST, {
    variables: removePostArgs
  })
