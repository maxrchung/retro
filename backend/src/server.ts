import WebSocket from 'ws'
import { v4 as uuid } from 'uuid'
import * as Types from './types'

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

const handleRequest = (webSocket: WebSocket, request: Types.Request) => {
  switch (request.type) {
    case 'addComment': {
      const index = columns.findIndex(column => column.id == request.columnId)
      columns[index].comments.push({
        id: uuid(),
        value: request.value
      })
      sendResponse(webSocket, {
        type: 'addComment',
        column: columns[index]
      })
      break
    }
    default: {
      break
    }
  }
}

const sendResponse = (webSocket: WebSocket, response: Types.Response) =>
  webSocket.send(JSON.stringify(response))

server.on('connection', webSocket => {
  webSocket.on('message', message => {
    console.log(`received: ${message}`)
    const request = JSON.parse(message.toString())
    handleRequest(webSocket, request)
  })

  sendResponse(webSocket, {
    type: 'getAllColumns',
    columns
  })
})