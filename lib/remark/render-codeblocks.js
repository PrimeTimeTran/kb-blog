import { visit } from 'unist-util-visit'

function parseRanges(input) {
  return input.split(',').flatMap((part) => {
    if (part.includes('-')) {
      const [a, b] = (part.split('-') ?? []).map(Number)
      return Array.from({ length: b - a + 1 }, (_, i) => a + i)
    }
    return [Number(part)]
  })
}

export function renderCodeBlocks() {
  return (tree) =>
    visit(tree, 'code', (node) => {
      const nodeLang = node.lang || ''

      let language = nodeLang
      let title = ''

      if (nodeLang.includes(':')) {
        const parts = nodeLang.split(':')
        language = parts[0]
        title = parts.slice(1).join(':')
      }

      if (!title) return

      node.lang = language

      node.data = node.data || {}
      node.data.title = title
    })
}
