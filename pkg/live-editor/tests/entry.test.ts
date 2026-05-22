import { describe, it, expect } from 'vitest';
import { resolveEntry } from '../lib/modules/resolver';

describe('Entry resolver', () => {
  it('returns explicit entry', () => {
    const entry = resolveEntry({
      entry: '/app/page.tsx',
      files: {
        '/app/page.tsx': 'export default function App() {}',
      },
    });

    expect(entry).toBe('/app/page.tsx');
  });

  it('falls back to page.tsx', () => {
    const entry = resolveEntry({
      files: {
        '/app/page.tsx': 'x',
      },
    });

    expect(entry).toBe('/app/page.tsx');
  });

  it('fails if no valid entry exists', () => {
    expect(() => resolveEntry({ files: {} })).toThrow();
  });
});
