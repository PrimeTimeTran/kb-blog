import { useEffect, useMemo, useRef, useState } from 'react';
import * as Babel from '@babel/standalone';
import prettier from 'prettier/standalone';
import babel from 'prettier/plugins/babel';
import estree from 'prettier/plugins/estree';

import { injectReact } from '../HolySpirit';
import { createRuntime } from '../lib/runtime';

export function useBaseEditor({
  initialCode,
  compiler = reactCompiler,
  runtime,
  formatter = formatCode,
  autoFormatDelay = 800,
  runtimeDelay = 250,
  iframeOptions,
}: {
  runtime: Runtime;
  compiler?: Compiler;
  initialCode: string;
  formatter?: Formatter;
  runtimeDelay?: number;
  autoFormatDelay?: number;
  iframeOptions?: object;
}) {
  const [code, setCode] = useState(initialCode);
  const [editorReady, setEditorReady] = useState(false);
  const latestCode = useRef(code);
  const [committedCode, setCommittedCode] = useState(initialCode);

  const formatTimer = useRef<NodeJS.Timeout | null>(null);
  const compileTimer = useRef<NodeJS.Timeout | null>(null);
  const runtimeTimer = useRef<NodeJS.Timeout | null>(null);

  const runtimeVersion = useRef(0);

  useEffect(() => {
    setCode(initialCode);
    setCommittedCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    latestCode.current = code;
  }, [code]);

  useEffect(() => {
    if (!editorReady) return;

    if (compileTimer.current) {
      clearTimeout(compileTimer.current);
    }

    compileTimer.current = setTimeout(() => {
      setCommittedCode(code);
    }, runtimeDelay);

    return () => {
      if (compileTimer.current) {
        clearTimeout(compileTimer.current);
      }
    };
  }, [code, editorReady, runtimeDelay]);

  const compiled = useMemo(() => {
    if (!editorReady) return null;

    try {
      return compiler(committedCode);
    } catch (err) {
      console.error('[COMPILER ERROR]', err);
      return null;
    }
  }, [committedCode, compiler, editorReady]);

  useEffect(() => {
    if (!editorReady) return;
    if (!compiled) return;

    runtimeVersion.current += 1;

    const currentVersion = runtimeVersion.current;

    if (runtimeTimer.current) {
      clearTimeout(runtimeTimer.current);
    }

    runtimeTimer.current = setTimeout(async () => {
      if (currentVersion !== runtimeVersion.current) {
        return;
      }

      try {
        await runtime(compiled);
      } catch (err) {
        console.error('[RUNTIME ERROR]', err);
      }
    }, 0);

    return () => {
      if (runtimeTimer.current) {
        clearTimeout(runtimeTimer.current);
      }
    };
  }, [compiled, runtime, editorReady]);

  useEffect(() => {
    if (!editorReady) return;
    if (!formatter) return;

    if (formatTimer.current) {
      clearTimeout(formatTimer.current);
    }

    formatTimer.current = setTimeout(async () => {
      try {
        const prev = latestCode.current;

        const formatted = await formatter(prev);

        if (!formatted || formatted === prev) return;

        setCode(formatted);
        setCommittedCode(formatted);
      } catch (err) {
        console.error('[FORMAT ERROR]', err);
      }
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
export const reactCompiler = (code: string) => {
  return (
    Babel.transform(code, {
      presets: ['react'],
      sourceType: 'module',
    }).code || ''
  );
};
export function createIframeRuntime(renderId, iframeRef) {
  const runtime = createRuntime();

  return (vfs, entry) => {
    renderId.current += 1;

    runtime.init(vfs);

    const App = runtime.run(entry);

    iframeRef.current!.srcdoc = injectReact(App, renderId.current);
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
