import { describe, it, expect } from 'vitest'
import { buildParsePipeline } from '@/lib/content/pipeline'

describe('pipeline boundaries', () => {
  it('parse pipeline does not require content to exist', async () => {
    const ctx = {
      request: { type: 'blog', slug: 'x' },
      raw: {
        raw: '---\ntitle: test\n---\nhello',
        source: {} as any,
      },
      index: {},
      analysis: {},
    } as any

    await expect(buildParsePipeline(ctx).run(ctx.raw)).resolves.toBeDefined()
  })
})
