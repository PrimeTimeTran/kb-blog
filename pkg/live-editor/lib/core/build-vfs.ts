import { Framework } from '../types';

export function buildVFS({ framework, base }: { framework: Framework; base: Record<string, string> }) {
  const vfs: Record<string, string> = {};

  // 1. copy base framework
  for (const [path, content] of Object.entries(base)) {
    vfs[path] = content;
  }

  // 2. inject runtime metadata file (IMPORTANT for tree/debug)
  vfs['/.meta.json'] = JSON.stringify(
    {
      framework,
      files: Object.keys(base),
      createdAt: Date.now(),
    },
    null,
    2,
  );

  return vfs;
}
