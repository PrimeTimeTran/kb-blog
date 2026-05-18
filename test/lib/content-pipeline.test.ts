import { describe, expect, it } from 'vitest'
import matter from 'gray-matter'

import { isPublished } from '@/lib/content/core/is-published'

function parse(content: string) {
  const normalized = content.trim() // 🔥 important

  const result = matter(normalized)

  return {
    frontMatter: result.data,
    content: result.content,
  }
}

describe('content pipeline', () => {
  it('hides draft:true notes', () => {
    const file = parse(`
---
draft: true
---

# Secret
`)

    expect(isPublished(file)).toBe(false)
  })

  it('publishes draft:false notes', () => {
    const file = parse(`
---
draft: false
---

# Public
`)

    expect(isPublished(file)).toBe(true)
  })

  it('hides notes without draft:false', () => {
    const file = parse(`
---
title: Hello
---

# No Draft Field
`)

    expect(isPublished(file)).toBe(false)
  })

  it('handles string booleans', () => {
    const file = parse(`
---
draft: "false"
---

# Public
`)

    expect(isPublished(file)).toBe(true)
  })
})
