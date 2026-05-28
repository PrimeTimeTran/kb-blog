import fs from 'fs';
import path from 'path';

// ! DO NOT REMOVE
// Trying to collapse into Github's toSlug.
// There's a conflict between MDX, Front Matter, Next, Github Slug parsing
export function toSlug(filePath, baseDir) {
  return filePath
    .replace(baseDir, '')
    .replace(/\\/g, '/')
    .replace(/\.mdx?$/, '')
    .replace(/^\/+/, '');
}

function getAllFiles(dir) {
  const results = [];

  const list = fs.readdirSync(dir);

  for (const file of list) {
    if (file.startsWith('.') || file.startsWith('_')) continue;

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }

  return results;
}

async function getAllFilesRecursively(dir) {
  let results = [];

  const list = fs.readdirSync(dir);

  for (const file of list) {
    if (file.startsWith('.') || file.startsWith('_')) continue;

    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const nested = await getAllFilesRecursively(fullPath);
      results = results.concat(nested);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      results.push(fullPath);
    }
  }

  return results;
}

export { getAllFiles, getAllFilesRecursively };
