import { useMemo, useState } from 'react'
// Monaco/Ace editor
// ↓
// esbuild-wasm
// ↓
// transform TSX
// ↓
// runtime import/eval
// ↓
// React render

function hasRender(c) {
  return /render\(\s*</.test(c)
}
function stripExistingRender(c) {
  return c.replace(/render\(\s*<.*?>\s*\)\s*/g, '')
}
function stripExports(c) {
  return c.replace(/export\s+default\s+/g, '').replace(/export\s+/g, '')
}
function stripNodeStuff(c) {
  return c
    .replace(/\brequire\s*\([^)]*\)/g, '')
    .replace(/\bmodule\.exports\b/g, '')
    .replace(/\bexports\b/g, '')
}
export function transformCode(c) {
  const noRender = stripExistingRender(c)
  const noExports = stripExports(noRender)
  const noNode = stripNodeStuff(noExports)
  const cleaned = noNode

  // export default function Page()
  const exportFunctionMatch = c.match(/export\s+default\s+function\s+(\w+)/)

  if (exportFunctionMatch) {
    const componentName = exportFunctionMatch[1]

    const withoutExport = cleaned.replace(
      new RegExp(`function\\s+${componentName}`),
      `function ${componentName}`
    )

    return withoutExport + `\n\nrender(<${componentName} />)`
  }

  // export default Page
  const exportNamedMatch = c.match(/export\s+default\s+(\w+)/)

  if (exportNamedMatch) {
    const componentName = exportNamedMatch[1]

    const withoutExport = cleaned.replace(/export\s+default\s+\w+/, '')

    return withoutExport + `\n\nrender(<${componentName} />)`
  }

  // fallback: last PascalCase component
  const componentMatches = [...cleaned.matchAll(/(?:function|const)\s+([A-Z]\w*)/g)]

  const lastComponent = componentMatches[componentMatches.length - 1]

  if (lastComponent && !hasRender(cleaned)) {
    return cleaned + `\n\nrender(<${lastComponent[1]} />)`
  }

  return cleaned
}

export function useLiveEditor(initialCode) {
  const [editorCode, setEditorCode] = useState(initialCode)
  const code = useMemo(() => {
    return transformCode(editorCode)
  }, [editorCode])

  const onUpdateCode = (c) => {
    setEditorCode(c)
  }
  return { code, onUpdateCode }
}
