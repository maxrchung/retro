import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Column = {
  __typename?: 'Column';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<Post>;
};

export enum ColumnMoveDirection {
  Left = 'LEFT',
  Right = 'RIGHT'
}

export type Mutation = {
  __typename?: 'Mutation';
  createColumn: Scalars['Boolean'];
  createPost: Scalars['Boolean'];
  createRetro: Scalars['ID'];
  moveColumn: Scalars['Boolean'];
  movePost: Scalars['Boolean'];
  removeColumn: Scalars['Boolean'];
  removePost: Scalars['Boolean'];
  removeRetro: Scalars['Boolean'];
  updateColumnName: Scalars['Boolean'];
  updatePostContent: Scalars['Boolean'];
  updateRetroName: Scalars['Boolean'];
  updateTimer: Scalars['Boolean'];
};


export type MutationCreateColumnArgs = {
  columnName: Scalars['String'];
  retroId: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  columnId: Scalars['ID'];
  postContent: Scalars['String'];
  retroId: Scalars['ID'];
};


export type MutationMoveColumnArgs = {
  columnMoveDirection: ColumnMoveDirection;
  oldColumnId: Scalars['ID'];
  retroId: Scalars['ID'];
  targetColumnId: Scalars['ID'];
};


export type MutationMovePostArgs = {
  oldColumnId: Scalars['ID'];
  oldPostId: Scalars['ID'];
  postMoveDirection: PostMoveDirection;
  retroId: Scalars['ID'];
  targetColumnId: Scalars['ID'];
  targetPostId?: InputMaybe<Scalars['ID']>;
};


export type MutationRemoveColumnArgs = {
  columnId: Scalars['ID'];
  retroId: Scalars['ID'];
};


export type MutationRemovePostArgs = {
  columnId: Scalars['ID'];
  postId: Scalars['ID'];
  retroId: Scalars['ID'];
};


export type MutationRemoveRetroArgs = {
  retroId: Scalars['ID'];
};


export type MutationUpdateColumnNameArgs = {
  columnId: Scalars['ID'];
  columnName: Scalars['String'];
  retroId: Scalars['ID'];
};


export type MutationUpdatePostContentArgs = {
  columnId: Scalars['ID'];
  postContent: Scalars['String'];
  postId: Scalars['ID'];
  retroId: Scalars['ID'];
};


export type MutationUpdateRetroNameArgs = {
  retroId: Scalars['ID'];
  retroName: Scalars['String'];
};


export type MutationUpdateTimerArgs = {
  retroId: Scalars['ID'];
  timerEnd: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export enum PostMoveDirection {
  Bottom = 'BOTTOM',
  Top = 'TOP'
}

export type Query = {
  __typename?: 'Query';
  getRetro: Retro;
};


export type QueryGetRetroArgs = {
  retroId: Scalars['ID'];
};

export type Retro = {
  __typename?: 'Retro';
  columns: Array<Column>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  lastUpdated: Scalars['String'];
  lastViewed: Scalars['String'];
  name: Scalars['String'];
  timerEnd: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  columnsUpdated: Retro;
  nameUpdated: Retro;
  timerUpdated: Retro;
};


export type SubscriptionColumnsUpdatedArgs = {
  retroId: Scalars['ID'];
};


export type SubscriptionNameUpdatedArgs = {
  retroId: Scalars['ID'];
  retroName: Scalars['String'];
};


export type SubscriptionTimerUpdatedArgs = {
  retroId: Scalars['ID'];
  timerEnd: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Column: ResolverTypeWrapper<Column>;
  ColumnMoveDirection: ColumnMoveDirection;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostMoveDirection: PostMoveDirection;
  Query: ResolverTypeWrapper<{}>;
  Retro: ResolverTypeWrapper<Retro>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Column: Column;
  ID: Scalars['ID'];
  Mutation: {};
  Post: Post;
  Query: {};
  Retro: Retro;
  String: Scalars['String'];
  Subscription: {};
};

export type ColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['Column'] = ResolversParentTypes['Column']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createColumn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateColumnArgs, 'columnName' | 'retroId'>>;
  createPost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'columnId' | 'postContent' | 'retroId'>>;
  createRetro?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  moveColumn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMoveColumnArgs, 'columnMoveDirection' | 'oldColumnId' | 'retroId' | 'targetColumnId'>>;
  movePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationMovePostArgs, 'oldColumnId' | 'oldPostId' | 'postMoveDirection' | 'retroId' | 'targetColumnId'>>;
  removeColumn?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveColumnArgs, 'columnId' | 'retroId'>>;
  removePost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemovePostArgs, 'columnId' | 'postId' | 'retroId'>>;
  removeRetro?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveRetroArgs, 'retroId'>>;
  updateColumnName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateColumnNameArgs, 'columnId' | 'columnName' | 'retroId'>>;
  updatePostContent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdatePostContentArgs, 'columnId' | 'postContent' | 'postId' | 'retroId'>>;
  updateRetroName?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateRetroNameArgs, 'retroId' | 'retroName'>>;
  updateTimer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateTimerArgs, 'retroId' | 'timerEnd'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getRetro?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<QueryGetRetroArgs, 'retroId'>>;
};

export type RetroResolvers<ContextType = any, ParentType extends ResolversParentTypes['Retro'] = ResolversParentTypes['Retro']> = {
  columns?: Resolver<Array<ResolversTypes['Column']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastUpdated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastViewed?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timerEnd?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  columnsUpdated?: SubscriptionResolver<ResolversTypes['Retro'], "columnsUpdated", ParentType, ContextType, RequireFields<SubscriptionColumnsUpdatedArgs, 'retroId'>>;
  nameUpdated?: SubscriptionResolver<ResolversTypes['Retro'], "nameUpdated", ParentType, ContextType, RequireFields<SubscriptionNameUpdatedArgs, 'retroId' | 'retroName'>>;
  timerUpdated?: SubscriptionResolver<ResolversTypes['Retro'], "timerUpdated", ParentType, ContextType, RequireFields<SubscriptionTimerUpdatedArgs, 'retroId' | 'timerEnd'>>;
};

export type Resolvers<ContextType = any> = {
  Column?: ColumnResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Retro?: RetroResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};


export type ColumnsUpdatedSubscriptionVariables = Exact<{
  retroId: Scalars['ID'];
}>;


export type ColumnsUpdatedSubscription = { __typename?: 'Subscription', columnsUpdated: { __typename?: 'Retro', id: string, columns: Array<{ __typename?: 'Column', id: string, name: string, posts: Array<{ __typename?: 'Post', id: string, content: string }> }> } };

export type NameUpdatedSubscriptionVariables = Exact<{
  retroId: Scalars['ID'];
  retroName: Scalars['String'];
}>;


export type NameUpdatedSubscription = { __typename?: 'Subscription', nameUpdated: { __typename?: 'Retro', id: string, name: string } };

export type TimerUpdatedSubscriptionVariables = Exact<{
  retroId: Scalars['ID'];
  timerEnd: Scalars['String'];
}>;


export type TimerUpdatedSubscription = { __typename?: 'Subscription', timerUpdated: { __typename?: 'Retro', id: string, timerEnd: string } };

export type GetRetroQueryVariables = Exact<{
  retroId: Scalars['ID'];
}>;


export type GetRetroQuery = { __typename?: 'Query', getRetro: { __typename?: 'Retro', id: string, name: string, createdAt: string, lastUpdated: string, lastViewed: string, timerEnd: string, columns: Array<{ __typename?: 'Column', id: string, name: string, posts: Array<{ __typename?: 'Post', id: string, content: string }> }> } };

export type CreateRetroMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateRetroMutation = { __typename?: 'Mutation', createRetro: string };

export type CreateColumnMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnName: Scalars['String'];
}>;


export type CreateColumnMutation = { __typename?: 'Mutation', createColumn: boolean };

export type CreatePostMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
  postContent: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: boolean };

export type UpdateRetroNameMutationVariables = Exact<{
  retroId: Scalars['ID'];
  retroName: Scalars['String'];
}>;


export type UpdateRetroNameMutation = { __typename?: 'Mutation', updateRetroName: boolean };

export type UpdateTimerMutationVariables = Exact<{
  retroId: Scalars['ID'];
  timerEnd: Scalars['String'];
}>;


export type UpdateTimerMutation = { __typename?: 'Mutation', updateTimer: boolean };

export type UpdateColumnNameMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
  columnName: Scalars['String'];
}>;


export type UpdateColumnNameMutation = { __typename?: 'Mutation', updateColumnName: boolean };

export type UpdatePostContentMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
  postId: Scalars['ID'];
  postContent: Scalars['String'];
}>;


export type UpdatePostContentMutation = { __typename?: 'Mutation', updatePostContent: boolean };

export type MoveColumnMutationVariables = Exact<{
  retroId: Scalars['ID'];
  oldColumnId: Scalars['ID'];
  targetColumnId: Scalars['ID'];
  columnMoveDirection: ColumnMoveDirection;
}>;


export type MoveColumnMutation = { __typename?: 'Mutation', moveColumn: boolean };

export type MovePostMutationVariables = Exact<{
  retroId: Scalars['ID'];
  oldColumnId: Scalars['ID'];
  oldPostId: Scalars['ID'];
  targetColumnId: Scalars['ID'];
  targetPostId?: InputMaybe<Scalars['ID']>;
  postMoveDirection: PostMoveDirection;
}>;


export type MovePostMutation = { __typename?: 'Mutation', movePost: boolean };

export type RemoveColumnMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
}>;


export type RemoveColumnMutation = { __typename?: 'Mutation', removeColumn: boolean };

export type RemovePostMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
  postId: Scalars['ID'];
}>;


export type RemovePostMutation = { __typename?: 'Mutation', removePost: boolean };


export const ColumnsUpdatedDocument = gql`
    subscription ColumnsUpdated($retroId: ID!) {
  columnsUpdated(retroId: $retroId) {
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
    `;

/**
 * __useColumnsUpdatedSubscription__
 *
 * To run a query within a React component, call `useColumnsUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useColumnsUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useColumnsUpdatedSubscription({
 *   variables: {
 *      retroId: // value for 'retroId'
 *   },
 * });
 */
export function useColumnsUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<ColumnsUpdatedSubscription, ColumnsUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ColumnsUpdatedSubscription, ColumnsUpdatedSubscriptionVariables>(ColumnsUpdatedDocument, options);
      }
export type ColumnsUpdatedSubscriptionHookResult = ReturnType<typeof useColumnsUpdatedSubscription>;
export type ColumnsUpdatedSubscriptionResult = Apollo.SubscriptionResult<ColumnsUpdatedSubscription>;
export const NameUpdatedDocument = gql`
    subscription NameUpdated($retroId: ID!, $retroName: String!) {
  nameUpdated(retroId: $retroId, retroName: $retroName) {
    id
    name
  }
}
    `;

/**
 * __useNameUpdatedSubscription__
 *
 * To run a query within a React component, call `useNameUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNameUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNameUpdatedSubscription({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      retroName: // value for 'retroName'
 *   },
 * });
 */
export function useNameUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NameUpdatedSubscription, NameUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NameUpdatedSubscription, NameUpdatedSubscriptionVariables>(NameUpdatedDocument, options);
      }
export type NameUpdatedSubscriptionHookResult = ReturnType<typeof useNameUpdatedSubscription>;
export type NameUpdatedSubscriptionResult = Apollo.SubscriptionResult<NameUpdatedSubscription>;
export const TimerUpdatedDocument = gql`
    subscription TimerUpdated($retroId: ID!, $timerEnd: String!) {
  timerUpdated(retroId: $retroId, timerEnd: $timerEnd) {
    id
    timerEnd
  }
}
    `;

/**
 * __useTimerUpdatedSubscription__
 *
 * To run a query within a React component, call `useTimerUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTimerUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimerUpdatedSubscription({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      timerEnd: // value for 'timerEnd'
 *   },
 * });
 */
export function useTimerUpdatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<TimerUpdatedSubscription, TimerUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TimerUpdatedSubscription, TimerUpdatedSubscriptionVariables>(TimerUpdatedDocument, options);
      }
export type TimerUpdatedSubscriptionHookResult = ReturnType<typeof useTimerUpdatedSubscription>;
export type TimerUpdatedSubscriptionResult = Apollo.SubscriptionResult<TimerUpdatedSubscription>;
export const GetRetroDocument = gql`
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
      }
    }
    createdAt
    lastUpdated
    lastViewed
    timerEnd
  }
}
    `;

/**
 * __useGetRetroQuery__
 *
 * To run a query within a React component, call `useGetRetroQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRetroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRetroQuery({
 *   variables: {
 *      retroId: // value for 'retroId'
 *   },
 * });
 */
export function useGetRetroQuery(baseOptions: Apollo.QueryHookOptions<GetRetroQuery, GetRetroQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRetroQuery, GetRetroQueryVariables>(GetRetroDocument, options);
      }
export function useGetRetroLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRetroQuery, GetRetroQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRetroQuery, GetRetroQueryVariables>(GetRetroDocument, options);
        }
export type GetRetroQueryHookResult = ReturnType<typeof useGetRetroQuery>;
export type GetRetroLazyQueryHookResult = ReturnType<typeof useGetRetroLazyQuery>;
export type GetRetroQueryResult = Apollo.QueryResult<GetRetroQuery, GetRetroQueryVariables>;
export const CreateRetroDocument = gql`
    mutation CreateRetro {
  createRetro
}
    `;
export type CreateRetroMutationFn = Apollo.MutationFunction<CreateRetroMutation, CreateRetroMutationVariables>;

/**
 * __useCreateRetroMutation__
 *
 * To run a mutation, you first call `useCreateRetroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRetroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRetroMutation, { data, loading, error }] = useCreateRetroMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateRetroMutation(baseOptions?: Apollo.MutationHookOptions<CreateRetroMutation, CreateRetroMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRetroMutation, CreateRetroMutationVariables>(CreateRetroDocument, options);
      }
export type CreateRetroMutationHookResult = ReturnType<typeof useCreateRetroMutation>;
export type CreateRetroMutationResult = Apollo.MutationResult<CreateRetroMutation>;
export type CreateRetroMutationOptions = Apollo.BaseMutationOptions<CreateRetroMutation, CreateRetroMutationVariables>;
export const CreateColumnDocument = gql`
    mutation CreateColumn($retroId: ID!, $columnName: String!) {
  createColumn(retroId: $retroId, columnName: $columnName)
}
    `;
export type CreateColumnMutationFn = Apollo.MutationFunction<CreateColumnMutation, CreateColumnMutationVariables>;

/**
 * __useCreateColumnMutation__
 *
 * To run a mutation, you first call `useCreateColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createColumnMutation, { data, loading, error }] = useCreateColumnMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      columnName: // value for 'columnName'
 *   },
 * });
 */
export function useCreateColumnMutation(baseOptions?: Apollo.MutationHookOptions<CreateColumnMutation, CreateColumnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateColumnMutation, CreateColumnMutationVariables>(CreateColumnDocument, options);
      }
export type CreateColumnMutationHookResult = ReturnType<typeof useCreateColumnMutation>;
export type CreateColumnMutationResult = Apollo.MutationResult<CreateColumnMutation>;
export type CreateColumnMutationOptions = Apollo.BaseMutationOptions<CreateColumnMutation, CreateColumnMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($retroId: ID!, $columnId: ID!, $postContent: String!) {
  createPost(retroId: $retroId, columnId: $columnId, postContent: $postContent)
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      columnId: // value for 'columnId'
 *      postContent: // value for 'postContent'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdateRetroNameDocument = gql`
    mutation UpdateRetroName($retroId: ID!, $retroName: String!) {
  updateRetroName(retroId: $retroId, retroName: $retroName)
}
    `;
export type UpdateRetroNameMutationFn = Apollo.MutationFunction<UpdateRetroNameMutation, UpdateRetroNameMutationVariables>;

/**
 * __useUpdateRetroNameMutation__
 *
 * To run a mutation, you first call `useUpdateRetroNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRetroNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRetroNameMutation, { data, loading, error }] = useUpdateRetroNameMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      retroName: // value for 'retroName'
 *   },
 * });
 */
export function useUpdateRetroNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRetroNameMutation, UpdateRetroNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRetroNameMutation, UpdateRetroNameMutationVariables>(UpdateRetroNameDocument, options);
      }
export type UpdateRetroNameMutationHookResult = ReturnType<typeof useUpdateRetroNameMutation>;
export type UpdateRetroNameMutationResult = Apollo.MutationResult<UpdateRetroNameMutation>;
export type UpdateRetroNameMutationOptions = Apollo.BaseMutationOptions<UpdateRetroNameMutation, UpdateRetroNameMutationVariables>;
export const UpdateTimerDocument = gql`
    mutation UpdateTimer($retroId: ID!, $timerEnd: String!) {
  updateTimer(retroId: $retroId, timerEnd: $timerEnd)
}
    `;
export type UpdateTimerMutationFn = Apollo.MutationFunction<UpdateTimerMutation, UpdateTimerMutationVariables>;

/**
 * __useUpdateTimerMutation__
 *
 * To run a mutation, you first call `useUpdateTimerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTimerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTimerMutation, { data, loading, error }] = useUpdateTimerMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      timerEnd: // value for 'timerEnd'
 *   },
 * });
 */
export function useUpdateTimerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTimerMutation, UpdateTimerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTimerMutation, UpdateTimerMutationVariables>(UpdateTimerDocument, options);
      }
export type UpdateTimerMutationHookResult = ReturnType<typeof useUpdateTimerMutation>;
export type UpdateTimerMutationResult = Apollo.MutationResult<UpdateTimerMutation>;
export type UpdateTimerMutationOptions = Apollo.BaseMutationOptions<UpdateTimerMutation, UpdateTimerMutationVariables>;
export const UpdateColumnNameDocument = gql`
    mutation UpdateColumnName($retroId: ID!, $columnId: ID!, $columnName: String!) {
  updateColumnName(
    retroId: $retroId
    columnId: $columnId
    columnName: $columnName
  )
}
    `;
export type UpdateColumnNameMutationFn = Apollo.MutationFunction<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>;

/**
 * __useUpdateColumnNameMutation__
 *
 * To run a mutation, you first call `useUpdateColumnNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnNameMutation, { data, loading, error }] = useUpdateColumnNameMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      columnId: // value for 'columnId'
 *      columnName: // value for 'columnName'
 *   },
 * });
 */
export function useUpdateColumnNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>(UpdateColumnNameDocument, options);
      }
export type UpdateColumnNameMutationHookResult = ReturnType<typeof useUpdateColumnNameMutation>;
export type UpdateColumnNameMutationResult = Apollo.MutationResult<UpdateColumnNameMutation>;
export type UpdateColumnNameMutationOptions = Apollo.BaseMutationOptions<UpdateColumnNameMutation, UpdateColumnNameMutationVariables>;
export const UpdatePostContentDocument = gql`
    mutation UpdatePostContent($retroId: ID!, $columnId: ID!, $postId: ID!, $postContent: String!) {
  updatePostContent(
    retroId: $retroId
    columnId: $columnId
    postId: $postId
    postContent: $postContent
  )
}
    `;
export type UpdatePostContentMutationFn = Apollo.MutationFunction<UpdatePostContentMutation, UpdatePostContentMutationVariables>;

/**
 * __useUpdatePostContentMutation__
 *
 * To run a mutation, you first call `useUpdatePostContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostContentMutation, { data, loading, error }] = useUpdatePostContentMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      columnId: // value for 'columnId'
 *      postId: // value for 'postId'
 *      postContent: // value for 'postContent'
 *   },
 * });
 */
export function useUpdatePostContentMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostContentMutation, UpdatePostContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostContentMutation, UpdatePostContentMutationVariables>(UpdatePostContentDocument, options);
      }
export type UpdatePostContentMutationHookResult = ReturnType<typeof useUpdatePostContentMutation>;
export type UpdatePostContentMutationResult = Apollo.MutationResult<UpdatePostContentMutation>;
export type UpdatePostContentMutationOptions = Apollo.BaseMutationOptions<UpdatePostContentMutation, UpdatePostContentMutationVariables>;
export const MoveColumnDocument = gql`
    mutation MoveColumn($retroId: ID!, $oldColumnId: ID!, $targetColumnId: ID!, $columnMoveDirection: ColumnMoveDirection!) {
  moveColumn(
    retroId: $retroId
    oldColumnId: $oldColumnId
    targetColumnId: $targetColumnId
    columnMoveDirection: $columnMoveDirection
  )
}
    `;
export type MoveColumnMutationFn = Apollo.MutationFunction<MoveColumnMutation, MoveColumnMutationVariables>;

/**
 * __useMoveColumnMutation__
 *
 * To run a mutation, you first call `useMoveColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveColumnMutation, { data, loading, error }] = useMoveColumnMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      oldColumnId: // value for 'oldColumnId'
 *      targetColumnId: // value for 'targetColumnId'
 *      columnMoveDirection: // value for 'columnMoveDirection'
 *   },
 * });
 */
export function useMoveColumnMutation(baseOptions?: Apollo.MutationHookOptions<MoveColumnMutation, MoveColumnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveColumnMutation, MoveColumnMutationVariables>(MoveColumnDocument, options);
      }
export type MoveColumnMutationHookResult = ReturnType<typeof useMoveColumnMutation>;
export type MoveColumnMutationResult = Apollo.MutationResult<MoveColumnMutation>;
export type MoveColumnMutationOptions = Apollo.BaseMutationOptions<MoveColumnMutation, MoveColumnMutationVariables>;
export const MovePostDocument = gql`
    mutation MovePost($retroId: ID!, $oldColumnId: ID!, $oldPostId: ID!, $targetColumnId: ID!, $targetPostId: ID, $postMoveDirection: PostMoveDirection!) {
  movePost(
    retroId: $retroId
    oldColumnId: $oldColumnId
    oldPostId: $oldPostId
    targetColumnId: $targetColumnId
    targetPostId: $targetPostId
    postMoveDirection: $postMoveDirection
  )
}
    `;
export type MovePostMutationFn = Apollo.MutationFunction<MovePostMutation, MovePostMutationVariables>;

/**
 * __useMovePostMutation__
 *
 * To run a mutation, you first call `useMovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [movePostMutation, { data, loading, error }] = useMovePostMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      oldColumnId: // value for 'oldColumnId'
 *      oldPostId: // value for 'oldPostId'
 *      targetColumnId: // value for 'targetColumnId'
 *      targetPostId: // value for 'targetPostId'
 *      postMoveDirection: // value for 'postMoveDirection'
 *   },
 * });
 */
export function useMovePostMutation(baseOptions?: Apollo.MutationHookOptions<MovePostMutation, MovePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MovePostMutation, MovePostMutationVariables>(MovePostDocument, options);
      }
export type MovePostMutationHookResult = ReturnType<typeof useMovePostMutation>;
export type MovePostMutationResult = Apollo.MutationResult<MovePostMutation>;
export type MovePostMutationOptions = Apollo.BaseMutationOptions<MovePostMutation, MovePostMutationVariables>;
export const RemoveColumnDocument = gql`
    mutation RemoveColumn($retroId: ID!, $columnId: ID!) {
  removeColumn(retroId: $retroId, columnId: $columnId)
}
    `;
export type RemoveColumnMutationFn = Apollo.MutationFunction<RemoveColumnMutation, RemoveColumnMutationVariables>;

/**
 * __useRemoveColumnMutation__
 *
 * To run a mutation, you first call `useRemoveColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeColumnMutation, { data, loading, error }] = useRemoveColumnMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      columnId: // value for 'columnId'
 *   },
 * });
 */
export function useRemoveColumnMutation(baseOptions?: Apollo.MutationHookOptions<RemoveColumnMutation, RemoveColumnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveColumnMutation, RemoveColumnMutationVariables>(RemoveColumnDocument, options);
      }
export type RemoveColumnMutationHookResult = ReturnType<typeof useRemoveColumnMutation>;
export type RemoveColumnMutationResult = Apollo.MutationResult<RemoveColumnMutation>;
export type RemoveColumnMutationOptions = Apollo.BaseMutationOptions<RemoveColumnMutation, RemoveColumnMutationVariables>;
export const RemovePostDocument = gql`
    mutation RemovePost($retroId: ID!, $columnId: ID!, $postId: ID!) {
  removePost(retroId: $retroId, columnId: $columnId, postId: $postId)
}
    `;
export type RemovePostMutationFn = Apollo.MutationFunction<RemovePostMutation, RemovePostMutationVariables>;

/**
 * __useRemovePostMutation__
 *
 * To run a mutation, you first call `useRemovePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePostMutation, { data, loading, error }] = useRemovePostMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      columnId: // value for 'columnId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRemovePostMutation(baseOptions?: Apollo.MutationHookOptions<RemovePostMutation, RemovePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePostMutation, RemovePostMutationVariables>(RemovePostDocument, options);
      }
export type RemovePostMutationHookResult = ReturnType<typeof useRemovePostMutation>;
export type RemovePostMutationResult = Apollo.MutationResult<RemovePostMutation>;
export type RemovePostMutationOptions = Apollo.BaseMutationOptions<RemovePostMutation, RemovePostMutationVariables>;