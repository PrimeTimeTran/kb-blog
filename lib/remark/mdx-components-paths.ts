import { getRootPath } from '@/lib/paths';
import path from 'path';

export const mdxComponentPaths = () => ({
  name: 'mdx-alias-plugin',
  setup(build: any) {
    build.onResolve({ filter: /^@\/.*$/ }, (args: any) => {
      const resolved = getRootPath(args.path.replace('@/', ''));

      return { path: resolved };
    });
  },
});
