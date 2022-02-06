// Moving this to the frontend because otherwise backend will need a reference to react for @apollo/client

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
} from 'graphql/types'

const RETRO_FRAGMENT = gql`
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
  ${RETRO_FRAGMENT}
  subscription RetroUpdated($id: ID!) {
    retroUpdated(id: $id) {
      ...RetroFragment
    }
  }
`

const GET_RETRO = gql`
  ${RETRO_FRAGMENT}
  query GetRetro($id: ID!) {
    getRetro(id: $id) {
      ...RetroFragment
    }
  }
`

const CREATE_COLUMN = gql`
  mutation CreateColumn($retroId: ID!, $columnName: String!) {
    createColumn(retroId: $retroId, columnName: $columnName)
  }
`

const CREATE_POST = gql`
  mutation CreatePost($retroId: ID!, $columnId: ID!, $postContent: String!) {
    createPost(
      retroId: $retroId
      columnId: $columnId
      postContent: $postContent
    )
  }
`

const UPDATE_COLUMN = gql`
  mutation UpdateColumn($retroId: ID!, $columnId: ID!, $columnName: String!) {
    updateColumn(
      retroId: $retroId
      columnId: $columnId
      columnName: $columnName
    )
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
    )
  }
`

const REMOVE_COLUMN = gql`
  mutation RemoveColumn($retroId: ID!, $columnId: ID!) {
    removeColumn(retroId: $retroId, columnId: $columnId)
  }
`

const REMOVE_POST = gql`
  mutation RemovePost($retroId: ID!, $columnId: ID!, $postId: ID!) {
    removePost(retroId: $retroId, columnId: $columnId, postId: $postId)
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
