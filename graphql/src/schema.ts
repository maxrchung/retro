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
    columns: [Column!]!
  }

  type Column {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    content: String!
  }

  type Query {
    getRetro(retroId: ID!): Retro!
  }

  type Mutation {
    createColumn(retroId: ID!, columnName: String!): Boolean!
    createPost(retroId: ID!, columnId: ID!, postContent: String!): Boolean!
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
      targetPostId: ID!
      postMoveDirection: PostMoveDirection!
    ): Boolean!
    removeColumn(retroId: ID!, columnId: ID!): Boolean!
    removePost(retroId: ID!, columnId: ID!, postId: ID!): Boolean!
  }

  type Subscription {
    retroUpdated(retroId: ID!): Retro!
  }
`

export default schema
