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

export type Mutation = {
  __typename?: 'Mutation';
  createColumn: Retro;
  createPost: Retro;
  removeColumn: Retro;
  removePost: Retro;
  updateColumn: Retro;
  updatePost: Retro;
};


export type MutationCreateColumnArgs = {
  columnId: Scalars['ID'];
  columnName: Scalars['String'];
  retroId: Scalars['ID'];
};


export type MutationCreatePostArgs = {
  columnId: Scalars['ID'];
  postContent: Scalars['String'];
  retroId: Scalars['ID'];
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


export type MutationUpdateColumnArgs = {
  columnId: Scalars['ID'];
  columnName: Scalars['String'];
  retroId: Scalars['ID'];
};


export type MutationUpdatePostArgs = {
  columnId: Scalars['ID'];
  postContent: Scalars['String'];
  postId: Scalars['ID'];
  retroId: Scalars['ID'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getRetro: Retro;
};


export type QueryGetRetroArgs = {
  id: Scalars['ID'];
};

export type Retro = {
  __typename?: 'Retro';
  columns: Array<Column>;
  id: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  retroUpdated: Retro;
};


export type SubscriptionRetroUpdatedArgs = {
  id: Scalars['ID'];
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
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
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
  createColumn?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<MutationCreateColumnArgs, 'columnId' | 'columnName' | 'retroId'>>;
  createPost?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'columnId' | 'postContent' | 'retroId'>>;
  removeColumn?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<MutationRemoveColumnArgs, 'columnId' | 'retroId'>>;
  removePost?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<MutationRemovePostArgs, 'columnId' | 'postId' | 'retroId'>>;
  updateColumn?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<MutationUpdateColumnArgs, 'columnId' | 'columnName' | 'retroId'>>;
  updatePost?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'columnId' | 'postContent' | 'postId' | 'retroId'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getRetro?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<QueryGetRetroArgs, 'id'>>;
};

export type RetroResolvers<ContextType = any, ParentType extends ResolversParentTypes['Retro'] = ResolversParentTypes['Retro']> = {
  columns?: Resolver<Array<ResolversTypes['Column']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  retroUpdated?: SubscriptionResolver<ResolversTypes['Retro'], "retroUpdated", ParentType, ContextType, RequireFields<SubscriptionRetroUpdatedArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Column?: ColumnResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Retro?: RetroResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};


export type RetroFragmentFragment = { __typename?: 'Retro', id: string, columns: Array<{ __typename?: 'Column', id: string, name: string, posts: Array<{ __typename?: 'Post', id: string, content: string }> }> };

export type GetRetroQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRetroQuery = { __typename?: 'Query', getRetro: { __typename?: 'Retro', id: string, columns: Array<{ __typename?: 'Column', id: string, name: string, posts: Array<{ __typename?: 'Post', id: string, content: string }> }> } };

export type CreateColumnMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
  columnName: Scalars['String'];
}>;


export type CreateColumnMutation = { __typename?: 'Mutation', createColumn: { __typename?: 'Retro', id: string, columns: Array<{ __typename?: 'Column', id: string, name: string, posts: Array<{ __typename?: 'Post', id: string, content: string }> }> } };

export type CreatePostMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
  postContent: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Retro', id: string, columns: Array<{ __typename?: 'Column', id: string, name: string, posts: Array<{ __typename?: 'Post', id: string, content: string }> }> } };

export type UpdateColumnMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
  columnName: Scalars['String'];
}>;


export type UpdateColumnMutation = { __typename?: 'Mutation', updateColumn: { __typename?: 'Retro', id: string, columns: Array<{ __typename?: 'Column', id: string, name: string, posts: Array<{ __typename?: 'Post', id: string, content: string }> }> } };

export type UpdatePostMutationVariables = Exact<{
  retroId: Scalars['ID'];
  columnId: Scalars['ID'];
  postContent: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Retro', id: string, columns: Array<{ __typename?: 'Column', id: string, name: string, posts: Array<{ __typename?: 'Post', id: string, content: string }> }> } };

export const RetroFragmentFragmentDoc = gql`
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
    `;
export const GetRetroDocument = gql`
    query GetRetro($id: ID!) {
  getRetro(id: $id) {
    ...RetroFragment
  }
}
    ${RetroFragmentFragmentDoc}`;

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
 *      id: // value for 'id'
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
export const CreateColumnDocument = gql`
    mutation CreateColumn($retroId: ID!, $columnId: ID!, $columnName: String!) {
  createColumn(retroId: $retroId, columnId: $columnId, columnName: $columnName) {
    ...RetroFragment
  }
}
    ${RetroFragmentFragmentDoc}`;
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
 *      columnId: // value for 'columnId'
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
  createPost(retroId: $retroId, columnId: $columnId, postContent: $postContent) {
    ...RetroFragment
  }
}
    ${RetroFragmentFragmentDoc}`;
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
export const UpdateColumnDocument = gql`
    mutation updateColumn($retroId: ID!, $columnId: ID!, $columnName: String!) {
  updateColumn(retroId: $retroId, columnId: $columnId, columnName: $columnName) {
    ...RetroFragment
  }
}
    ${RetroFragmentFragmentDoc}`;
export type UpdateColumnMutationFn = Apollo.MutationFunction<UpdateColumnMutation, UpdateColumnMutationVariables>;

/**
 * __useUpdateColumnMutation__
 *
 * To run a mutation, you first call `useUpdateColumnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateColumnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateColumnMutation, { data, loading, error }] = useUpdateColumnMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      columnId: // value for 'columnId'
 *      columnName: // value for 'columnName'
 *   },
 * });
 */
export function useUpdateColumnMutation(baseOptions?: Apollo.MutationHookOptions<UpdateColumnMutation, UpdateColumnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateColumnMutation, UpdateColumnMutationVariables>(UpdateColumnDocument, options);
      }
export type UpdateColumnMutationHookResult = ReturnType<typeof useUpdateColumnMutation>;
export type UpdateColumnMutationResult = Apollo.MutationResult<UpdateColumnMutation>;
export type UpdateColumnMutationOptions = Apollo.BaseMutationOptions<UpdateColumnMutation, UpdateColumnMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($retroId: ID!, $columnId: ID!, $postContent: String!) {
  createPost(retroId: $retroId, columnId: $columnId, postContent: $postContent) {
    ...RetroFragment
  }
}
    ${RetroFragmentFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      retroId: // value for 'retroId'
 *      columnId: // value for 'columnId'
 *      postContent: // value for 'postContent'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;