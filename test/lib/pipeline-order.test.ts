import { describe, it, expect } from 'vitest';
import { createPipelineContext } from '@/lib/content/pipeline/runtime/create-pipeline-context';
import * as pipeline from '@/lib/content/pipeline';

describe('pipeline order', () => {
  it('throws if compile runs before parse', async () => {
    const ctx = createPipelineContext({
      request: { type: 'blog', slug: 'test' },
      raw: {
        raw: '---\ntitle: test\n---\n# hello',
        source: {} as any,
      } as any,
      index: {},
      analysis: {},
    });

    await expect(pipeline.buildCompilePipeline(ctx).run()).rejects.toThrow(/Missing content/);
  });

  it('does not throw when parse runs first', async () => {
    const ctx = createPipelineContext({
      request: { type: 'blog', slug: 'test' },
      raw: {
        raw: '---\ntitle: test\n---\n# hello',
        source: {} as any,
      } as any,
      index: {},
      analysis: {},
    });

    await pipeline.buildParsePipeline(ctx).run(ctx.raw);

    await expect(pipeline.buildCompilePipeline(ctx).run()).resolves.toBeDefined();
  });
});
