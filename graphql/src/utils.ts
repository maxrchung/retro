import { uid } from 'uid/secure'

const getUid = () => uid(7)

interface WithId {
  id: string
}

export const generateUid = (array: WithId[]) => {
  let id = getUid()
  while (array.find((element) => element.id === id)) {
    id = getUid()
  }
  return id
}
