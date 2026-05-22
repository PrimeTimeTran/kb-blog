export function createVM(files: Record<string, string>) {
  function transform(code: string) {
    return (
      code
        // remove default export function syntax
        .replace(/export\s+default\s+function/g, 'function')
        .replace(/export\s+default\s+/g, 'const __default__ = ')
        .replace(/export\s+\{[^}]+\}/g, '')
        .replace(/import\s+.*from\s+['"][^'"]+['"];?/g, '')
    );
  }

  function execute(entry: string) {
    const raw = files[entry];

    if (!raw) {
      throw new Error(`[VM] Module not found: ${entry}`);
    }

    const code = transform(raw);

    const module = { exports: {} as any };
    const exports = module.exports;

    const fn = new Function('module', 'exports', code);

    fn(module, exports);

    // normalize output
    return module.exports?.__default__ ?? module.exports;
  }

  return { execute };
}
