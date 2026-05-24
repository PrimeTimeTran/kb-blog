// lib/vfs-server.ts
import fs from 'fs';
import path from 'path';

import { VirtualFS } from '../pkg/live-editor/hooks/useVFS';

export function getExhibitSlotsFS(slug = ['hello-world']): VirtualFS {
  console.log(slug);
  const vfs: VirtualFS = {};

  // 1. Resolve target path: Join 'exhibit' + slug array, or default to 'hello-world'
  const folderPath = slug && slug.length > 0 ? slug.join('/') : 'hello-world';
  const targetDir = path.join(process.cwd(), 'exhibit', folderPath);

  try {
    if (!fs.existsSync(targetDir)) {
      console.warn(`Directory not found at: ${targetDir}`);
      return vfs;
    }

    const readDirectoryRecursive = (currentDir: string) => {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          readDirectoryRecursive(fullPath);
        } else if (entry.isFile() && /\.(tsx|ts|jsx|js|css|html)$/.test(entry.name)) {
          const content = fs.readFileSync(fullPath, 'utf-8');

          // 2. IMPORTANT: Generate the relative path starting AFTER "./exhibit/"
          // We calculate the path relative to the 'exhibit' folder instead of 'process.cwd()'
          const exhibitRoot = path.join(process.cwd(), 'exhibit');
          const relativePath = './' + path.relative(exhibitRoot, fullPath).replace(/\\/g, '/');

          const ext = entry.name.split('.').pop() ?? 'js';
          const language = ext === 'tsx' || ext === 'jsx' ? 'jsx' : ext;

          vfs[relativePath] = { content, language };
        }
      }
    };

    readDirectoryRecursive(targetDir);
  } catch (error) {
    console.error('Error compiling directory map:', error);
  }

  return vfs;
}
