import readingTime from 'reading-time'
import { extractTOC } from '../core/extract-toc'
import { normalizeFile, normalizeFrontMatter } from '../core/normalize'

export function preprocessEmbeds(source, kbIndex) {
  return source.replace(/!\[\[(.+?)\]\]/g, (_, raw) => {
    const clean = raw.replace(/\.md$/, '')
    const key = clean.split('/').pop() // 👈 THIS IS THE FIX
    const resolved = kbIndex.get(key) ?? key
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

export function preprocessWikiLinks(source = '', kbIndex, currentSlug = '') {
  if (typeof source !== 'string') {
    throw new TypeError(`[preprocessWikiLinks] expected string but got ${typeof source}`)
  }
  return source.replace(/\[\[(.+?)\]\]/g, (_, raw) => {
    const [left, alias] = raw.split('|')

    const display = alias?.trim()

    // -------------------------------
    // split file + anchors
    // -------------------------------
    const [filePart, ...anchors] = left.split('#')
    const cleanFile = filePart.replace(/\.mdx?$/, '').toLowerCase()
    const resolvedPath = kbIndex instanceof Map ? kbIndex.get(cleanFile) : kbIndex?.[cleanFile]

    // -------------------------------
    // detect same-page link ✅
    // -------------------------------
    const isSamePage = !filePart || resolvedPath === currentSlug.split('/').pop()

    let url = ''

    if (isSamePage) {
      // ✅ same page → only anchor
      if (anchors.length) {
        const last = anchors[anchors.length - 1]
        url = `#${slugify(last)}`
      } else {
        url = '' // or '#'
      }
    } else {
      // ✅ different page
      url = `/kb/${resolvedPath}`

      if (anchors.length) {
        const last = anchors[anchors.length - 1]
        url += `#${slugify(last)}`
      }
    }

    const label = display || left.replace(/\.mdx?$/, '').replace(/#/g, ' › ')

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
