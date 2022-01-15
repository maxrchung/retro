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
    createColumn(retroId: ID!, columnId: ID!, columnName: String!): Retro!
    createPost(retroId: ID!, columnId: ID!, postContent: String!): Retro!

    updateColumn(retroId: ID!, columnId: ID!, columnName: String!): Retro!
    updatePost(retroId: ID!, columnId: ID!, postId: ID!, postContent: String!): Retro!

    removeColumn(retroId: ID!, columnId: ID!): Retro!
    removePost(retroId: ID!, columnId: ID!, postId: ID!): Retro!
  }

  type Subscription {
    retroUpdated(id: ID!): Retro!
  }
`

export { schema }
