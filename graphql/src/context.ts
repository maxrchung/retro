import { PubSub } from 'apollo-server'

export default interface Context {
  pubsub: PubSub
}
