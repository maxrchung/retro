// https://www.apollographql.com/docs/react/api/react/hooks/

import { gql } from 'apollo-server'

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

const GET_RETRO = gql`
  query GetRetro($id: ID!) {
    getRetro(id: $id) {
      ...RetroFragment
    }
  }
`

const CREATE_COLUMN = gql`
  mutation CreateColumn($retroId: ID!, $columnId: ID!, $columnName: String!) {
    createColumn(retroId: $retroId, columnId: $columnId, columnName: $columnName) {
      ...RetroFragment
    }
  }
`

const CREATE_POST = gql`
  mutation CreatePost($retroId: ID!, $columnId: ID!, $postContent: String!) {
    createPost(retroId: $retroId, columnId: $columnId, postContent: $postContent) {
      ...RetroFragment
    }
  }
`

const UPDATE_COLUMN = gql`
  mutation updateColumn($retroId: ID!, $columnId: ID!, $columnName: String!) {
    updateColumn(retroId: $retroId, columnId: $columnId, columnName: $columnName) {
      ...RetroFragment
    }
  }
`

const UPDATE_POST = gql`
  mutation updatePost($retroId: ID!, $columnId: ID!, $postContent: String!) {
    createPost(retroId: $retroId, columnId: $columnId, postContent: $postContent) {
      ...RetroFragment
    }
  }
`
