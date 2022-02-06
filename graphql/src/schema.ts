import { gql } from 'apollo-server'

const schema = gql`
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
    getRetro(id: ID!): Retro!
  }

  type Mutation {
    createColumn(retroId: ID!, columnName: String!): Boolean!
    createPost(retroId: ID!, columnId: ID!, postContent: String!): Boolean!
    updateColumn(retroId: ID!, columnId: ID!, columnName: String!): Boolean!
    updatePost(
      retroId: ID!
      columnId: ID!
      postId: ID!
      postContent: String!
    ): Boolean!
    removeColumn(retroId: ID!, columnId: ID!): Boolean!
    removePost(retroId: ID!, columnId: ID!, postId: ID!): Boolean!
  }

  type Subscription {
    retroUpdated(id: ID!): Retro!
  }
`

export default schema
