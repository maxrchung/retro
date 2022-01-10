import { gql } from 'apollo-server'

const schema = gql`
  type Post {
    id: ID!
    content: String!
  }

  type Query {
    retro(id: ID!): Retro!
  }

  type Mutation {
    createColumn(retroId: ID!, columnId: ID!, columnName: String!): Retro!
    createPost(retroId: ID!, columnId: ID!, postContent: String!): Retro!

    updateColumnName(retroId: ID!, columnId: ID!, columnName: String!): Retro!
    updatePostContent(retroId: ID!, columnId: ID!, postId: ID!, postContent: String!): Retro!

    removeColumn(retroId: ID!, columnId: ID!): Retro!
    removePost(retroId: ID!, columnId: ID!, postId: ID!): Retro!
  }

  type Subscription {
    retroUpdated(id: ID!): Retro!
  }
`

export { schema }
