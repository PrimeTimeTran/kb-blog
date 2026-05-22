export function resolveImports(entry: string, files: Record<string, string>) {
  const visited = new Set<string>();

  function load(path: string) {
    if (visited.has(path)) return;
    visited.add(path);

    const code = files[path];
    if (!code) throw new Error(`Module not found: ${path}`);

    const imports = [...code.matchAll(/from\s+['"](.+?)['"]/g)];

    for (const imp of imports) {
      const dep = normalizePath(path, imp[1]);
      load(dep);
    }

    return {
      path,
      code,
    };
  }

  return load(entry);
}

function normalizePath(base: string, relative: string) {
  if (relative.startsWith('.')) {
    const parts = base.split('/');
    parts.pop();

    return [...parts, relative.replace('./', '')].join('/');
  }

  return relative;
}
