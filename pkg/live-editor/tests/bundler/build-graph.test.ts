import { describe, it, expect } from 'vitest';
import { buildGraph } from '../../lib/bundler/build-graph';

describe('Bundler Graph', () => {
  it('extracts dependencies', () => {
    const vfs = {
      '/a.ts': `
        import x from "/b.ts";
        import { y } from "/c.ts";
      `,
    };

    const graph = buildGraph(vfs);

    expect(graph['/a.ts'].deps).toEqual(['/b.ts', '/c.ts']);
  });
});
