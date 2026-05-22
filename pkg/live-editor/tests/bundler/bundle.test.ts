import { describe, it, expect } from 'vitest';
import { executeBundler } from '../../lib/bundler/runtime';

describe('Bundler', () => {
  it('executes a single file default export', () => {
    const vfs = {
      '/app/page.tsx': `
        export default function Page() {
          return "hello";
        }
      `,
    };

    const result = executeBundler(vfs, '/app/page.tsx');

    expect(typeof result).toBe('function');
    expect(result()).toBe('hello');
  });

  it('resolves named exports', () => {
    const vfs = {
      '/lib/math.ts': `
        export const add = (a, b) => a + b;
      `,
      '/app/page.tsx': `
        import { add } from "/lib/math.ts";

        export default function Page() {
          return add(2, 3);
        }
      `,
    };

    const result = executeBundler(vfs, '/app/page.tsx');

    expect(result()).toBe(5);
  });

  it('resolves default imports', () => {
    const vfs = {
      '/lib/util.ts': `
        export default function greet(name) {
          return "hi " + name;
        }
      `,
      '/app/page.tsx': `
        import greet from "/lib/util.ts";

        export default function Page() {
          return greet("tom");
        }
      `,
    };

    const result = executeBundler(vfs, '/app/page.tsx');

    expect(result()).toBe('hi tom');
  });

  it('supports multi-file dependency chain', () => {
    const vfs = {
      '/a.ts': `
        export const a = 1;
      `,
      '/b.ts': `
        import { a } from "/a.ts";
        export const b = a + 1;
      `,
      '/app/page.tsx': `
        import { b } from "/b.ts";

        export default function Page() {
          return b;
        }
      `,
    };

    const result = executeBundler(vfs, '/app/page.tsx');

    expect(result()).toBe(2);
  });

  it('throws on missing module', () => {
    const vfs = {
      '/app/page.tsx': `
        import x from "/missing.ts";

        export default function Page() {
          return x;
        }
      `,
    };

    expect(() => {
      executeBundler(vfs, '/app/page.tsx');
    }).toThrow(/module not found/i);
  });
});
