import { useEffect, useMemo, useRef, useState } from 'react';
import prettier from 'prettier/standalone';
import babel from 'prettier/plugins/babel';
import estree from 'prettier/plugins/estree';

import * as Babel from '@babel/standalone';
import { injectReact } from './data';

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

  /* ---------------- COMPILATION ---------------- */
  const compiled = useMemo(() => {
    return compiler(code);
  }, [code, compiler]);

  /* ---------------- RUNTIME ---------------- */
  useEffect(() => {
    runtime(compiled);
  }, [compiled, runtime]);

  /* ---------------- SYNC REF ---------------- */
  useEffect(() => {
    latestCode.current = code;
  }, [code]);

  /* ---------------- AUTO FORMAT (ONLY ONE LOOP) ---------------- */
  useEffect(() => {
    console.log({ editorReady, formatter });
    if (!editorReady) return;
    if (!formatter) return;

    if (formatTimer.current) {
      clearTimeout(formatTimer.current);
    }

    formatTimer.current = setTimeout(async () => {
      const prev = latestCode.current;

      const formatted = await formatter(prev);

      if (!formatted || formatted === prev) return;

      console.log('[FORMAT APPLIED]');

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

export function createIframeRuntime(renderId, iframeRef: React.RefObject<HTMLIFrameElement>) {
  const runtime = (compiled: string) => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    renderId.current += 1;
    iframeRef.current!.srcdoc = injectReact(compiled, renderId.current);
  };

  return runtime;
}

// https://prettier.io/docs/api.html
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
