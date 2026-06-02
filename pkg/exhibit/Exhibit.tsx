'use client';

import { Editor, Previewer, SidebarTree } from '@/pkg/exhibit/components';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';
import { useEditorLayout, useIframeController, useVFS } from '@/pkg/exhibit/hooks';

import { ExhibitLayout } from '@/layouts/ExhibitLayout';
import { ExhibitManifest } from '@/lib/types';
import { SearchParams } from 'next/dist/server/request/search-params';

export default function Exhibit({ manifest }: { manifest: ExhibitManifest; params: SearchParams }): JSX.Element {
  console.log({ manifest });
  const shellRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const vfs = useVFS({ iframeRef, manifest });
  useEffect(() => {
    const iframe = iframeRef.current;
    const shellFile = (manifest.seeds.filesFlat ?? [])?.find((f) => f.path === manifest.seeds.entry);

    if (iframe && shellFile?.content && !shellRef.current) {
      iframe.srcdoc = shellFile.content;
      shellRef.current = true;
    }
  }, [manifest.seeds?.entry, manifest.seeds?.filesFlat, vfs.files]);

  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [consoleError, setConsoleError] = useState<string | null>(null);

  const handleSuccess = useCallback(() => {
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    setConsoleError(null);
  }, []);

  const clearError = () => setConsoleError(null);

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
    clearError: clearError,
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

  const [previewType, setPreviewType] = useState(manifest.projectType == 'next' ? 'react' : 'vanilla');

  return (
    <ExhibitLayout
      manifest={manifest}
      isPreview={manifest.isPreview}
      left={<SidebarTree data={manifest.tree} activePath={vfs.activePath} onSelect={vfs.handleFileSelect} />}
      right={
        <aside className="h-full w-full relative bg-surface">
          <div className="absolute inset-0 overflow-y-auto">
            {previewType == 'vanilla' && (
              <Previewer
                manifest={manifest}
                vfs={vfs}
                codeState={vfs?.activeFile?.content}
                className={`w-full h-full border-0 bg-surface transition-opacity ${
                  layout.isAnyDragging ? 'pointer-events-none opacity-80' : ''
                }`}
              />
            )}
            {previewType == 'react' && (
              <iframe
                ref={iframeRef}
                className={`w-full h-full border-0 bg-surface transition-opacity ${
                  layout.isAnyDragging ? 'pointer-events-none opacity-80' : ''
                }`}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            )}

            <div className={`grid-transition ${consoleError ? 'is-open opacity-100' : 'opacity-0'} w-full`}>
              <div className="overflow-hidden group">
                <div
                  {...layout.consoleProps}
                  className={`
                    absolute bottom-0 left-0 right-0 w-full z-50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out
                    bg-zinc-950/95 backdrop-blur-lg border-t border-red-500/30
                    ${consoleError ? 'max-h-125 opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}
                  `}
                >
                  <div {...layout.consoleDragProps} className="h-2 w-full cursor-row-resize bg-surface shrink-0" />

                  <div className="relative flex-1 w-full">
                    <button onClick={handleCopy} className="hover-button">
                      {copied ? 'Copied' : 'Copy'}
                    </button>

                    <pre className="flex-1 h-full w-full text-red-400 px-2 font-mono text-xs whitespace-pre-wrap overflow-y-auto bg-surface">
                      {consoleError}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      }
    >
      <main className="h-full w-full relative overflow-hidden border-white/10 bg-surface">
        {vfs.activeFile ? (
          <Editor vfs={vfs} value={vfs.activeFile.content} onChange={vfs.updateActiveFileContent} />
        ) : (
          <div className="flex items-center justify-center h-full text-zinc-500 font-mono text-xs">
            Select a file to begin editing
          </div>
        )}
      </main>
    </ExhibitLayout>
  );
}
