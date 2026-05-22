import * as esbuild from 'esbuild';

export function transform(code: string) {
  return esbuild.transformSync(code, {
    loader: 'tsx',
    format: 'esm',
    target: 'es2020',
    sourcemap: false,
  }).code;
}
