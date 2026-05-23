'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as Babel from '@babel/standalone';

import { Editor } from '../components/Editor';
import { createIframeRuntime } from '../lib/modules/runtime';
import { useBaseEditor } from '../useBaseEditor';

export const reactCompiler = (code: string) => {
  return (
    Babel.transform(code, {
      presets: ['react'],
      sourceType: 'module', // 🔥 IMPORTANT
    }).code || ''
  );
};

/* -------------------- PAGE -------------------- */
export function EditorPage2() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const renderId = useRef(0);
  const runtime = useMemo(() => createIframeRuntime(renderId, iframeRef), []);
  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }
    iframeRef.current.onload = () => {
      console.log('[PARENT] iframe loaded');
    };
  }, []);
  const { code, setCode, compiled, editorReady, setEditorReady } = useBaseEditor({
    initialCode: `console.log('shshshs')`,
    runtime,
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <div className="w-1/2 border-r border-white/10">
        <Editor mode={'jsx'} value={code} onChange={setCode} setEditorReady={setEditorReady} />
      </div>

      <div className="w-1/2 bg-on-surface">
        <iframe ref={iframeRef} className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin" />
      </div>
    </div>
  );
}
