'use client';
import React, { useEffect, useRef } from 'react';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';

export function AceCodeBlock({ code, language }) {
  const editorRef = useRef(null);

  // Standardize naming (Markdown often says 'py', Ace needs 'python')
  const modeMap = {
    py: 'python',
    python: 'python',
    js: 'javascript',
    javascript: 'javascript',
    jsx: 'jsx',
    tsx: 'tsx',
  };

  const resolvedMode = modeMap[language] || 'text';

  return (
    <div className="my-4 rounded-lg border border-slate-800 overflow-hidden bg-[#272822]">
      <AceEditor
        ref={editorRef}
        mode={resolvedMode}
        theme="monokai"
        value={code}
        name={`editor-${resolvedMode}`}
        width="100%"
        height="350px"
        fontSize={14}
        setOptions={{
          useWorker: false, // CRITICAL: Next.js + Workers = Broken Highlighting
          showLineNumbers: true,
          tabSize: 4,
          fontFamily: 'var(--font-mono)', // Ensure your CSS font matches
        }}
        onLoad={(editorInstance) => {
          // Force a re-highlight once loaded
          editorInstance.getSession().setMode(`ace/mode/${resolvedMode}`);
        }}
      />
    </div>
  );
}
