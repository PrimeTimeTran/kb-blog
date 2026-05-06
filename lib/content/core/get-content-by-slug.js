import { loadContent } from '@/lib/content/core/load-content'
import { transformAuthor, transformBlog, transformKB } from '@/lib/content/core/transformers'

const transformers = {
  kb: transformKB,
  blog: transformBlog,
  authors: transformAuthor,
}

export async function getContentBySlug(type, slug, options) {
  if (!slug) return null

  if (Array.isArray(slug)) {
    slug = slug.filter(Boolean).join('/')
  }
  const file = await loadContent(type, slug, options)
  if (typeof file.mdxSource !== 'string') {
    console.log('BAD MDX SOURCE:', file.mdxSource)
    throw new Error('mdxSource must be string')
  }

  const transform = transformers[type]

  if (!transform) {
    throw new Error(`Unknown content type: ${type}`)
  }

  return transform(file)
}
