// test/content-list.test.ts
import { describe, it, expect } from 'vitest'
import { createTestClient } from './content-fixture'

describe('listContent pipeline (client boundary)', () => {
  it('only returns published items', async () => {
    const content = createTestClient({
      a: `---
draft: false
title: A
summary: A summary
date: 2026-01-01
---`,

      b: `---
draft: true
title: B
summary: B summary
date: 2026-01-01
---`,

      c: `---
title: C
summary: Missing draft defaults to hidden in your system
date: 2026-01-01
---`,
    })

    const results = await content.list({
      type: 'blog',
    })

    const slugs = results.map((r) => r.slug)

    expect(slugs).toContain('a')
    expect(slugs).not.toContain('b')
    expect(slugs).not.toContain('c')
  })

  it('enforces required UI fields', async () => {
    const content = createTestClient({
      a: `---
draft: false
title: A
summary: A summary
date: 2026-01-01
---`,
    })

    const results = await content.list({
      type: 'blog',
    })

    for (const item of results) {
      expect(item.title?.length).toBeGreaterThan(0)
      expect(item.summary?.length).toBeGreaterThan(0)
      expect(item.date).toBeDefined()
    }
  })
})
