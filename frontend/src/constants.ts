// Need to preface environment variables with NEXT_PUBLIC: https://nextjs.org/docs/basic-features/environment-variables
export const GRAPHQL_HTTP_URI = process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URI || ''
export const GRAPHQL_WEB_SOCKET_URI =
  process.env.NEXT_PUBLIC_GRAPHQL_WEB_SOCKET_URI || ''
