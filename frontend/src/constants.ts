// Need to preface environment variables with NEXT_PUBLIC: https://nextjs.org/docs/basic-features/environment-variables
export const GRAPHQL_HTTP_URI =
  process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URI || 'http://localhost:4000'
export const GRAPHQL_WEB_SOCKET_URI =
  process.env.NEXT_PUBLIC_GRAPHQL_WEB_SOCKET_URI ||
  'ws://localhost:4000/graphql'
