import readingTime from 'reading-time'
import { extractTOC } from '../core/extract-toc'
import { normalizeFile, normalizeFrontMatter } from '../core/normalize'

export function preprocessEmbeds(source, index) {
  return source.replace(/!\[\[(.+?)\]\]/g, (_, raw) => {
    const clean = raw.replace(/\.md$/, '')
    const key = clean.split('/').pop() // 👈 THIS IS THE FIX
    const resolved = index.get(key) ?? key
    return `<Embed id="${resolved}" />`
  })
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function preprocessWikiLinks(source = '', index, currentSlug = '') {
  return source.replace(/\[\[(.+?)\]\]/g, (_, raw) => {
    const [left, alias] = raw.split('|')
    const display = alias?.trim()

    const [filePart, ...anchors] = left.split('#')

    const resolvedPath = filePart
      .replace(/\.mdx?$/, '')
      .replace(/^\//, '')
      .toLowerCase()
    const entry = index?.[resolvedPath]
    console.log({ filePart, entry, keys: Object.keys(index) })

    const url = entry
      ? `/kb/${resolvedPath}${anchors.length ? '#' + slugify(anchors.pop()) : ''}`
      : left // fallback safe

    const label = display || left

    return `[${label}](${url})`
  })
}

export function transformBlog(file) {
  const source = file.mdxSource || file.body || file.content
  if (typeof source !== 'string') {
    throw new TypeError(`[transformBlog] expected string but got ${typeof source}`)
  }

  console.log({ transformBlogFMDate: file.frontMatter.date })
  return {
    slug: file.slug,
    Content: file.Content,
    filePath: file.filePath,
    mdxSource: file.mdxSource || source,
    toc: extractTOC(source),

    frontMatter: {
      ...normalizeFrontMatter(file.frontMatter, file.slug),
    },
  }
}

// export function transformKB(file) {
//   if (!file) {
//     throw new Error(`[transformKB] file is missing`)
//   }

//   const source = file.source || file.mdxSource

//   if (typeof source !== 'string') {
//     throw new Error(`[transformKB] expected source string but got ${typeof source}`)
//   }

//   return {
//     mdxSource: source,

//     toc: extractTOC(source),

//     rawSource: source,

//     frontMatter: {
//       ...file.frontMatter,
//       slug: normalizeFile(file.filePath),
//       readingTime: readingTime(source),
//     },
//   }
// }

export function transformKB(file) {
  const source = file.source ?? file.mdxSource

  if (typeof source !== 'string') {
    console.log('[transformKB BAD INPUT]', source)
    throw new Error(`[transformKB] expected string but got ${typeof source}`)
  }

  return {
    content: file.content,
    Content: file.Content,
    mdxSource: file.mdxSource ?? source,
    toc: extractTOC(source),
    rawSource: source,
    frontMatter: {
      ...file.frontMatter,
      slug: normalizeFile(file.filePath),
      readingTime: readingTime(source),
    },
  }
}

export function transformAuthor(file) {
  return {
    Content: file.Content,
    mdxSource: file.mdxSource,
    frontMatter: file.frontMatter,
  }
}
