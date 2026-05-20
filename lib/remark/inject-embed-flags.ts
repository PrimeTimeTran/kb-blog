import { visit } from 'unist-util-visit'

export function injectEmbedFlags() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const isCallout = node.data?.hName === 'Callout'
      if (!isCallout) return

      let hasEmbed = false

      visit(node, 'mdxJsxFlowElement', (child) => {
        if (child.name === 'Embed') {
          hasEmbed = true
        }
      })

      if (hasEmbed) {
        node.data = node.data || {}
        node.data.hProperties = {
          ...(node.data.hProperties || {}),
          hasEmbed: true,
        }
      }
    })
  }
}
