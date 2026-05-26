import AceEditor from 'react-ace';

import { useTheme } from '@teispace/next-themes';
import { useEffect, useMemo, useRef } from 'react';

export function Editor({
  mode,
  value,
  onChange,
  expanded = false, // 1. Catch the expanded flag from your Solution wrapper
  setEditorReady,
  autoHeight = false, // 1. Add this switch prop
  highlightActiveLine = false,
  showPrintMargin,
}) {
  const editorRef = useRef(null);
  const { resolvedTheme } = useTheme();

  // Keep a mutable reference to onChange to prevent state closures in hotkey loops
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // 2. Alert Ace to redraw its internal canvas layers when toggling expand states
  useEffect(() => {
    if (editorRef.current?.editor) {
      editorRef.current.editor.resize();
    }
  }, [expanded]);

  const editorTheme = useMemo(() => {
    return resolvedTheme === 'dark' ? 'tomorrow_night' : 'chrome';
  }, [resolvedTheme]);

  const handleEditorLoad = (editorInstance) => {
    if (setEditorReady) setEditorReady(true);

    const handleKeyDown = (e) => {
      const isMac = navigator.userAgent.includes('Mac');
      const cmd = isMac ? e.metaKey : e.ctrlKey;
      if (!cmd) return;

      const key = e.key.toLowerCase();
      if (key === 'x') {
        e.preventDefault();
        cut(editorInstance, onChangeRef.current);
      }
      if (key === '/') {
        e.preventDefault();
        toggleComment(editorInstance, onChangeRef.current);
      }
    };

    const container = editorInstance.container;
    container.addEventListener('keydown', handleKeyDown);

    editorInstance.on('destroy', () => {
      container.removeEventListener('keydown', handleKeyDown);
    });
  };

  return (
    <AceEditor
      ref={editorRef}
      name="ace-editor"
      mode={mode}
      theme={editorTheme}
      value={value}
      onChange={onChange}
      width="100%"
      height={autoHeight ? 'auto' : '100%'}
      highlightActiveLine={highlightActiveLine}
      setOptions={{
        useWorker: false,
        maxLines: autoHeight ? (expanded ? Infinity : 10) : undefined,
        minLines: autoHeight ? 10 : undefined,
        autoScrollEditorIntoView: autoHeight,
      }}
      onLoad={handleEditorLoad}
    />
  );
}
function cut(editor, onChange) {
  if (!editor) return;

  const range = editor.getSelectionRange();

  if (range.isEmpty()) {
    const row = range.start.row;
    editor.session.removeFullLines(row, row);
  } else {
    editor.session.remove(range);
  }

  onChange(editor.getValue());
}
// CMD + / (toggle comment)
function toggleComment(editor, onChange) {
  if (!editor) return;

  editor.toggleCommentLines();
  onChange(editor.getValue());
}
