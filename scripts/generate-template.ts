import fs from 'fs';
import path from 'path';

/**
 * RUN FROM:
 * /Users/future/KB/project/app/blog
 *
 * COMMAND:
 * pnpm tsx scripts/generate-template.ts
 */

/* ---------------- SOURCE ---------------- */

const SOURCE = path.join(process.cwd(), 'pkg/live-editor/lib/frameworks/base/next');

/* ---------------- OUTPUT ---------------- */

const OUTPUT = path.join(process.cwd(), 'pkg/live-editor/generated/next-vfs.ts');

/* ---------------- VFS ---------------- */

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

    const relative = '/' + path.relative(SOURCE, full).replace(/\\/g, '/');

    const content = fs.readFileSync(full, 'utf8');

    files[relative] = content;
  }
}

/* ---------------- EXECUTE ---------------- */

if (!fs.existsSync(SOURCE)) {
  throw new Error(`[generate-template] missing source dir:\n${SOURCE}`);
}

walk(SOURCE);

const output = `/* AUTO GENERATED FILE */

export const nextVfs = ${JSON.stringify(files, null, 2)} as const;
`;

fs.mkdirSync(path.dirname(OUTPUT), {
  recursive: true,
});

fs.writeFileSync(OUTPUT, output);

/* ---------------- LOGGING ---------------- */

console.log('\n[VFS GENERATED]');
console.log('SOURCE:', SOURCE);
console.log('OUTPUT:', OUTPUT);

console.table(
  Object.keys(files).map((file) => ({
    file,
    size: files[file].length,
  })),
);
