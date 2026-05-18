// lib/remark-autolink-terms.js
import { visit } from 'unist-util-visit'

export function injectTermLinksAndPreviews(terms) {
  const termEntries = Object.entries(terms).sort((a, b) => b[0].length - a[0].length)

  return (tree) => {
    const seen = new Set()

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || !node.value) return

      // 🚫 skip unsafe contexts
      if (['link', 'inlineCode', 'code', 'heading'].includes(parent.type)) return

      let text = node.value

      for (const [term, data] of termEntries) {
        if (seen.has(data.slug)) continue

        const regex = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i')

        if (!regex.test(text)) continue
        const match = text.match(regex)[0]
        const parts = text.split(regex)

        if (parts.length < 2) continue

        const newNodes = []

        parts.forEach((part, i) => {
          if (part) {
            newNodes.push({ type: 'text', value: part })
          }

          if (i < parts.length - 1) {
            newNodes.push({
              type: 'mdxJsxTextElement',
              name: 'Term',
              attributes: [
                { type: 'mdxJsxAttribute', name: 'href', value: data.slug },
                { type: 'mdxJsxAttribute', name: 'term', value: term },
                { type: 'mdxJsxAttribute', name: 'short', value: data.short || '' },
              ],
              children: [{ type: 'text', value: match }],
            })
          }
        })

        parent.children.splice(index, 1, ...newNodes)
        seen.add(data.slug)

        return index
      }
    })
  }
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
