type VFS = Record<string, string>;

export function createVM(vfs: VFS) {
  const cache: Record<string, any> = {};

  function resolve(path: string): string {
    if (vfs[path]) return path;

    // naive resolution (PoC only)
    if (vfs[path + '.tsx']) return path + '.tsx';
    if (vfs[path + '.ts']) return path + '.ts';

    throw new Error(`[VM] module not found: ${path}`);
  }

  function require(path: string) {
    const resolved = resolve(path);

    if (cache[resolved]) return cache[resolved];

    const code = vfs[resolved];

    if (!code) throw new Error(`[VM] missing code: ${resolved}`);

    const module = { exports: {} };
    cache[resolved] = module.exports;

    const fn = new Function('require', 'module', 'exports', code);

    fn(require, module, module.exports);

    return module.exports;
  }

  return { require };
}
