console.log('🔥 wasm wrapper loaded');

import init, { walk_graph } from './wasm/exhibit_wasm.js';

console.log('args:', process.argv);

const root = process.argv[2] || './node_modules';

await init();

console.log('🔥 wasm initialized');

const start = performance.now();

const result = walk_graph(root);

const end = performance.now();

console.log('result:', result);
console.log('time:', end - start);
