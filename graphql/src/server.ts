import { ApolloServer } from 'apollo-server'
import fs from 'fs'
import path from 'path'

interface Link {
  id: string,
  url: string,
  description: string
}

interface PostArgs {
  description: string,
  url: string
}

interface UpdateLinkArgs {
  id: string,
  description: string,
  url: string
}

interface DeleteLinkArgs {
  id: string
}

let links: Link[] = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (id: string) => links.find(link => link.id == id)
  },
  Mutation: {
    // 2
    post: (parent: null, args: PostArgs) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent: null, args: UpdateLinkArgs) => {
      const link = links.find(link => link.id == args.id)
      if (typeof link === 'undefined') {
        return undefined
      }
      if (args.url) {
        link.url = args.url
      }
      if (args.description) {
        link.description = args.description
      }
      return link
    },
    deleteLink: (parent: null, args: DeleteLinkArgs) => {
      const link = links.find(link => link.id == args.id)
      if (typeof link === 'undefined') {
        return undefined
      }
      links = links.filter(link => link.id != args.id)
      return link
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  )