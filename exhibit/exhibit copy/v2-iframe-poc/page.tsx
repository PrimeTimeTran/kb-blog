'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as Babel from '@babel/standalone';
import { injectReact } from './templates/initialize';

export default function Exhibit() {
  const renderId = useRef(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const runtime = useMemo(() => createIframeRuntime(renderId, iframeRef), []);
  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }
    iframeRef.current.onload = () => {
      console.log('[PARENT] iframe loaded');
    };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden select-none">
      <aside className="h-full border-r border-white/10 bg-surface"></aside>
      <div className="w-1 cursor-col-resize bg-white/10 hover:bg-white/20 border-r border-gray-300 dark:border-gray-600 z-10 transition-colors" />
      <aside className="flex-1 h-full relative bg-surface">
        <iframe
          ref={iframeRef}
          className={`w-full h-full border-0 transition-opacity `}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </aside>
    </div>
  );
}
function createIframeRuntime(renderId, iframeRef: React.RefObject<HTMLIFrameElement>) {
  const runtime = (compiled: string) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    renderId.current += 1;
    iframeRef.current!.srcdoc = injectReact(compiled, renderId.current);
  };

  return runtime;
}
export const reactCompiler = (code: string) => {
  return (
    Babel.transform(code, {
      presets: ['react'],
      sourceType: 'module', // 🔥 IMPORTANT
    }).code || ''
  );
};
export function useBaseEditor({
  initialCode,
  compiler = reactCompiler,
  runtime,
  formatter = formatCode,
  autoFormatDelay = 800,
}: {
  initialCode: string;
  runtime: Runtime;
  formatter?: Formatter;
  compiler?: Compiler;
  autoFormatDelay?: number;
}) {
  const [code, setCode] = useState(initialCode);
  const [editorReady, setEditorReady] = useState(false);

  const latestCode = useRef(code);
  const formatTimer = useRef<NodeJS.Timeout | null>(null);

  /* ---------------- SYNC FROM OUTSIDE ---------------- */
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    latestCode.current = code;
  }, [code]);

  /* ---------------- COMPILER (GATED) ---------------- */
  const compiled = useMemo(() => {
    if (!editorReady) return null;
    return compiler(code);
  }, [code, compiler, editorReady]);

  /* ---------------- RUNTIME (GATED) ---------------- */
  useEffect(() => {
    if (!editorReady) return;
    if (!compiled) return;

    runtime(compiled);
  }, [compiled, runtime, editorReady]);

  /* ---------------- FORMATTER (GATED) ---------------- */
  useEffect(() => {
    if (!editorReady) return;
    if (!formatter) return;

    if (formatTimer.current) {
      clearTimeout(formatTimer.current);
    }

    formatTimer.current = setTimeout(async () => {
      const prev = latestCode.current;

      const formatted = await formatter(prev);

      if (!formatted || formatted === prev) return;

      setCode(formatted);
    }, autoFormatDelay);

    return () => {
      if (formatTimer.current) {
        clearTimeout(formatTimer.current);
      }
    };
  }, [code, editorReady, formatter, autoFormatDelay]);

  return {
    code,
    setCode,
    compiled,
    editorReady,
    setEditorReady,
  };
}
export function formatCode(code: string): string {
  try {
    return prettier.format(code, {
      parser: 'babel',
      plugins: [babel, estree],
      semi: false,
      singleQuote: true,
    });
  } catch {
    return code;
  }
}
