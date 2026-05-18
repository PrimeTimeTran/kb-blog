import { describe, it, expect } from 'vitest'
import { isPublished } from './is-published'

describe('isPublished', () => {
  it('allows published content', () => {
    const entity = {
      frontMatter: { draft: false },
    }

    expect(isPublished(entity)).toBe(true)
  })

  it('blocks draft content', () => {
    const entity = {
      frontMatter: { draft: true },
    }

    expect(isPublished(entity)).toBe(false)
  })

  it('treats missing draft as not published', () => {
    const entity = {
      frontMatter: {},
    }

    expect(isPublished(entity)).toBe(false)
  })
})
