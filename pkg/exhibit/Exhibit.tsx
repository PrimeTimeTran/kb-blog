'use client';

import { SearchParams } from 'next/dist/server/request/search-params';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';

import { Editor, Sidebar } from '@/pkg/exhibit/components';
import { ExhibitManifest } from '@/pkg/exhibit/types';
import { useVFS, useEditorLayout, useIframeController } from '@/pkg/exhibit/hooks';

export default function Exhibit({ manifest }: { manifest: ExhibitManifest; params: SearchParams }): JSX.Element {
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
    <div ref={layout.containerRef} className="flex h-screen w-screen overflow-hidden select-none">
      <Sidebar vfs={vfs} />

      {/* ------------------------------------------------------------------ */}
      {/* EDITOR */}
      {/* ------------------------------------------------------------------ */}
      <aside className="h-full border-r border-white/10 bg-surface" {...layout.editorProps}>
        {vfs.activeFile ? (
          <Editor vfs={vfs} value={vfs.activeFile.content} onChange={vfs.updateActiveFileContent} />
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
        {previewType == 'vanilla' && (
          <Preview
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

        {/* ERROR CONSOLE */}
        {consoleError && (
          <div
            {...layout.consoleProps}
            className="absolute bottom-0 left-0 right-0 w-full bg-zinc-950/95 backdrop-blur-lg border-t border-red-500/30 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 group"
          >
            <div {...layout.consoleDragProps} className="h-2 w-full cursor-row-resize bg-surface shrink-0" />

            <div className="relative flex-1 w-full">
              <button
                onClick={handleCopy}
                className="absolute top-2 right-2 text-xs px-2 py-1 bg-black/30 hover:bg-black/50 text-white rounded opacity-0 group-hover:opacity-100"
              >
                {copied ? 'Copied' : 'Copy'}
              </button>

              <pre className="flex-1 h-full w-full text-red-400 px-2 font-mono text-xs whitespace-pre-wrap overflow-y-auto bg-surface">
                {consoleError}
              </pre>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

const Preview = ({ className, codeState, vfs }) => {
  const [blobUrl, setBlobUrl] = useState('');

  useEffect(() => {
    if (!codeState) return;

    let processedHtml = codeState;

    // Helper: Normalize path and fetch from VFS
    const getFileContent = (path) => {
      const cleanPath = path.replace(/^\.\//, '');
      const vfsKey = `./react/${cleanPath}`;

      const content = vfs.files[vfsKey]?.content;
      if (!content) {
        console.warn(`[Preview] VFS lookup failed for: ${vfsKey}. Available keys:`, Object.keys(vfs.files));
      }
      return content;
    };

    processedHtml = processedHtml.replace(/<link[^>]*href=["'](.*?)["'][^>]*>/gi, (match, path) => {
      const content = getFileContent(path);
      return content ? `<style>${content}</style>` : match;
    });
    processedHtml = processedHtml.replace(
      /<script[^>]*src=["'](.*?)["'][^>]*>([\s\S]*?<\/script>|)/gi,
      (match, path) => {
        const content = getFileContent(path);

        if (content) {
          console.log(`[Preview] Successfully injected: ${path}`);
          return `<script>${content}</script>`;
        }

        console.warn(`[Preview] Could not find content for: ${path}`);
        return match; // Keep the original if content is missing
      },
    );

    // 3. Create the Blob
    const blob = new Blob([processedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [codeState, vfs]);

  return <iframe className={className} src={blobUrl} />;
};

// react-markdown
// remark-gfm
// react-json-view
// const Preview = ({ className, fileType, content, vfs }) => {
//   switch (fileType) {
//     case 'html':
//       return <HtmlPreview html={content} vfs={vfs} className={className} />;
//     case 'md':
//       return <MarkdownPreview source={content} className={className} />;
//     case 'json':
//       return <JsonPreview data={content} className={className} />;
//     case 'css':
//       return <CssPreview css={content} className={className} />;
//     default:
//       return <div className={className}>Preview not available for {fileType}</div>;
//   }
// };
