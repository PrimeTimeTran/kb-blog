const fs = require('fs');
const path = require('path');

function walk(dir, graph = {}, parent = null) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, graph, full);
    } else {
      const rel = path.relative(process.cwd(), full);

      if (!graph[rel]) graph[rel] = [];

      // fake dependency edge (for benchmarking structure cost)
      if (parent) {
        graph[parent] = graph[parent] || [];
        graph[parent].push(rel);
      }
    }
  }

  return graph;
}

const root = process.argv[2] || 'node_modules';

const start = performance.now();

const graph = walk(root);

const end = performance.now();

const nodes = Object.keys(graph).length;
const edges = Object.values(graph).reduce((a, v) => a + v.length, 0);

console.log('nodes:', nodes);
console.log('edges:', edges);
console.log('time(ms):', (end - start).toFixed(2));
