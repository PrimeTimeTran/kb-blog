'use client'
import Prism from 'prismjs'
import React from 'react'

import { LANG_MAP } from '@/data/constants'

function extractText(node) {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return (node ?? []).map(extractText).join('')
  if (React.isValidElement(node)) return extractText(node.props.children)
  return ''
}

function safeJsonParse(value, fallback = {}) {
  if (!value) return fallback

  if (typeof value !== 'string') return value

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

// BUG: Fails to render JSX correctly
export function Pre(props) {
  const { code, children, codeMeta } = props
  // ---- meta ----
  const meta =
    codeMeta || children?.props?.codeMeta
      ? JSON.parse(codeMeta || children?.props?.codeMeta || '{}')
      : props

  const { lang, showLineNumbers, fileName: title, highlight = [] } = meta

  // ---- code ----
  const rawCode = (code ?? extractText(children)).trim()
  const resolvedLang = LANG_MAP[lang] || lang || 'text'
  const grammar = Prism.languages[resolvedLang]

  const html = grammar ? Prism.highlight(rawCode, grammar, resolvedLang) : rawCode
  const lines = html.split(/\r?\n/)

  const highlightSet = new Set(highlight)
  const hasHighlights = highlightSet.size > 0

  // ---- render ----
  const transformedHtml = (lines ?? [])
    .map((line, index) => {
      const lineNumber = index + 1
      const isHighlighted = hasHighlights && highlightSet.has(lineNumber)

      const bgClass = isHighlighted
        ? 'bg-green-500/10 border-l-4 border-l-green-400'
        : 'border-l-4 border-l-transparent'
      return `
        <div class="flex px-4 border-l-4  ${bgClass}">
          ${
            showLineNumbers
              ? `<span class="mr-4 w-8 shrink-0 text-right opacity-20 select-none font-mono">${lineNumber}</span>`
              : ''
          }
          <span class="flex-1 whitespace-pre">${line || ' '}</span>
        </div>
      `.trim()
    })
    .join('')
  return (
    <div className="not-prose overflow-hidden bg-slate-50 dark:bg-[#0d1117] text-slate-200">
      {title && (
        <div className="w-full px-4 py-2 font-mono text-xs text-slate-400 border-l-2 border-blue-500 bg-blue-500/10">
          {title}
        </div>
      )}

      <pre className="m-0! overflow-x-auto bg-slate-100 py-2 font-mono text-sm leading-relaxed dark:bg-slate-950">
        <code className="block min-w-full" dangerouslySetInnerHTML={{ __html: transformedHtml }} />
      </pre>
    </div>
  )
}
