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

import { createRuntime } from './lib/modules/runtime';

export function createIframeRuntime(renderId, iframeRef) {
  const runtime = createRuntime();

  return (vfs, entry) => {
    renderId.current += 1;

    runtime.init(vfs);

    const App = runtime.run(entry);

    iframeRef.current!.srcdoc = injectReact(App, renderId.current);
  };
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
