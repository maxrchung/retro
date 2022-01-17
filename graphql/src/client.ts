// https://www.apollographql.com/docs/react/api/react/hooks/

import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import {
  CreateColumnMutation,
  CreateColumnMutationVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  GetRetroQuery,
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
  RetroUpdatedSubscription,
  RetroUpdatedSubscriptionVariables,
  SubscriptionRetroUpdatedArgs,
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

const RETRO_UPDATED = gql`
  subscription RetroUpdated($retroId: ID!) {
    retroUpdated(retroId: $retroId) {
      ...RetroFragment
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
  mutation CreateColumn($retroId: ID!, $columnName: String!) {
    createColumn(retroId: $retroId, columnName: $columnName) {
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

export const useRetroUpdated = (
  retroUpdatedArgs: SubscriptionRetroUpdatedArgs
) =>
  useSubscription<RetroUpdatedSubscription, RetroUpdatedSubscriptionVariables>(
    RETRO_UPDATED,
    {
      variables: retroUpdatedArgs
    }
  )

export const useGetRetro = (getRetroArgs: QueryGetRetroArgs) =>
  useQuery<GetRetroQuery, GetRetroQueryVariables>(GET_RETRO, {
    variables: getRetroArgs
  })

export const useCreateColumn = (createColumnArgs: MutationCreateColumnArgs) =>
  useMutation<CreateColumnMutation, CreateColumnMutationVariables>(
    CREATE_COLUMN,
    {
      variables: createColumnArgs
    }
  )

export const useCreatePost = (createPostArgs: MutationCreatePostArgs) =>
  useMutation<CreatePostMutation, CreatePostMutationVariables>(CREATE_POST, {
    variables: createPostArgs
  })

export const useUpdateColumn = (updateColumnArgs: MutationUpdateColumnArgs) =>
  useMutation<UpdateColumnMutation, UpdateColumnMutationVariables>(
    UPDATE_COLUMN,
    {
      variables: updateColumnArgs
    }
  )

export const useUpdatePost = (updatePostArgs: MutationUpdatePostArgs) =>
  useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UPDATE_POST, {
    variables: updatePostArgs
  })

export const useRemoveColumn = (removeColumnArgs: MutationRemoveColumnArgs) =>
  useMutation<RemoveColumnMutation, RemoveColumnMutationVariables>(
    REMOVE_COLUMN,
    {
      variables: removeColumnArgs
    }
  )

export const useRemovePost = (removePostArgs: MutationRemovePostArgs) =>
  useMutation<RemovePostMutation, RemovePostMutationVariables>(REMOVE_POST, {
    variables: removePostArgs
  })
