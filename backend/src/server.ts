import WebSocket from 'ws'
import { v4 as uuid } from 'uuid'
import * as Types from 'src/types'

const server = new WebSocket.Server({ port: 3010 })

const columns: Types.Column[] = [
  { id: uuid(), name: 'Column1', comments: [] },
  { id: uuid(), name: 'Column2', comments: [] },
  { id: uuid(), name: 'Column3', comments: [] },
  { id: uuid(), name: 'Column4', comments: [] }
]

// Comment ID to column ID lookup
interface CommentColumnLookup {
  [key: string]: string
}

const commentLookup: CommentColumnLookup = {}

const handleRequest = (socket: WebSocket, request: Types.Request) => {
  switch (request.type) {
    case 'retro/addComment': {
      const comment = {
        id: uuid(),
        value: request.payload.value
      }
      const columnIndex = columns.findIndex(column => column.id == request.payload.columnId)
      columns[columnIndex].comments.push(comment)
      commentLookup[comment.id] = columns[columnIndex].id
      sendResponse(socket, {
        type: 'retro/getComment',
        payload: {
          column: columns[columnIndex]
        }
      })
      break
    }
    case 'retro/removeComment': {
      const columnId = commentLookup[request.payload.commentId]
      const columnIndex = columns.findIndex(column => column.id == columnId)
      const commentIndex = columns[columnIndex].comments.findIndex(comment => comment.id == request.payload.commentId)
      columns[columnIndex].comments.splice(commentIndex, 1)
      delete commentLookup[request.payload.commentId]
      sendResponse(socket, {
        type: 'retro/getComment',
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