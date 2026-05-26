const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
  console.log('Bridge Connected');
  global.bridge = ws;
});
