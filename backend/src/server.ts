import WebSocket from 'ws';

const server = new WebSocket.Server({ port: 3010 });

server.on('connection', ws => {
  ws.on('message', message => console.log('received: %s', message));
  ws.send('something');
});