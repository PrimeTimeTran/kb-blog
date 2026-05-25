import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

let browserClient = null;

wss.on('connection', (ws, req) => {
  // Check if the connection request is for the "/browser" path
  if (req.url === '/browser') {
    browserClient = ws;
    console.log('✅ Browser connected');
  } else {
    // Treat other connections as the HMR watcher
    console.log('✅ Watcher connected');
  }
  // If this is the watcher (hmr.ts) connecting
  ws.on('message', (data) => {
    console.log('📥 Received from watcher, relaying to browser...');
    if (browserClient) browserClient.send(data);
  });
});
