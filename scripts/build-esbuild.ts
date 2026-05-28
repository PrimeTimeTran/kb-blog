import path from 'path';
import esbuild from 'esbuild';
import { fileURLToPath } from 'url';

import { walk } from '@/lib/fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// $ node scripts/build-esbuild.ts

// Copies
// ./pkg/live-editor/lib/frameworks/base/next
// as cjs and mjs bundles
// ./dist
// project root = scripts/..
const projectRoot = path.resolve(__dirname, '..');

const entryRoot = path.join(projectRoot, 'pkg/live-editor/lib/frameworks/base/next');

const out = path.join(projectRoot, 'dist');

const entryPoints = walk(entryRoot, { includeExtensions: ['.ts', '.tsx', '.js', 'jsx'] });

function build(format: 'esm' | 'cjs') {
  return esbuild.build({
    entryPoints,
    outdir: path.join(out, format),

    // IMPORTANT: preserves directory structure
    outbase: entryRoot,

    bundle: false,
    format,
    platform: 'node',
    sourcemap: true,

    outExtension: format === 'cjs' ? { '.js': '.cjs' } : undefined,

    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
      '.js': 'js',
      '.jsx': 'jsx',
    },
  });
}

await Promise.all([build('esm'), build('cjs')]);
