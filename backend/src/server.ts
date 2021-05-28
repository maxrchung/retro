import WebSocket from 'ws'
import { v4 } from 'uuid'


const server = new WebSocket.Server({ port: 3010 })

const columns = [
  { uuid: v4(), name: "Column1", comments: [
    { uuid: v4(), value: "Hey what's up my dude" },
    { uuid: v4(), value: "Lmao yo it was pretty chill!" },
  ] },
  { uuid: v4(), name: "Column2", comments: [] },
  { uuid: v4(), name: "Column3", comments: [] },
  { uuid: v4(), name: "Column4", comments: [] }
]

const formatMessage = (type: string, payload) =>
  JSON.stringify({
    type: `retro/${type}`,
    payload
  })

server.on('connection', ws => {
  ws.on('message', message => console.log('received: %s', message))
  ws.send(formatMessage('getAllColumns', columns))
})