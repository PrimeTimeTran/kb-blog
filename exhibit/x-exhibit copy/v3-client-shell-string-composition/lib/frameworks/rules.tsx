import { Framework } from '../types';

export const frameworkFileRules: Record<
  Framework,
  {
    blacklist: string[];
    whitelist?: string[];
  }
> = {
  react: {
    blacklist: ['node_modules', 'dist', '.git', '.DS_Store'],
  },

  next: {
    blacklist: ['.next', 'node_modules', '.git', '.DS_Store', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'],
  },

  flutter: {
    blacklist: ['.dart_tool', 'build', '.flutter-plugins', '.git'],
  },

  'react-native': {
    blacklist: ['android/build', 'ios/build', 'node_modules', '.git'],
  },
};

export function filterFiles(files: Record<string, string>, blacklist: string[], whitelist?: string[]) {
  const next: Record<string, string> = {};

  for (const [path, content] of Object.entries(files)) {
    const blocked = blacklist.some((rule) => path.includes(rule));

    if (blocked) continue;

    if (whitelist?.length) {
      const allowed = whitelist.some((rule) => path.includes(rule));

      if (!allowed) continue;
    }

    next[path] = content;
  }

  return next;
}
