import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'

export function extractHeadings(source: string) {
  const tree = unified().use(remarkParse).parse(source)
  const slugger = new GithubSlugger()

  const headings: {
    depth: number
    value: string
    id: string
  }[] = []

  visit(tree, 'heading', (node: any) => {
    const value = toString(node).trim()

    // skip empty headings
    if (!value) return

    const id = slugger.slug(value)

    headings.push({
      depth: node.depth,
      value,
      id,
    })
  })

  return headings
}
