'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Editor } from '../components/Editor';
import { createIframeRuntime } from '../lib/runtime';

import { useSplitPane } from '../hooks/ui/useSplitPane';
import { useStarterCode } from '../hooks/useStarterCode';
import { useIframeController } from '../hooks/useIframeController';

export function EditorPage2() {
  const renderId = useRef(0);
  const { shell, starterCode } = useStarterCode();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const ready = Boolean(shell && starterCode);
  const { leftWidth, containerRef, startDrag, stopDrag, onDrag } = useSplitPane(600, 200);

  const [code, setCode] = useState<string>('');

  const hydratedRef = useRef(false);

  useEffect(() => {
    if (!starterCode) return;
    if (hydratedRef.current) return;

    setCode(starterCode);
    hydratedRef.current = true;
  }, [starterCode]);
  
  const runtime = useMemo(() => {
    return createIframeRuntime(renderId, iframeRef);
  }, []);

  useEffect(() => {
    if (!iframeRef.current || !shell) return;
    iframeRef.current.srcdoc = shell;
  }, [shell]);

  useIframeController(iframeRef, code);

  if (!ready) {
    return <div className="p-4 text-white">Loading editor...</div>;
  }

  return (
    <div ref={containerRef} className="flex h-screen w-screen overflow-hidden">
      {/* LEFT */}
      <div className="h-full border-r border-white/10 bg-surface" style={{ width: leftWidth }}>
        <Editor mode="jsx" value={code} onChange={setCode} />
      </div>

      {/* HANDLE */}
      <div
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        className="w-1 cursor-col-resize bg-white/10 hover:bg-white/20 border-r border-gray-300 dark:border-gray-600"
      />

      {/* RIGHT (IMPORTANT FIX) */}
      <div className="flex-1 h-full bg-surface">
        <iframe ref={iframeRef} className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin" />
      </div>
    </div>
  );
}
