import WebSocket from 'ws'
import { v4 as uuidv4 } from 'uuid'


const server = new WebSocket.Server({ port: 3010 })

const columns = [
  { uuid: uuidv4(), name: "Column1", comments: [
    { uuid: uuidv4(), value: "Hey what's up my dude" },
    { uuid: uuidv4(), value: "Lmao yo it was pretty chill!" },
  ] },
  { uuid: uuidv4(), name: "Column2", comments: [] },
  { uuid: uuidv4(), name: "Column3", comments: [] },
  { uuid: uuidv4(), name: "Column4", comments: [] }
]

server.on('connection', ws => {
  ws.on('message', message => console.log('received: %s', message))
  ws.send(JSON.stringify(columns))
})