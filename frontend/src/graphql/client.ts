// Yeah I'm good
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { gql, useMutation, useQuery, useSubscription } from '@apollo/client'
import {
  ClearColumnMutation,
  ClearColumnMutationVariables,
  ClearRetroMutation,
  ClearRetroMutationVariables,
  CloneRetroMutation,
  CloneRetroMutationVariables,
  ColumnsUpdatedSubscription,
  ColumnsUpdatedSubscriptionVariables,
  CreateColumnMutation,
  CreateColumnMutationVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  CreateRetroMutation,
  CreateRetroMutationVariables,
  GetRetroQuery,
  GetRetroQueryVariables,
  HidePostsMutation,
  HidePostsMutationVariables,
  LikePostMutation,
  LikePostMutationVariables,
  MoveColumnMutation,
  MoveColumnMutationVariables,
  MovePostMutation,
  MovePostMutationVariables,
  MutationClearColumnArgs,
  MutationClearRetroArgs,
  MutationCloneRetroArgs,
  MutationCreateColumnArgs,
  MutationCreatePostArgs,
  MutationHidePostsArgs,
  MutationLikePostArgs,
  MutationMoveColumnArgs,
  MutationMovePostArgs,
  MutationRemoveColumnArgs,
  MutationRemovePostArgs,
  MutationRemoveRetroArgs,
  MutationShowPostsArgs,
  MutationUpdateColumnNameArgs,
  MutationUpdatePostContentArgs,
  MutationUpdateRetroNameArgs,
  MutationUpdateTimerArgs,
  OptionsUpdatedSubscription,
  OptionsUpdatedSubscriptionVariables,
  QueryGetRetroArgs,
  RemoveColumnMutation,
  RemoveColumnMutationVariables,
  RemovePostMutation,
  RemovePostMutationVariables,
  RemoveRetroMutation,
  RemoveRetroMutationVariables,
  RetroRemovedSubscription,
  RetroRemovedSubscriptionVariables,
  ShowPostsMutation,
  ShowPostsMutationVariables,
  SubscriptionColumnsUpdatedArgs,
  SubscriptionOptionsUpdatedArgs,
  SubscriptionRetroRemovedArgs,
  UnlikePostMutation,
  UnlikePostMutationVariables,
  UpdateColumnNameMutation,
  UpdateColumnNameMutationVariables,
  UpdatePostContentMutation,
  UpdatePostContentMutationVariables,
  UpdateRetroNameMutation,
  UpdateRetroNameMutationVariables,
  UpdateTimerMutation,
  UpdateTimerMutationVariables
} from 'backend/src/types'

// Naming to differentiate subscriptions from queries/mutations
const COLUMNS_UPDATED = gql`
  subscription ColumnsUpdated($retroId: ID!) {
    columnsUpdated(retroId: $retroId) {
      id
      columns {
        id
        name
        posts {
          id
          content
          author
          likes
        }
      }
    }
  }
`

const OPTIONS_UPDATED = gql`
  subscription OptionsUpdated($retroId: ID!) {
    optionsUpdated(retroId: $retroId) {
      id
      name
      timerEnd
      showPosts
    }
  }
`

const RETRO_REMOVED = gql`
  subscription RetroRemoved($retroId: ID!) {
    retroRemoved(retroId: $retroId) {
      id
    }
  }
`

const GET_RETRO = gql`
  query GetRetro($retroId: ID!) {
    getRetro(retroId: $retroId) {
      id
      name
      columns {
        id
        name
        posts {
          id
          content
          author
          likes
        }
      }
      showPosts
      createdAt
      lastUpdated
      lastViewed
      timerEnd
    }
  }
`

const CREATE_RETRO = gql`
  mutation CreateRetro($columnNames: [String!]!) {
    createRetro(columnNames: $columnNames)
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

const UPDATE_RETRO_NAME = gql`
  mutation UpdateRetroName($retroId: ID!, $retroName: String!) {
    updateRetroName(retroId: $retroId, retroName: $retroName)
  }
`

const UPDATE_TIMER = gql`
  mutation UpdateTimer($retroId: ID!, $timerEnd: String!) {
    updateTimer(retroId: $retroId, timerEnd: $timerEnd)
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
  mutation MoveColumn(
    $retroId: ID!
    $oldColumnId: ID!
    $targetColumnId: ID!
    $columnMoveDirection: ColumnMoveDirection!
  ) {
    moveColumn(
      retroId: $retroId
      oldColumnId: $oldColumnId
      targetColumnId: $targetColumnId
      columnMoveDirection: $columnMoveDirection
    )
  }
`

const MOVE_POST = gql`
  mutation MovePost(
    $retroId: ID!
    $oldColumnId: ID!
    $oldPostId: ID!
    $targetColumnId: ID!
    $targetPostId: ID
    $postMoveDirection: PostMoveDirection!
  ) {
    movePost(
      retroId: $retroId
      oldColumnId: $oldColumnId
      oldPostId: $oldPostId
      targetColumnId: $targetColumnId
      targetPostId: $targetPostId
      postMoveDirection: $postMoveDirection
    )
  }
`

const REMOVE_RETRO = gql`
  mutation RemoveRetro($retroId: ID!) {
    removeRetro(retroId: $retroId)
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

const CLEAR_RETRO = gql`
  mutation ClearRetro($retroId: ID!) {
    clearRetro(retroId: $retroId)
  }
`

const CLEAR_COLUMN = gql`
  mutation ClearColumn($retroId: ID!, $columnId: ID!) {
    clearColumn(retroId: $retroId, columnId: $columnId)
  }
`

const CLONE_RETRO = gql`
  mutation CloneRetro($retroId: ID!) {
    cloneRetro(retroId: $retroId)
  }
`

const LIKE_POST = gql`
  mutation LikePost($retroId: ID!, $columnId: ID!, $postId: ID!) {
    likePost(retroId: $retroId, columnId: $columnId, postId: $postId)
  }
`

const UNLIKE_POST = gql`
  mutation UnlikePost($retroId: ID!, $columnId: ID!, $postId: ID!) {
    unlikePost(retroId: $retroId, columnId: $columnId, postId: $postId)
  }
`

const SHOW_POSTS = gql`
  mutation ShowPosts($retroId: ID!) {
    showPosts(retroId: $retroId)
  }
`

const HIDE_POSTS = gql`
  mutation HidePosts($retroId: ID!) {
    hidePosts(retroId: $retroId)
  }
`

export const useColumnsUpdated = (
  columnsUpdatedArgs: SubscriptionColumnsUpdatedArgs,
  skip?: boolean
) =>
  useSubscription<
    ColumnsUpdatedSubscription,
    ColumnsUpdatedSubscriptionVariables
  >(COLUMNS_UPDATED, {
    variables: columnsUpdatedArgs,
    skip
  })

export const useOptionsUpdated = (
  optionsUpdatedArgs: SubscriptionOptionsUpdatedArgs,
  skip?: boolean
) =>
  useSubscription<
    OptionsUpdatedSubscription,
    OptionsUpdatedSubscriptionVariables
  >(OPTIONS_UPDATED, {
    variables: optionsUpdatedArgs,
    skip
  })

export const useRetroRemoved = (
  retroRemovedArgs: SubscriptionRetroRemovedArgs,
  skip?: boolean
) =>
  useSubscription<RetroRemovedSubscription, RetroRemovedSubscriptionVariables>(
    RETRO_REMOVED,
    {
      variables: retroRemovedArgs,
      skip
    }
  )

export const useGetRetro = (getRetroArgs: QueryGetRetroArgs, skip?: boolean) =>
  useQuery<GetRetroQuery, GetRetroQueryVariables>(GET_RETRO, {
    variables: getRetroArgs,
    skip
  })

export const useCreateRetro = () =>
  useMutation<CreateRetroMutation, CreateRetroMutationVariables>(CREATE_RETRO)

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

export const useUpdateRetroName = (
  updateRetroNameArgs?: MutationUpdateRetroNameArgs
) =>
  useMutation<UpdateRetroNameMutation, UpdateRetroNameMutationVariables>(
    UPDATE_RETRO_NAME,
    {
      variables: updateRetroNameArgs
    }
  )

export const useUpdateTimer = (updateTimerArgs?: MutationUpdateTimerArgs) =>
  useMutation<UpdateTimerMutation, UpdateTimerMutationVariables>(UPDATE_TIMER, {
    variables: updateTimerArgs
  })

export const useUpdateColumnName = (
  updateColumnNameArgs?: MutationUpdateColumnNameArgs
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

export const useRemoveRetro = (removeRetroArgs: MutationRemoveRetroArgs) =>
  useMutation<RemoveRetroMutation, RemoveRetroMutationVariables>(REMOVE_RETRO, {
    variables: removeRetroArgs
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

export const useClearRetro = (clearRetroArgs: MutationClearRetroArgs) =>
  useMutation<ClearRetroMutation, ClearRetroMutationVariables>(CLEAR_RETRO, {
    variables: clearRetroArgs
  })

export const useClearColumn = (clearColumnArgs: MutationClearColumnArgs) =>
  useMutation<ClearColumnMutation, ClearColumnMutationVariables>(CLEAR_COLUMN, {
    variables: clearColumnArgs
  })

export const useCloneRetro = (cloneRetroArgs: MutationCloneRetroArgs) =>
  useMutation<CloneRetroMutation, CloneRetroMutationVariables>(CLONE_RETRO, {
    variables: cloneRetroArgs
  })

export const useLikePost = (likePostArgs: MutationLikePostArgs) =>
  useMutation<LikePostMutation, LikePostMutationVariables>(LIKE_POST, {
    variables: likePostArgs
  })

export const useUnlikePost = (unlikePostArgs: MutationLikePostArgs) =>
  useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UNLIKE_POST, {
    variables: unlikePostArgs
  })

export const useShowPosts = (showPostsArgs: MutationShowPostsArgs) =>
  useMutation<ShowPostsMutation, ShowPostsMutationVariables>(SHOW_POSTS, {
    variables: showPostsArgs
  })

export const useHidePosts = (hidePostsArgs: MutationHidePostsArgs) =>
  useMutation<HidePostsMutation, HidePostsMutationVariables>(HIDE_POSTS, {
    variables: hidePostsArgs
  })
