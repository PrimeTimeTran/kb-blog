import { describe, it, expect } from 'vitest';

import { nextSpec } from '../specs';
import { createVFS, loadFrameworkBase } from '../lib/vfs';

describe('VFS merge', () => {
  it('merges base + spec correctly', () => {
    const base = loadFrameworkBase('next');
    const vfs = createVFS({
      base,
      spec: nextSpec,
      rules: {
        blacklist: [],
        whitelist: [],
      },
    });

    expect(vfs['/app/page.tsx']).toBeDefined();
    expect(vfs['/package.json']).toBeDefined();
  });
});
