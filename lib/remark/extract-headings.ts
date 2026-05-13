import { remark } from 'remark'
import remarkParse from 'remark-parse'
import { toString } from 'mdast-util-to-string'
import GithubSlugger from 'github-slugger'
import { visit } from 'unist-util-visit'

export function extractHeadings(source: string) {
  const tree = remark().use(remarkParse).parse(source)
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
