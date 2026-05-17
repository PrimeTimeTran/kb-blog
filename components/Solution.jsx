import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-monokai'

// Light mode themes
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-dawn'
import 'ace-builds/src-noconflict/theme-solarized_light'

export function Solution({ solution }) {
  const [expanded, setExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // 🚨 IMPORTANT: block render until client is ready
  if (!mounted) {
    return <div className="h-[300px] bg-surface-container animate-pulse rounded" />
  }

  const editorTheme = resolvedTheme === 'light' ? 'chrome' : 'monokai'

  const copyToClipboard = async (code) => {
    await navigator.clipboard.writeText(code ?? '')
  }

  function normalizeCode(solution) {
    return solution.code.replace(/^(\s+)/gm, (match) => {
      const spaces = match.length
      const newSpaces = ' '.repeat(spaces / 2)
      return newSpaces
    })
  }

  return (
    <div className="overflow-hidden w-full relative bg-surface-container-high border border-outline-variant/30">
      {/* ================= HEADER ================= */}
      <div className="overflow-hidden w-full relative bg-surface-container-high border border-outline-variant/30 rounded-xl">
        <h3 className="text-sm font-semibold text-on-surface-variant px-2">{solution.title}</h3>
      </div>
      <p className="text-xs text-on-surface-variant px-2">{solution.body}</p>

      {/* ================= CODE WRAPPER ================= */}
      <div className="relative group">
        {/* FLOATING CONTROLS */}
        <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
          <button
            onClick={() => copyToClipboard(normalizeCode(solution))}
            className="icon-button bg-surface-container/80 backdrop-blur-md"
            title="Copy code"
          >
            📋
          </button>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="icon-button bg-surface-container/80 backdrop-blur-md"
            title="Toggle height"
          >
            {expanded ? '▢' : '▣'}
          </button>
        </div>

        {/* ACE EDITOR */}
        <AceEditor
          mode="python"
          theme={editorTheme}
          width="100%"
          fontSize={14}
          value={typeof solution.code === 'string' ? normalizeCode(solution) : ''}
          showPrintMargin={false}
          highlightActiveLine={true}
          height={expanded ? '600px' : '300px'}
          setOptions={{
            tabSize: 2,
            useSoftTabs: true,
            showLineNumbers: false,
            enableLiveAutocompletion: true,
            enableBasicAutocompletion: true,
          }}
        />
      </div>

      {/* ================= FOOTER META ================= */}
      {(solution.bigOTime || solution.bigOSpace) && (
        <div className="flex gap-4 px-3 py-2 text-xs bg-surface-container border-t border-outline-variant/20">
          {solution.bigOTime && <span>Time: {solution.bigOTime}</span>}
          {solution.bigOSpace && <span>Space: {solution.bigOSpace}</span>}
        </div>
      )}
    </div>
  )
}
