import { useMemo, useRef, useEffect, useState } from 'react';
import { useTheme } from '@teispace/next-themes';
import dynamic from 'next/dynamic';

const AceEditor = dynamic(() => import('react-ace'), { ssr: false });

// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/theme-monokai';

// // Light mode themes
// import 'ace-builds/src-noconflict/theme-github';
// import 'ace-builds/src-noconflict/theme-chrome';
// import 'ace-builds/src-noconflict/theme-xcode';
// import 'ace-builds/src-noconflict/theme-textmate';
// import 'ace-builds/src-noconflict/theme-dawn';
// import 'ace-builds/src-noconflict/theme-solarized_light';
// import 'ace-builds/src-noconflict/ext-language_tools';

export function BaseEditor({ mode, value, onChange, expanded = false, highlightActiveLine = false }) {
  const [html, setHtml] = useState(`
<h1>Hello world</h1>

<style>
  body {
    font-family: sans-serif;
    background: #111;
    color: white;
    padding: 40px;
  }

  h1 {
    color: hotpink;
  }
</style>

<script>
  console.log("live")
</script>
`);

  const editorRef = useRef(null);
  const [editorReady, setIsEditorReady] = useState(false);
  const { resolvedTheme } = useTheme();

  // expose ace instance safely
  const getEditor = () => editorRef.current?.editor;

  // CMD + X (cut line / selection)
  function cut() {
    const editor = getEditor();
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
  function toggleComment() {
    const editor = getEditor();
    if (!editor) return;

    editor.toggleCommentLines();
    onChange(editor.getValue());
  }

  const editorTheme = resolvedTheme === 'light' ? 'xcode' : 'monokai';

  // HOTKEYS
  useEffect(() => {
    const editor = getEditor();
    if (!editor) return;

    const handler = (e) => {
      const isMac = navigator.platform.includes('Mac');
      const cmd = isMac ? e.metaKey : e.ctrlKey;

      if (!cmd) return;

      const key = e.key.toLowerCase();

      if (key === 'x') {
        e.preventDefault();
        cut();
      }

      if (key === '/') {
        e.preventDefault();
        toggleComment();
      }
    };

    editor.container.addEventListener('keydown', handler);

    return () => {
      editor.container.removeEventListener('keydown', handler);
    };
  }, []);

  useEffect(() => {
    const loadAceModules = async () => {
      await import('ace-builds/src-noconflict/ace');
      await import('ace-builds/src-noconflict/theme-xcode');
      await import('ace-builds/src-noconflict/mode-javascript');
      await import('ace-builds/src-noconflict/mode-jsx');
      await import('ace-builds/src-noconflict/mode-typescript');
      await import('ace-builds/src-noconflict/mode-tsx');

      setIsEditorReady(true);
    };

    loadAceModules();
  }, []);
  const srcDoc = useMemo(() => html, [html]);
  if (!editorReady) {
    return <h1>loading</h1>;
  }

  if ('html' == true) {
    <div className="grid grid-cols-2 h-screen">
      <AceEditor
        mode="html"
        theme="monokai"
        value={html}
        onChange={setHtml}
        width="100%"
        height="100%"
        setOptions={{
          useWorker: false,
        }}
      />

      <iframe srcDoc={srcDoc} className="w-full h-full bg-white" sandbox="allow-scripts" />
    </div>;
  }

  return (
    <AceEditor
      mode={'jsx'}
      // mode={mode}
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
  );
}
