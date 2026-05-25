import * as esbuild from 'esbuild';

export function transformFile(code: string, path: string) {
  return esbuild.transformSync(code, {
    loader: 'tsx',
    format: 'esm', // 👈 IMPORTANT: preserve module semantics
    target: 'es2020',
    sourcemap: false,

    // 🚨 CRITICAL:
    bundle: false, // never bundle
    treeShaking: false,
  }).code;
}
