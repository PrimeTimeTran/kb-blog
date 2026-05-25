export function buildTree(vfs: Record<string, string>) {
  const root: any = {};

  for (const fullPath of Object.keys(vfs)) {
    const parts = fullPath.split('/').filter(Boolean);

    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (!current[part]) {
        current[part] = {
          type: isFile ? 'file' : 'dir',
          children: isFile ? undefined : {},
        };
      }

      if (!isFile) {
        current = current[part].children;
      }
    }
  }

  return root;
}
