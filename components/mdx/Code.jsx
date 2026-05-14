'use client'
import Prism from 'prismjs'
import React, { useState, useEffect } from 'react'

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

// TODO:
// - [ ] Renders JSX properly.
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

export function TabGroup({ tabs }) {
  const [active, setActive] = useState(0)

  const parsed = typeof tabs === 'string' ? safeJsonParse(tabs, []) : tabs

  if (!parsed?.length) return null

  return (
    <div className="not-prose bg-slate-50 dark:bg-[#0d1117] text-slate-200 bg-red-500">
      <div className="px-4 py-2 font-mono text-xs text-slate-400 border-l-2 border-blue-500 bg-blue-500/10">
        <div className="flex gap-1">
          {(parsed ?? []).map((tab, i) => {
            const isActive = i === active

            return (
              <button
                key={`${tab.label}-${i}`}
                onClick={() => setActive(i)}
                className={[
                  'relative rounded-md px-3 py-1.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-slate-300 shadow-sm dark:bg-slate-800 text-zinc-500 dark:text-zinc-100'
                    : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200',
                ].join(' ')}
              >
                {tab.label}

                {/* subtle active indicator (optional but nice) */}
                {isActive && (
                  <span className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-blue-500" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Panels */}
      <div className="bg-slate-100 transition-colors duration-200 dark:bg-slate-950 ">
        <div className="relative">
          {(parsed ?? []).map((tab, i) => {
            const isActive = i === active

            return (
              <div
                key={`${tab.lang}-${i}`}
                className={`transition-opacity duration-150 ${isActive ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'} `}
              >
                <Pre
                  lang={tab.lang}
                  code={tab.content}
                  showLineNumbers={tab.showLineNumbers}
                  highlight={tab.highlight}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const Code = ({ children, className }) => {
  const language = className?.replace(/language-/, '') || 'text'

  useEffect(() => {
    Prism.highlightAll()
  }, [children])

  return (
    <div className="flex-1 h-64 overflow-auto bg-slate-950 rounded-lg">
      <pre className={`language-${language} !m-0 p-4`}>
        <code className={`language-${language} block w-fit min-w-full`}>{children}</code>
      </pre>
    </div>
  )
}
