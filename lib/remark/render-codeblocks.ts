import { visit } from 'unist-util-visit'

export function renderCodeBlocks() {
  console.log('renderCodeBlocks')
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
