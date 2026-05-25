import * as esbuild from 'esbuild';

export async function bundleRepo(entry: string, vfs: Record<string, string>) {
  const result = await esbuild.build({
    entryPoints: [entry],

    bundle: true,

    write: false, // IMPORTANT (we stay in memory)

    format: 'esm',

    platform: 'browser',

    target: 'es2020',

    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
      '.js': 'js',
      '.jsx': 'jsx',
    },

    plugins: [virtualFsPlugin(vfs)],
  });

  return result.outputFiles[0].text;
}
