// pkg/live-editor/lib/bundler/runtime.ts

import { buildGraph } from './build-graph';
import { transform } from './transform';
import { resolve } from './resolve';

export function createBundler(vfs: Record<string, string>) {
  const graph = buildGraph(vfs);
  const cache: Record<string, any> = {};

  function require(file: string) {
    if (cache[file]) return cache[file];

    const node = graph[file];
    if (!node) {
      throw new Error(`[bundler] module not found: ${file}`);
    }

    const module = { exports: {} };
    cache[file] = module.exports;

    const fn = new Function('require', 'module', 'exports', node.code);

    const localRequire = (dep: string) => {
      return require(resolve(file, dep));
    };

    fn(localRequire, module, module.exports);

    return module.exports;
  }

  return { require };
}
export function executeBundler(vfs: Record<string, string>, entry: string) {
  const bundler = createBundler(vfs);

  const mod = bundler.require(entry);

  return mod?.default ?? mod;
}
