import * as esbuild from 'esbuild';

export function transform(code: string) {
  esbuild.transformSync(code, {
    loader: 'tsx',
    format: 'iife',
    globalName: 'App',
  });
  // return esbuild.transformSync(code, {
  //   loader: 'tsx',
  //   format: 'esm',
  //   target: 'es2020',
  //   sourcemap: false,
  // }).code;
}
