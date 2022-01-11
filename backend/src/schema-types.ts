import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  updateColumnName: Retro;
  updatePostContent: Retro;
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

export type Post = {
  __typename?: 'Post';
  content: Scalars['String'];
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  retro: Retro;
};


export type QueryRetroArgs = {
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
  updateColumnName?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<MutationUpdateColumnNameArgs, 'columnId' | 'columnName' | 'retroId'>>;
  updatePostContent?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<MutationUpdatePostContentArgs, 'columnId' | 'postContent' | 'postId' | 'retroId'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  retro?: Resolver<ResolversTypes['Retro'], ParentType, ContextType, RequireFields<QueryRetroArgs, 'id'>>;
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

