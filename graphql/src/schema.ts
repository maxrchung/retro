import { gql } from 'apollo-server'

const schema = gql`
  enum ColumnMoveDirection {
    LEFT
    RIGHT
  }

  enum PostMoveDirection {
    TOP
    BOTTOM
  }

  type Retro {
    id: ID!
    name: String!
    columns: [Column!]!
    timerEnd: String!
    createdAt: String!
    lastViewed: String!
    lastUpdated: String!
  }

  type Column {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    content: String!
    author: String!
    likes: [String!]!
  }

  type Subscription {
    columnsUpdated(retroId: ID!): Retro!
    nameUpdated(retroId: ID!): Retro!
    timerUpdated(retroId: ID!): Retro!
    retroRemoved(retroId: ID!): Retro!
  }

  type Query {
    getRetro(retroId: ID!): Retro!
  }

  type Mutation {
    createRetro: ID!
    createColumn(retroId: ID!, columnName: String!): Boolean!
    createPost(retroId: ID!, columnId: ID!, postContent: String!): Boolean!
    updateRetroName(retroId: ID!, retroName: String!): Boolean!
    updateTimer(retroId: ID!, timerEnd: String!): Boolean!
    updateColumnName(retroId: ID!, columnId: ID!, columnName: String!): Boolean!
    updatePostContent(
      retroId: ID!
      columnId: ID!
      postId: ID!
      postContent: String!
    ): Boolean!
    moveColumn(
      retroId: ID!
      oldColumnId: ID!
      targetColumnId: ID!
      columnMoveDirection: ColumnMoveDirection!
    ): Boolean!
    movePost(
      retroId: ID!
      oldColumnId: ID!
      oldPostId: ID!
      targetColumnId: ID!
      """
      GQL descriptions and comments: https://github.com/graphql/graphql-spec/issues/420
      Field is optional because you can move a post to a column
      """
      targetPostId: ID
      postMoveDirection: PostMoveDirection!
    ): Boolean!
    removeRetro(retroId: ID!): Boolean!
    removeColumn(retroId: ID!, columnId: ID!): Boolean!
    removePost(retroId: ID!, columnId: ID!, postId: ID!): Boolean!
    clearRetro(retroId: ID!): Boolean!
    clearColumn(retroId: ID!, columnId: ID!): Boolean!
    cloneRetro(retroId: ID!): ID!
    likePost(retroId: ID!, columnId: ID!, postId: ID!): Boolean!
    unlikePost(retroId: ID!, columnId: ID!, postId: ID!): Boolean!
  }
`

export default schema
