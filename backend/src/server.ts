import WebSocket from 'ws'
import { v4 as uuid } from 'uuid'
import * as Types from 'src/types'

const server = new WebSocket.Server({ port: 3010 })

const columns: Types.Column[] = [
  { id: uuid(), name: 'Column1', comments: [] },
  { id: uuid(), name: 'Column2', comments: [] }
]

const findComment = (commentId: string): [columnIndex: number, commentIndex: number] => {
  for (let i = 0; i < columns.length; ++i) {
    for (let j = 0; j < columns[i].comments.length; ++j) {
      if (columns[i].comments[j].id === commentId) {
        return [i, j]
      }
    }
  }
  return [-1, -1]
}

const handleRequest = (socket: WebSocket, request: Types.Request) => {
  switch (request.type) {
    case 'retro/addColumn': {
      columns.push({
        id: uuid(),
        name: request.payload.name,
        comments: []
      })
      sendResponse(socket, {
        type: 'retro/getAllColumns',
        payload: {
          columns
        }
      })
      break
    }
    case 'retro/addComment': {
      const comment = {
        id: uuid(),
        value: request.payload.value
      }
      const columnIndex = columns.findIndex(column => column.id == request.payload.columnId)
      columns[columnIndex].comments.push(comment)
      sendResponse(socket, {
        type: 'retro/getColumn',
        payload: {
          column: columns[columnIndex]
        }
      })
      break
    }
    case 'retro/removeComment': {
      const [columnIndex, commentIndex] = findComment(request.payload.commentId)
      columns[columnIndex].comments.splice(commentIndex, 1)
      sendResponse(socket, {
        type: 'retro/getColumn',
        payload: {
          column: columns[columnIndex]
        }
      })
      break
    }
    default: {
      break
    }
  }
}

const sendResponse = (socket: WebSocket, response: Types.Response) =>
  socket.send(JSON.stringify(response))

server.on('connection', socket => {
  socket.on('message', message => {
    console.log(`received: ${message}`)
    const request = JSON.parse(message.toString())
    handleRequest(socket, request)
  })
  sendResponse(socket, {
    type: 'retro/getAllColumns',
    payload: {
      columns
    }
  })
})