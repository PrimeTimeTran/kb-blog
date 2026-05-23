import path from 'path';
import fs from 'fs';
import esbuild from 'esbuild';
import { fileURLToPath } from 'url';

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

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    throw new Error(`Directory does not exist: ${dir}`);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let files: string[] = [];

  for (const e of entries) {
    const full = path.join(dir, e.name);

    if (e.isDirectory()) {
      files = files.concat(walk(full));
    } else if (/\.(ts|tsx|js|jsx)$/.test(full)) {
      files.push(full);
    }
  }

  return files;
}

const entryPoints = walk(entryRoot);

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
