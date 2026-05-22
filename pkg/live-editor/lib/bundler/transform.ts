import * as esbuild from 'esbuild';
export async function transform(code: string) {
  const result = await esbuild.transform(code, {
    loader: 'tsx',
    format: 'cjs',
    target: 'es2020',
  });

  return result.code;
}
