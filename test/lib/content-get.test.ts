// test/content-get.test.ts
import { describe, it, expect } from 'vitest'

import { createTestClient } from './content-fixture'

describe('getContent pipeline (client boundary)', () => {
  it('returns compiled published post', async () => {
    const content = createTestClient({
      published: `---
draft: false
title: Hello World
summary: My post
date: 2026-01-01
---
# Hello`,
    })

    const result = await content.get({
      type: 'blog',
      slug: 'published',
    })

    expect(result).not.toBeNull()

    expect(result!.slug).toBe('published')
    expect(result!.title).toBe('Hello World')
    expect(result!.summary).toBe('My post')
    expect(result!.Content).toBeDefined()
    expect(result!.toc).toBeDefined()
  })

  it('filters draft content', async () => {
    const content = createTestClient({
      draft: `---
draft: true
title: Draft
summary: Hidden
date: 2026-01-01
---
# Hidden`,
    })

    const result = await content.get({
      type: 'blog',
      slug: 'draft',
    })

    expect(result).toBeNull()
  })
})
