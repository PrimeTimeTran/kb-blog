import { visit } from 'unist-util-visit'

import Prism from '@/lib/prism'
globalThis.Prism = Prism

export function renderEmbeds(options = {}) {
  return function transformer(tree, file) {
    const registry = file.data.registry

    visit(tree, 'paragraph', (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      const only = node.children?.[0]
      if (!only || only.type !== 'text') return

      const match = only.value?.trim().match(/^!\[\[(.+?)\]\]$/)
      if (!match) return

      const id = match[1].replace(/\.md$/, '')

      parent.children.splice(index, 1, {
        type: 'mdxJsxFlowElement',
        name: 'Embed',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'id',
            value: id,
          },
        ],
        children: [],
      })
    })
  }
}
