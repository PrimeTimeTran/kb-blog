import { beforeEach, describe, expect, test } from 'vitest';

import runtime from '../seeds/app-core';

(globalThis as any).Babel = {
  transform(code: string) {
    return { code };
  },
};

describe('module resolution', () => {
  beforeEach(() => {
    runtime.moduleRegistry = {};
  });

  test('normalizes duplicate slashes', () => {
    expect(runtime.normalizePath('//foo///bar.ts')).toBe('/foo/bar.ts');
  });

  test('normalizes missing leading slash', () => {
    expect(runtime.normalizePath('foo/bar.ts')).toBe('/foo/bar.ts');
  });

  test('resolves relative import in same directory', () => {
    expect(runtime.resolvePath('./util.ts', '/app/page.tsx')).toBe('/app/util.ts');
  });

  test('resolves nested relative import', () => {
    expect(runtime.resolvePath('./helper.ts', '/app/lib/math.ts')).toBe('/app/lib/helper.ts');
  });

  test('leaves bare module specifiers untouched', () => {
    expect(runtime.resolvePath('react', '/app/page.tsx')).toBe('react');
  });

  test('loads registered module by resolved path', () => {
    runtime.registerModule(
      '/app/util.ts',
      `
      module.exports = { value: 123 };
      `,
    );

    expect(runtime.customRequire('./util.ts', '/app/page.tsx').value).toBe(123);
  });

  test('returns same cached exports object', () => {
    runtime.registerModule(
      '/app/util.ts',
      `
      module.exports = { foo: 1 };
      `,
    );

    const a = runtime.customRequire('/app/util.ts');
    const b = runtime.customRequire('/app/util.ts');

    expect(a).toBe(b);
  });

  test('resolves multi-level dependency graph', () => {
    runtime.registerModule(
      '/app/c.ts',
      `
      module.exports = { value: 42 };
      `,
    );

    runtime.registerModule(
      '/app/b.ts',
      `
      module.exports = require('./c.ts');
      `,
    );

    runtime.registerModule(
      '/app/a.ts',
      `
      module.exports = require('./b.ts');
      `,
    );

    expect(runtime.customRequire('/app/a.ts').value).toBe(42);
  });

  test('loads static json asset', () => {
    runtime.registerModule('/app/data.json', '{"value":123}');

    const result = runtime.customRequire('/app/data.json');

    expect(result.type).toBe('static');
    expect(result.default.value).toBe(123);
  });

  test('loads static css asset', () => {
    runtime.registerModule('/app/styles.css', '.foo { color: red; }');

    const result = runtime.customRequire('/app/styles.css');

    expect(result.type).toBe('static');
    expect(result.default).toContain('color: red');
  });

  test('module key is identical whether registered with or without leading slash', () => {
    runtime.registerModule(
      'app/util.ts',
      `
      module.exports = { ok: true };
      `,
    );

    expect(runtime.customRequire('/app/util.ts').ok).toBe(true);
  });

  test('throws on missing module', () => {
    expect(() => runtime.customRequire('./missing.ts', '/app/page.tsx')).toThrow();
  });
});

describe('module resolution', () => {
  beforeEach(() => {
    runtime.moduleRegistry = {};
  });

  test('normalizes duplicate slashes', () => {
    expect(runtime.normalizePath('//foo///bar.ts')).toBe('/foo/bar.ts');
  });

  test('normalizes missing leading slash', () => {
    expect(runtime.normalizePath('foo/bar.ts')).toBe('/foo/bar.ts');
  });

  test('resolves relative import in same directory', () => {
    expect(runtime.resolvePath('./util.ts', '/app/page.tsx')).toBe('/app/util.ts');
  });

  test('resolves nested relative import', () => {
    expect(runtime.resolvePath('./helper.ts', '/app/lib/math.ts')).toBe('/app/lib/helper.ts');
  });

  test('leaves bare module specifiers untouched', () => {
    expect(runtime.resolvePath('react', '/app/page.tsx')).toBe('react');
  });

  test('loads registered module by resolved path', () => {
    runtime.registerModule(
      '/app/util.ts',
      `
      export default { value: 123 };
      `,
    );

    expect(runtime.customRequire('./util.ts', '/app/page.tsx').default.value).toBe(123);
  });

  test('returns same cached exports object', () => {
    runtime.registerModule(
      '/app/util.ts',
      `
      export default { foo: 1 };
      `,
    );

    const a = runtime.customRequire('/app/util.ts');
    const b = runtime.customRequire('/app/util.ts');

    expect(a).toBe(b);
  });

  test('throws on missing module', () => {
    expect(() => runtime.customRequire('./missing.ts', '/app/page.tsx')).toThrow();
  });

  test('resolves multi-level dependency graph', () => {
    runtime.registerModule(
      '/app/c.ts',
      `
      export default { value: 42 };
      `,
    );

    runtime.registerModule(
      '/app/b.ts',
      `
      import c from './c.ts';
      export default c;
      `,
    );

    runtime.registerModule(
      '/app/a.ts',
      `
      import b from './b.ts';
      export default b;
      `,
    );

    expect(runtime.customRequire('/app/a.ts').default.value).toBe(42);
  });

  test('static json asset loads correctly', () => {
    runtime.registerModule('/app/data.json', '{"value":123}');

    const result = runtime.customRequire('/app/data.json');

    expect(result.default.value).toBe(123);
  });

  test('static css asset loads as string', () => {
    runtime.registerModule('/app/styles.css', '.foo { color: red; }');

    const result = runtime.customRequire('/app/styles.css');

    expect(result.default).toContain('color: red');
  });

  test('module key is identical whether registered with or without leading slash', () => {
    runtime.registerModule(
      'app/util.ts',
      `
      export default { ok: true };
      `,
    );

    expect(runtime.customRequire('/app/util.ts').default.ok).toBe(true);
  });
});
