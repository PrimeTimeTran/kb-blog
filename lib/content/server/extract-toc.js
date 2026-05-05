import { remark } from 'remark'
import GithubSlugger from 'github-slugger'
import remarkParse from 'remark-parse'
import { toString } from 'mdast-util-to-string'

function stripFrontMatter(source) {
  if (typeof source !== 'string') {
    throw new TypeError(`[stripFrontMatter] expected string but got ${typeof source}`)
  }

  return source.replace(/^---[\s\S]*?---\n/, '')
}

export function extractTOC(source) {
  const clean = stripFrontMatter(source)
  const tree = remark().use(remarkParse).parse(clean)
  const slugger = new GithubSlugger()
  return ((tree.children ?? []).filter((n) => n.type === 'heading') ?? []).map((node) => {
    const value = toString(node)

    return {
      depth: node.depth,
      value,
      url: `#${slugger.slug(value)}`,
    }
  })
}
