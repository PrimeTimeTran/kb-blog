export function parseImports(code: string): string[] {
  const imports: string[] = [];

  const importRegex = /import\s+(?:[^'"]+from\s+)?['"]([^'"]+)['"]/g;

  let match;

  while ((match = importRegex.exec(code))) {
    imports.push(match[1]);
  }

  return imports;
}

// pkg/live-editor/lib/bundler/transform.ts

export function transform(code: string) {
  return (
    code
      // remove import lines (we handle them via require)
      .replace(/import\s+.*from\s+['"].*['"];?/g, '')

      // export default function/class
      .replace(/export\s+default\s+/g, 'module.exports.default = ')

      // export const/let/var
      .replace(/export\s+const/g, 'const')
      .replace(/export\s+let/g, 'let')
      .replace(/export\s+var/g, 'var')

      // export { ... }
      .replace(/export\s+\{([^}]+)\}/g, (m, group) => {
        return group
          .split(',')
          .map((s: string) => s.trim())
          .map((name: string) => `module.exports.${name} = ${name};`)
          .join('\n');
      })
  );
}
