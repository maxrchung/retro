import WebSocket from 'ws'
import { v4 as uuid } from 'uuid'


const server = new WebSocket.Server({ port: 3010 })

const columns = [
  { uuid: uuid(), name: 'Column1', comments: [
    { uuid: uuid(), value: "Hey what's up my dude" },
    { uuid: uuid(), value: 'Lmao yo it was pretty chill!' },
  ] },
  { uuid: uuid(), name: 'Column2', comments: [] },
  { uuid: uuid(), name: 'Column3', comments: [] },
  { uuid: uuid(), name: 'Column4', comments: [] }
]

const formatMessage = (type, payload) =>
  JSON.stringify({
    type: `retro/${type}`,
    payload
  })

server.on('connection', ws => {
  ws.on('message', message => {
    console.log(`received: ${message}`)
    
    const request = JSON.parse(message.toString())
    if (request.type == 'addComment') {
      const index = columns.findIndex(column => column.uuid == request.uuid);
      columns[index].comments.push({
        uuid: uuid(),
        value: request.value
      })
      ws.send(formatMessage('addComment', columns[index]))
    }
  })

  ws.send(formatMessage('getAllColumns', columns))
})