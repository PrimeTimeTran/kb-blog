import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

const INCLUDE = ['app', 'components', 'lib'];

const OUTPUT = 'pkg/live-editor/generated/next-vfs.ts';

const files: Record<string, string> = {};

function walk(dir: string) {
  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    const relative = '/' + path.relative(ROOT, full).replace(/\\/g, '/');

    const content = fs.readFileSync(full, 'utf8');

    files[relative] = content;
  }
}

for (const dir of INCLUDE) {
  walk(path.join(ROOT, dir));
}

const output = `
export const nextVfs = ${JSON.stringify(files, null, 2)}
`;

fs.writeFileSync(OUTPUT, output);

console.log('[VFS GENERATED]');
console.log(Object.keys(files));
