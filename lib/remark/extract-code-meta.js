import { visit } from 'unist-util-visit'

function processMeta(metaString) {
  const result = {
    highlight: [],
    cleanString: metaString || '',
    showLineNumbers: false,
  }

  if (typeof metaString !== 'string') return result

  result.showLineNumbers = /\bshowLineNumbers\b/.test(metaString)

  const braceRegex = /\{(.*?)\}/
  const match = metaString.match(braceRegex)

  if (match) {
    const inner = match[1]

    result.highlight = inner.split(',').flatMap((range) => {
      const part = range.trim()
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number)
        return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i)
      }
      return [Number(part)]
    })

    result.cleanString = metaString.replace(braceRegex, '').replace(/\s\s+/g, ' ').trim()
  }

  return result
}

/**
 * 🔥 NEW: parse tabgroup DSL blocks
 *
 * !!!!!dart foo
 * code...
 * dart!!!!!
 */
function parseTabGroup(code = '') {
  const TAB_REGEX = /!!!!!(\w+)\s+([^\n]+)\n([\s\S]*?)\n\1!!!!!/g

  const tabs = []
  let match

  while ((match = TAB_REGEX.exec(code))) {
    const [, lang, name, content] = match

    tabs.push({
      lang: lang.trim(),
      name: name.trim(),
      code: content.trimEnd(),
    })
  }

  return tabs.length ? tabs : null
}

function parseCodeMeta(lang = '', node) {
  const meta = {
    lang,
    fileName: null,
    highlight: [],
    showLineNumbers: false,
    tabs: null,
  }

  // tabgroup override (IMPORTANT)
  if (lang === 'tabgroup') {
    meta.tabs = parseTabGroup(node.value || '')
    meta.lang = 'tabgroup'
    return meta
  }

  if (lang.includes(':')) {
    const [l, ...rest] = lang.split(':')
    meta.lang = l
    meta.fileName = rest.join(':')
  }

  const hl = lang.match(/\{([^}]+)\}/)
  if (hl) {
    meta.highlight = hl[1].split(',').flatMap((p) => {
      if (p.includes('-')) {
        const [a, b] = p.split('-').map(Number)
        return Array.from({ length: b - a + 1 }, (_, i) => a + i)
      }
      return [Number(p)]
    })
  }

  meta.lang = lang.includes(':') ? lang.split(':')[0] : lang
  meta.showLineNumbers = /\bshowLineNumbers\b/.test(node.meta)

  return { ...meta, ...processMeta(node.meta) }
}

export function extractCodeMeta() {
  return (tree) =>
    visit(tree, 'code', (node) => {
      const meta = parseCodeMeta(node.lang || '', node)
      console.log({ goo: meta.tabs[0] })
      console.log({ goo: meta.tabs[1] })
      console.log({ goo: meta.tabs[3] })
      console.log({ goo: meta.tabs[4] })
      console.log({ goo: meta.tabs[5] })

      node.lang = meta.lang || 'text'
      node.data = node.data || {}

      node.data.hProperties = {
        ...(node.data.hProperties || {}),
        codeMeta: JSON.stringify(meta),
      }
    })
}
