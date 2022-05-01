// Moving this to the frontend because otherwise backend will need a reference to react for @apollo/client

import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import {
  CreateColumnMutation,
  CreateColumnMutationVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  GetRetroQuery,
  GetRetroQueryVariables,
  MoveColumnMutation,
  MoveColumnMutationVariables,
  MovePostMutation,
  MovePostMutationVariables,
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  MutationMoveColumnArgs,
  MutationMovePostArgs,
  MutationRemoveColumnArgs,
  MutationRemovePostArgs,
  MutationUpdateColumnNameArgs,
  MutationUpdatePostContentArgs,
  QueryGetRetroArgs,
  RemoveColumnMutation,
  RemoveColumnMutationVariables,
  RemovePostMutation,
  RemovePostMutationVariables,
  RetroUpdatedSubscription,
  RetroUpdatedSubscriptionVariables,
  SubscriptionRetroUpdatedArgs,
  UpdateColumnNameMutation,
  UpdateColumnNameMutationVariables,
  UpdatePostContentMutation,
  UpdatePostContentMutationVariables
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
  subscription RetroUpdated($retroId: ID!) {
    retroUpdated(retroId: $retroId) {
      ...RetroFragment
    }
  }
`

const GET_RETRO = gql`
  ${RETRO_FRAGMENT}
  query GetRetro($retroId: ID!) {
    getRetro(retroId: $retroId) {
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

const UPDATE_COLUMN_NAME = gql`
  mutation UpdateColumnName(
    $retroId: ID!
    $columnId: ID!
    $columnName: String!
  ) {
    updateColumnName(
      retroId: $retroId
      columnId: $columnId
      columnName: $columnName
    )
  }
`

const UPDATE_POST_CONTENT = gql`
  mutation UpdatePostContent(
    $retroId: ID!
    $columnId: ID!
    $postId: ID!
    $postContent: String!
  ) {
    updatePostContent(
      retroId: $retroId
      columnId: $columnId
      postId: $postId
      postContent: $postContent
    )
  }
`

const MOVE_COLUMN = gql`
  mutation MoveColumn($retroId: ID!, $oldColumnId: ID!, $newColumnIndex: Int!) {
    moveColumn(
      retroId: $retroId
      oldColumnId: $oldColumnId
      newColumnIndex: $newColumnIndex
    )
  }
`

const MOVE_POST = gql`
  mutation MovePost(
    $retroId: ID!
    $oldColumnId: ID!
    $oldPostId: ID!
    $newColumnId: ID!
    $newPostIndex: Int!
  ) {
    movePost(
      retroId: $retroId
      oldColumnId: $oldColumnId
      oldPostId: $oldPostId
      newColumnId: $newColumnId
      newPostIndex: $newPostIndex
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

export const useGetRetro = (getRetroArgs: QueryGetRetroArgs, skip?: boolean) =>
  useQuery<GetRetroQuery, GetRetroQueryVariables>(GET_RETRO, {
    variables: getRetroArgs,
    skip
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

export const useUpdateColumnName = (
  updateColumnNameArgs: MutationUpdateColumnNameArgs
) =>
  useMutation<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>(
    UPDATE_COLUMN_NAME,
    {
      variables: updateColumnNameArgs
    }
  )

export const useUpdatePostContent = (
  updatePostContentArgs?: MutationUpdatePostContentArgs
) =>
  useMutation<UpdatePostContentMutation, UpdatePostContentMutationVariables>(
    UPDATE_POST_CONTENT,
    {
      variables: updatePostContentArgs
    }
  )

export const useMoveColumn = (moveColumnArgs?: MutationMoveColumnArgs) =>
  useMutation<MoveColumnMutation, MoveColumnMutationVariables>(MOVE_COLUMN, {
    variables: moveColumnArgs
  })

export const useMovePost = (movePostArgs?: MutationMovePostArgs) =>
  useMutation<MovePostMutation, MovePostMutationVariables>(MOVE_POST, {
    variables: movePostArgs
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
