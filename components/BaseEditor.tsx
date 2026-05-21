import AceEditor from 'react-ace'
import { useRef, useEffect } from 'react'
import { useTheme } from '@teispace/next-themes'

import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/theme-monokai'

// Light mode themes
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-dawn'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/ext-language_tools'

export function BaseEditor({
  mode,
  value,
  onChange,
  expanded = false,
  highlightActiveLine = false,
}) {
  const editorRef = useRef(null)
  const { resolvedTheme } = useTheme()

  // expose ace instance safely
  const getEditor = () => editorRef.current?.editor

  // CMD + X (cut line / selection)
  function cut() {
    const editor = getEditor()
    if (!editor) return

    const range = editor.getSelectionRange()

    if (range.isEmpty()) {
      const row = range.start.row
      editor.session.removeFullLines(row, row)
    } else {
      editor.session.remove(range)
    }

    onChange(editor.getValue())
  }
  // CMD + / (toggle comment)
  function toggleComment() {
    const editor = getEditor()
    if (!editor) return

    editor.toggleCommentLines()
    onChange(editor.getValue())
  }

  const editorTheme = resolvedTheme === 'light' ? 'chrome' : 'monokai'

  // HOTKEYS
  useEffect(() => {
    const editor = getEditor()
    if (!editor) return

    const handler = (e) => {
      const isMac = navigator.platform.includes('Mac')
      const cmd = isMac ? e.metaKey : e.ctrlKey

      if (!cmd) return

      const key = e.key.toLowerCase()

      if (key === 'x') {
        e.preventDefault()
        cut()
      }

      if (key === '/') {
        e.preventDefault()
        toggleComment()
      }
    }

    editor.container.addEventListener('keydown', handler)

    return () => {
      editor.container.removeEventListener('keydown', handler)
    }
  }, [])
  console.log({ value })

  return (
    <AceEditor
      mode={mode}
      width="100%"
      value={value}
      fontSize={14}
      ref={editorRef}
      name="ace-editor"
      onChange={onChange}
      theme={editorTheme}
      height={true ? '600px' : '100px'}
      highlightActiveLine={highlightActiveLine}
      setOptions={{
        tabSize: 2,
        wrap: false,
        useSoftTabs: true,
        useWorker: false,
        showLineNumbers: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
      }}
    />
  )
}
