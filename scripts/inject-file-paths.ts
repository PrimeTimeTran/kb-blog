import fs from 'fs';
import path from 'path';

const root = path.join(process.cwd(), 'app');

function walk(dir: string) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (!full.endsWith('.tsx') && !full.endsWith('.ts')) continue;

    const relativePath = path.relative(process.cwd(), full).replace(/\\/g, '/');

    let content = fs.readFileSync(full, 'utf8');

    // replace FILE_PATH = '...'
    content = content.replace(/FILE_PATH\s*=\s*['"`].*?['"`]/g, `FILE_PATH = '${relativePath}'`);

    fs.writeFileSync(full, content, 'utf8');
  }
}

walk(root);

console.log('Injected file paths');
