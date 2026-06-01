import { Framework, ProjectSpec } from './types';

import type { Plugin } from 'esbuild';
import { nextVfs } from '../generated/next-vfs';

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

export function createVFS({
  base,
  spec,
  rules,
}: {
  base: Record<string, string>;
  spec: ProjectSpec;
  rules?: FileRules;
}) {
  // 1. start from base (in memory copy)
  let vfs: Record<string, string> = { ...base };

  // 2. overwrite with spec (IN MEMORY)
  if (spec.files) {
    for (const [path, content] of Object.entries(spec.files)) {
      vfs[path] = content; // 🔥 in-memory overwrite
    }
  }

  // 3. apply rules (optional filtering)
  if (rules?.blacklist?.length) {
    for (const blocked of rules.blacklist) {
      for (const path of Object.keys(vfs)) {
        if (path.startsWith(blocked)) {
          delete vfs[path];
        }
      }
    }
  }

  if (rules?.whitelist?.length) {
    vfs = Object.fromEntries(Object.entries(vfs).filter(([path]) => rules.whitelist!.some((w) => path.startsWith(w))));
  }

  // 4. safety check
  if (!vfs[spec.entry]) {
    throw new Error(`[VFS] entry missing after build: ${spec.entry}`);
  }

  return vfs;
}

export function loadFrameworkBase(framework) {
  return nextVfs;
}

export function virtualFsPlugin(vfs: Record<string, string>): Plugin {
  return {
    name: 'virtual-fs',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if (args.path.startsWith('.')) {
          return {
            path: new URL(args.path, 'file:' + args.importer).pathname,
            namespace: 'vfs',
          };
        }

        return { path: args.path, external: true };
      });

      build.onLoad({ filter: /.*/, namespace: 'vfs' }, (args) => {
        const file = args.path.replace('file:', '');

        const code = vfs[file];

        if (!code) {
          return { contents: '' };
        }

        return {
          contents: code,
          loader: 'tsx',
        };
      });
    },
  };
}
