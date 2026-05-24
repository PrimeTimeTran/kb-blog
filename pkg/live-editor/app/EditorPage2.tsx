'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Editor } from '../components/Editor';
import { Sidebar } from '../components/Sidebar'; // Renamed cleanly

import { useEditorLayout } from '../hooks/ui/useEditorLayout';
import { useVFS } from '../hooks/useVFS';
import { useIframeController } from '../hooks/useIframeController';
import { useStarterCode } from '../hooks/useStarterCode';

interface EditorPage2Props {
  initialFiles: any;
}

export function EditorPage2({ slug, entryPoint, initialFiles }: EditorPage2Props) {
  const { shell } = useStarterCode(slug, entryPoint);
  const vfs = useVFS({
    entryPoint,
    slug: slug.join('/'),
    initialFiles,
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [consoleError, setConsoleError] = useState<string | null>(null);
  const layout = useEditorLayout();

  // 2. Synchronize iframe srcdoc template on initialization
  useEffect(() => {
    if (!iframeRef.current || !shell) return;
    iframeRef.current.srcdoc = shell;
  }, [shell]);

  // 3. Keep the compiler fed with the full file system array and tracking context
  useIframeController(iframeRef, {
    vfs,
    files: vfs.files, // When this changes, the hook broadcasts to the iframe
    code: vfs.activeFile?.content ?? '',
    onSuccess: () => setConsoleError(null),
    onError: (payload) => {
      let msg = `❌ Runtime Compilation Error\n\n`;
      if (payload.loc) msg += `Line ${payload.loc.line}, Col ${payload.loc.column}\n`;
      msg += `${payload.message}\n\n`;
      if (payload.stack) msg += `Stack Trace:\n${payload.stack.split('\n').slice(0, 6).join('\n')}`;
      setConsoleError(msg);
    },
  });

  if (!shell) return <div className="p-4 text-white">Loading runtime container...</div>;

  return (
    <div ref={layout.containerRef} className="flex h-screen w-screen overflow-hidden select-none">
      {/* SIDEBAR: Ready to receive feature tabs (File tree, Search, Settings) */}
      <Sidebar vfs={vfs} files={vfs.files} activePath={vfs.activePath} onSelectFile={vfs.setActivePath} />

      {/* EDITOR PANEL */}
      <aside className="h-full border-r border-white/10 bg-surface" {...layout.editorProps}>
        {vfs.activeFile ? (
          <Editor
            mode={vfs.activeFile.language}
            value={vfs.activeFile.content}
            onChange={vfs.updateActiveFileContent}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 font-mono text-xs">
            Select a file to begin editing
          </div>
        )}
      </aside>

      {/* SPLIT HANDLE BAR */}
      <div
        {...layout.mainDragProps}
        className="w-1 cursor-col-resize bg-white/10 hover:bg-white/20 border-r border-gray-300 dark:border-gray-600 z-10 transition-colors"
      />

      {/* PREVIEW RENDERING HUB */}
      <aside className="flex-1 h-full relative bg-surface">
        <iframe
          ref={iframeRef}
          className={`w-full h-full border-0 transition-opacity ${layout.isAnyDragging ? 'pointer-events-none opacity-80' : ''}`}
          sandbox="allow-scripts allow-same-origin"
        />

        {/* BOTTOM DRAWER CONSOLE ERROR LOGS */}
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
