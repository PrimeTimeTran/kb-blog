'use client';

import { useEffect, useRef, useState } from 'react';

import { Editor } from '../components/Editor';
// Leave until you figure out how to properly inject the code from the VFS
// import { createIframeRuntime } from '../lib/runtime';

import { useEditorLayout } from '../hooks/ui/useSplitPane';
import { useStarterCode } from '../hooks/useStarterCode';
import { useIframeController } from '../hooks/useIframeController';

export function EditorPage2() {
  const { shell, starterCode } = useStarterCode();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState<string>('');
  const [consoleError, setConsoleError] = useState<string | null>(null);

  const layout = useEditorLayout();

  useEffect(() => {
    if (starterCode && !code) setCode(starterCode);
  }, [starterCode, code]);

  useEffect(() => {
    if (!iframeRef.current || !shell) return;
    iframeRef.current.srcdoc = shell;
  }, [shell]);

  useIframeController(iframeRef, {
    code,
    onSuccess: () => setConsoleError(null),
    onError: (payload) => {
      let msg = `❌ Runtime Compilation Error\n\n`;
      if (payload.loc) msg += `Line ${payload.loc.line}, Col ${payload.loc.column}\n`;
      msg += `${payload.message}\n\n`;
      if (payload.stack) msg += `Stack Trace:\n${payload.stack.split('\n').slice(0, 6).join('\n')}`;
      setConsoleError(msg);
    },
  });

  if (!shell || !starterCode) return <div className="p-4 text-white">Loading editor...</div>;

  return (
    <div ref={layout.containerRef} className="flex h-screen w-screen overflow-hidden select-none">
      <aside className="h-full border-r border-white/10 bg-surface" {...layout.editorProps}>
        <Editor mode="jsx" value={code} onChange={setCode} />
      </aside>

      <div
        {...layout.mainDragProps}
        className="w-1 cursor-col-resize bg-white/10 hover:bg-white/20 border-r border-gray-300 dark:border-gray-600 z-10 transition-colors"
      />

      <aside className="flex-1 h-full relative bg-surface">
        <iframe
          ref={iframeRef}
          className={`w-full h-full border-0 transition-opacity ${layout.isAnyDragging ? 'pointer-events-none opacity-80' : ''}`}
          sandbox="allow-scripts allow-same-origin"
        />

        {consoleError && (
          <div
            {...layout.consoleProps}
            className="absolute bottom-0 left-0 right-0 w-full bg-zinc-950/95 backdrop-blur-lg border-t border-red-500/30 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
          >
            <div
              {...layout.consoleDragProps}
              className="h-2 w-full cursor-row-resize bg-red-500/10 hover:bg-red-500/30 border-b border-red-500/20 transition-colors shrink-0"
            />
            <pre className="flex-1 w-full text-red-400 p-5 font-mono text-xs whitespace-pre-wrap overflow-y-auto">
              {consoleError}
            </pre>
          </div>
        )}
      </aside>
    </div>
  );
}
