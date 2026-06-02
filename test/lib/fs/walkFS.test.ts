import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import fs from 'fs';
import os from 'os';
import path from 'path';
import { walkFS } from '@/lib/fs/walk';

let tmpDir: string;

function writeFile(relPath: string, content: string) {
  const full = path.join(tmpDir, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

export function getFixturePath(name: string) {
  return path.join(__dirname, 'fixtures', 'walk', name);
}
export function expectFiles(files: any[], expected: string[]) {
  const actual = files.map((f) => f.relPath);
  for (const e of expected) {
    expect(actual).toContain(expect.stringContaining(e));
  }
}

export const walkFixtures = {
  basic: {
    expectedCount: 4,
    expectedExtensions: ['html', 'css', 'js', 'txt'],
    includes: ['index.html', 'styles.css', 'app.js', 'nested/deep.txt'],
  },

  nested: {
    expectedCount: 6,
    includes: ['a.txt', 'b.txt', 'nested/c.txt', 'nested/deep/d.txt'],
  },
} as const;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'walk-fs'));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe('@lib/fs/walk/walkFS', () => {
  it('walks all files recursively', () => {
    writeFile('a.txt', 'A');
    writeFile('b/b.txt', 'B');
    writeFile('b/c/c.txt', 'C');

    const res = walkFS({ dir: tmpDir }, (f) => f);

    expect(res).toHaveLength(3);

    const paths = res.map((f) => f.relPath).sort();

    expect(paths).toEqual(['/a.txt', '/b/b.txt', '/b/c/c.txt']);
  });
  it('respects include regex', () => {
    writeFile('a.md', '# A');
    writeFile('b.txt', 'B');
    writeFile('c.mdx', '# C');

    const res = walkFS(
      {
        dir: tmpDir,
        include: /\.(md|mdx)$/,
      },
      (f) => f,
    );

    expect(res.map((r) => r.name).sort()).toEqual(['a.md', 'c.mdx']);
  });
  it('ignores directories', () => {
    writeFile('a/a.txt', 'A');
    writeFile('node_modules/x.txt', 'X');

    const res = walkFS(
      {
        dir: tmpDir,
        ignoreDirs: ['node_modules'],
      },
      (f) => f,
    );

    expect(res.map((r) => r.name)).toEqual(['a.txt']);
  });
  it('normalizes relPath correctly', () => {
    writeFile('deep/nested/file.ts', 'export {}');

    const [file] = walkFS({ dir: tmpDir }, (f) => f);

    expect(file.relPath).toBe('/deep/nested/file.ts');
  });
  it('maps file correctly', () => {
    writeFile('index.ts', 'const x = 1');

    const res = walkFS({ dir: tmpDir }, (f) => ({
      path: f.relPath,
      size: f.content.length,
    }));

    expect(res[0]).toEqual({
      path: '/index.ts',
      size: 'const x = 1'.length,
    });
  });
  it('handles empty directory', () => {
    const res = walkFS({ dir: tmpDir }, (f) => f);

    expect(res).toEqual([]);
  });
  it('reads file content correctly', () => {
    writeFile('hello.txt', 'hello world');

    const [file] = walkFS({ dir: tmpDir }, (f) => f);

    expect(file.content).toBe('hello world');
  });

  describe('walkFS (fixtures)', () => {
    it('walks basic fixture correctly', () => {
      const dir = getFixturePath('basic');

      const files = walkFS({ dir, include: /.*/ }, (f) => f);
      expect(files.map((f) => f.relPath)).toEqual(['/a.txt', '/b.js', '/index.html', '/nested/c.ts']);

      const paths = files.map((f) => f.relPath);

      expect(paths).toContain('/index.html');
      expect(paths).toContain('/a.txt');
      expect(paths).toContain('/b.js');
      expect(paths).toContain('/nested/c.ts');
      expect(paths).not.toContain('/go.ts');
    });

    it('normalizes paths consistently', () => {
      const dir = getFixturePath('basic');

      const files = walkFS({ dir }, (f) => f);

      for (const f of files) {
        expect(f.relPath).toMatch(/^\//);
        expect(f.relPath).not.toMatch(/\/{2,}/);
      }
    });

    it('filters extensions correctly', () => {
      const dir = getFixturePath('basic');

      const files = walkFS(
        {
          dir,
          include: /\.(css|html)$/,
        },
        (f) => f,
      );

      expect(files.every((f) => /\.(css|html)$/.test(f.name))).toBe(true);
    });

    it('produces deterministic output', () => {
      const dir = getFixturePath('basic');

      const a = walkFS({ dir }, (f) => f);
      const b = walkFS({ dir }, (f) => f);

      expect(a.map((f) => f.relPath)).toEqual(b.map((f) => f.relPath));
    });
  });
});
