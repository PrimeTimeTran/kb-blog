import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:8080');

console.log('Script started. Initializing watcher...');
const watcher = chokidar.watch('./exhibit/(dev)/');
watcher.on('ready', () => console.log('✅ Initial scan complete. Watching now.'));
watcher.on('change', (path) => console.log('🔥 Change detected in:', path));

ws.on('open', () => console.log('✅ Connected to Bridge Server'));
ws.on('error', (err) => console.error('❌ Connection Error:', err));

chokidar.watch(path.resolve('./exhibit/(dev)'), {
  usePolling: true,
  interval: 100
}).on('all', (event, filePath) => {
  // This will log EVERY event (add, change, unlink)
  console.log(`📡 Event: ${event} on ${filePath}`);

  if (event === 'change') {
    const content = fs.readFileSync(filePath, 'utf-8');
    const message = JSON.stringify({
      type: 'vfs:sync',
      payload: { path: path.basename(filePath), content: content }
    });

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
      console.log('🚀 Rocket launched');
    }
  }
});
