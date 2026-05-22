import path from 'path';
import fs from 'fs/promises';

const ROOT = process.cwd();

export async function list(input: { type: string }): Promise<string[]> {
  const dir = path.join(ROOT, 'data', input.type);

  const slugs: string[] = [];

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const full = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(full);
        continue;
      }

      if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        const relative = path
          .relative(dir, full)
          .replace(/\.(md|mdx)$/, '')
          .replace(/\\/g, '/');

        slugs.push(relative);
      }
    }
  }

  await walk(dir);

  return slugs;
}
