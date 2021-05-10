import WebSocket from 'ws'
import { v4 as uuidv4 } from 'uuid'


const server = new WebSocket.Server({ port: 3010 })

const columns = [
  { uuid: uuidv4(), name: "Column1" },
  { uuid: uuidv4(), name: "Column2" },
  { uuid: uuidv4(), name: "Column3" },
  { uuid: uuidv4(), name: "Column4" }
]

server.on('connection', ws => {
  ws.on('message', message => console.log('received: %s', message))
  ws.send(JSON.stringify(columns))
})