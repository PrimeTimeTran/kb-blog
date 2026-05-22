import chokidar from 'chokidar';
import fs from 'fs';
import { buildTermsRegistry } from '../lib/content/server/terms.js';

let timeout;

function build() {
  const registry = buildTermsRegistry();

  fs.writeFileSync('data/generated/terms.js', `export const terms = ${JSON.stringify(registry, null, 2)}`);

  console.log('🔄 terms rebuilt');
}

function buildDebounced() {
  clearTimeout(timeout);
  timeout = setTimeout(build, 100);
}

chokidar
  .watch('data/term', {
    ignored: ['data/generated/**'],
    ignoreInitial: true,
  })
  .on('add', buildDebounced)
  .on('change', buildDebounced)
  .on('unlink', buildDebounced);

build();
