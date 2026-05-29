import { KB_DIR } from '@/lib/content/core';
import { getAllFilesRecursively } from '@/lib/content/server/files';

export async function getKbTree() {
  const files = await getAllFilesRecursively(KB_DIR);

  const root: Record<string, any> = {};

  for (const filePath of files) {
    const relative = filePath
      .replace(/\\/g, '/')
      .replace(KB_DIR.replace(/\\/g, '/'), '')
      .replace(/\.(md|mdx)$/, '')
      .replace(/^\//, '');

    const parts = relative.split('/');

    let current = root;
    let pathSoFar = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      pathSoFar = pathSoFar ? `${pathSoFar}/${part}` : part;

      if (!current[part]) {
        current[part] = {
          name: part,
          kind: isFile ? 'file' : 'folder',
          children: {},
          path: `/${pathSoFar}`,
        };
      }

      // IMPORTANT: override folder if deeper structure appears
      if (!isFile) {
        current[part].kind = 'folder';
      }

      if (isFile) {
        current[part].kind = 'file';
      }

      current = current[part].children;
    }
  }

  return toTree(root);
}

function toTree(map: Record<string, any>): TreeNode[] {
  return Object.values(map)
    .map((node: any) => ({
      id: node.path,
      name: node.name,
      path: node.path,
      kind: node.kind,
      children: node.kind === 'file' ? [] : toTree(node.children ?? {}),
    }))
    .sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}
