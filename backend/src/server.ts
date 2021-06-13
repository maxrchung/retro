import WebSocket from 'ws'
import { v4 as uuid } from 'uuid'
import * as Types from 'src/types'

const server = new WebSocket.Server({ port: 3010 })

const columns: Types.Column[] = [
  { id: uuid(), name: 'Column1', comments: [
    { id: uuid(), value: "Hey what's up my dude" },
    { id: uuid(), value: 'Lmao yo it was pretty chill!' },
  ] },
  { id: uuid(), name: 'Column2', comments: [] },
  { id: uuid(), name: 'Column3', comments: [] },
  { id: uuid(), name: 'Column4', comments: [] }
]

const handleRequest = (socket: WebSocket, request: Types.Request) => {
  switch (request.type) {
    case 'retro/addComment': {
      const index = columns.findIndex(column => column.id == request.payload.columnId)
      columns[index].comments.push({
        id: uuid(),
        value: request.payload.value
      })
      sendResponse(socket, {
        type: 'retro/addComment',
        payload: {
          column: columns[index]
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