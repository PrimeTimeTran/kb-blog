import { describe, it, expect } from 'vitest';

import { createVM } from '../lib/modules/vm';

describe('VM', () => {
  it('fails on missing module', () => {
    const vm = createVM({
      '/app/page.tsx': 'export default function App() {}',
    });

    expect(() => vm.execute('/missing.tsx')).toThrow();
  });

  it('detects ES module syntax (future guard)', () => {
    const vm = createVM({
      '/app/page.tsx': `
        import React from "react";
        export default function App() {}
      `,
    });

    // this should fail until bundler layer exists
    expect(() => vm.execute('/app/page.tsx')).toThrow(/import statement/);
  });
});
