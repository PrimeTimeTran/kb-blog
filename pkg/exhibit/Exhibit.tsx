'use client';

import { JSX, useCallback, useEffect, useRef, useState } from 'react';

import { ExhibitManifest } from './types';

import { Editor } from './components/Editor';
import { Sidebar } from './components/Sidebar';
import { useEditorLayout } from './hooks/ui/useEditorLayout';
import { useIframeController } from './hooks/useIframeController';

import { useVFS } from './hooks/useVFS';

export default function Exhibit({ manifest }: { manifest: ExhibitManifest }): JSX.Element {
  const shellRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const vfs = useVFS({ iframeRef, manifest });

  useEffect(() => {
    const iframe = iframeRef.current;
    const shellFile = manifest.seeds.files.find((f) => f.path === manifest.seeds.entry);

    if (iframe && shellFile?.content && !shellRef.current) {
      iframe.srcdoc = shellFile.content;
      shellRef.current = true;
    }
  }, [vfs]);

  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [consoleError, setConsoleError] = useState<string | null>(null);

  const handleSuccess = useCallback(() => {
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    setConsoleError(null);
  }, []);

  const handleError = useCallback((payload: any) => {
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

    errorTimeoutRef.current = setTimeout(() => {
      let msg = `❌ Runtime Error\n\n`;

      if (payload.loc) {
        msg += `Line ${payload.loc.line}, Col ${payload.loc.column}\n`;
      }

      msg += `${payload.message}\n\n`;

      setConsoleError(msg + (payload.stack ?? ''));
    }, 700);
  }, []);

  useIframeController(iframeRef, {
    vfs: vfs,
    files: vfs.files,
    activePath: vfs.activePath,
    code: vfs.activeFile?.content ?? '',
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const layout = useEditorLayout();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(consoleError ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div ref={layout.containerRef} className="flex h-screen w-screen overflow-hidden select-none">
      <Sidebar vfs={vfs} files={vfs.files} activePath={vfs.activePath} onSelect={vfs.handleFileSelect} />

      {/* ------------------------------------------------------------------ */}
      {/* EDITOR */}
      {/* ------------------------------------------------------------------ */}
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

      {/* DRAG HANDLE */}
      <div
        {...layout.mainDragProps}
        className="w-1 cursor-col-resize bg-white/10 hover:bg-white/20 border-r border-gray-300 dark:border-gray-600 z-10 transition-colors"
      />

      {/* ------------------------------------------------------------------ */}
      {/* RUNTIME */}
      {/* ------------------------------------------------------------------ */}
      <aside className="flex-1 h-full relative bg-surface">
        <iframe
          ref={iframeRef}
          className={`w-full h-full border-0 bg-surface transition-opacity ${
            layout.isAnyDragging ? 'pointer-events-none opacity-80' : ''
          }`}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />

        {/* ERROR CONSOLE */}
        {consoleError && (
          <div
            {...layout.consoleProps}
            className="absolute bottom-0 left-0 right-0 w-full bg-zinc-950/95 backdrop-blur-lg border-t border-red-500/30 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
          >
            <div
              {...layout.consoleDragProps}
              className="h-2 w-full cursor-row-resize bg-surface border-b border-red-500/20 transition-colors shrink-0"
            />

            <div className="relative flex-1 w-full">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 text-xs px-2 py-1 bg-black/30 hover:bg-black/50 text-white rounded"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>

              <pre className="flex-1 w-full text-red-400 p-5 font-mono text-xs whitespace-pre-wrap overflow-y-auto bg-surface">
                {consoleError}
              </pre>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
