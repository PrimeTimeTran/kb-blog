'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as Babel from '@babel/standalone';

import { Editor } from '../components/Editor';
import { useBaseEditor } from '../hooks/useBaseEditor';
import { createIframeRuntime } from '../lib/runtime';

import { initialCode } from '../HolySpirit';

export const reactCompiler = (code: string) => {
  return (
    Babel.transform(code, {
      presets: ['react'],
      sourceType: 'module',
    }).code || ''
  );
};

/* -------------------- PAGE -------------------- */
export function EditorPage2() {
  const renderId = useRef(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // will probably need to send more than 2 values to the Iframe long term.
  // Good usecase for a object that we memoize?
  // const iframeOptions = useRef({ spam: 'foo', ham: 'bar' });
  // iframeOptions,
  const runtime = useMemo(() => createIframeRuntime(renderId, iframeRef), []);

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }
    iframeRef.current.onload = () => {
      console.log('[PARENT] iframe loaded');
    };
  }, []);

  const { code, setCode, setEditorReady } = useBaseEditor({
    initialCode: initialCode,
    runtime,
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-1/2 border-r border-white/10 bg-surface h-full">
        <Editor
          mode="jsx"
          value={code}
          onChange={setCode}
          setEditorReady={setEditorReady}
          // autoHeight={false} <- Default behavior fills up layout frames
        />
      </div>

      <div className="w-1/2 bg-surface">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0 bg-surface"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
