// test/utils/content-fixture.ts
import matter from 'gray-matter'
import { createContentClient } from '@/lib/content/api/client'

export function createMockCollection(files: Record<string, string>) {
  return {
    async read(slug: string) {
      const raw = files[slug]
      if (!raw) return null
      return {
        raw,
        source: {
          id: 'fs:blog',
          type: 'blog',
          slug,
          filePath: `/kb/${slug}.md`,
          extension: '.md',
          source: 'filesystem',
        },
      }
    },

    async list() {
      return Object.keys(files)
    },
  }
}

export function createMockRegistry(files: Record<string, string>) {
  return {
    get(type: string) {
      if (type !== 'blog') return undefined

      return {
        id: 'fs:blog', // 👈 MOVE ID HERE (IMPORTANT)
        async read(slug: string) {
          const raw = files[slug]
          if (!raw) return null

          return {
            raw,
            source: {
              type: 'blog',
              slug,
              filePath: `/kb/${slug}.md`,
              extension: '.md',
              source: 'filesystem',
            },
          }
        },
        async list() {
          return Object.keys(files)
        },
      }
    },
  }
}

export function createTestClient(files: Record<string, string>) {
  const registry = createMockRegistry(files)
  return createContentClient(registry)
}

export function md(content: string) {
  const parsed = matter(content.trim())

  return {
    raw: {
      raw: content.trim(),
      source: {
        id: 'test',
        type: 'blog',
        slug: 'test',
        filePath: '/test.md',
        extension: '.md',
        source: 'filesystem',
      },
    },
    frontMatter: parsed.data,
    body: parsed.content,
  }
}
