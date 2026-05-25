export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 1. Await the slug and searchParams
  const { slug } = await params;

  return <Exhibit slug={slug} />;
}

import { JSX, useEffect, useRef, useState } from 'react';

import { Editor } from './components/Editor';
import { Sidebar } from './components/Sidebar';

import { useVFS, vfsAPI } from './hooks/useVFS';
import { useStarterCode } from './hooks/useStarterCode';
import { useEditorLayout } from './hooks/ui/useEditorLayout';
import { useIframeController } from './hooks/useIframeController';

interface EditorProps {
  slug: string;
  initialFiles: any;
  entryPoint: string;
}

export function Exhibit({ slug, entryPoint, initialFiles }: EditorProps): JSX.Element {
  const { shell } = useStarterCode(slug, entryPoint);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const vfs: vfsAPI = useVFS({
    entryPoint,
    slug: slug.join('/'),
    initialFiles,
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [consoleError, setConsoleError] = useState<string | null>(null);
  const layout = useEditorLayout();

  useEffect(() => {
    if (!iframeRef.current || !shell) return;
    iframeRef.current.srcdoc = shell;
  }, [shell]);

  useIframeController(iframeRef, {
    vfs,
    files: vfs.files,
    code: vfs.activeFile?.content ?? '',
    onSuccess: () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      setConsoleError(null);
    },
    onError: (payload) => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

      errorTimeoutRef.current = setTimeout(() => {
        let msg = `❌ Runtime Compilation Error\n\n`;
        if (payload.loc) msg += `Line ${payload.loc.line}, Col ${payload.loc.column}\n`;
        msg += `${payload.message}\n\n`;
        console.log('Parent');
        setConsoleError(msg + '\n' + payload.stack);
      }, 700);
    },
  });

  if (!shell) return <div className="p-4 text-white">Loading runtime container...</div>;

  return (
    <div ref={layout.containerRef} className="flex h-screen w-screen overflow-hidden select-none">
      <Sidebar vfs={vfs} files={vfs.files} activePath={vfs.activePath} />

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

      <div
        {...layout.mainDragProps}
        className="w-1 cursor-col-resize bg-white/10 hover:bg-white/20 border-r border-gray-300 dark:border-gray-600 z-10 transition-colors"
      />

      <aside className="flex-1 h-full relative bg-surface">
        <iframe
          ref={iframeRef}
          className={`w-full h-full border-0 transition-opacity ${layout.isAnyDragging ? 'pointer-events-none opacity-80' : ''}`}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />

        {consoleError && (
          <div
            {...layout.consoleProps}
            className="absolute bottom-0 left-0 right-0 w-full bg-zinc-950/95 backdrop-blur-lg border-t border-red-500/30 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
          >
            <div
              {...layout.consoleDragProps}
              className="h-2 w-full cursor-row-resize bg-surface border-b border-red-500/20 transition-colors shrink-0"
            />
            <pre className="flex-1 w-full text-red-400 p-5 font-mono text-xs whitespace-pre-wrap overflow-y-auto bg-surface">
              {consoleError}
            </pre>
          </div>
        )}
      </aside>
    </div>
  );
}
