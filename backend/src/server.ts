import WebSocket from 'ws';

const server = new WebSocket.Server({ port: 3010 });

const columns = [
  "Column1",
  "Column2",
  "Column3"
]

server.on('connection', ws => {
  ws.on('message', message => console.log('received: %s', message));
  ws.send(JSON.stringify(columns));
});