import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Babel from '@babel/standalone';
import prettier from 'prettier/standalone';
import babel from 'prettier/plugins/babel';
import estree from 'prettier/plugins/estree';

function compile(code: string) {
  return Babel.transform(code, {
    presets: ['react'],
  }).code;
}

export function compileUserCode(code: string) {
  try {
    const transformed = Babel.transform(code, {
      presets: ['react'],
      filename: 'repl.jsx',
    }).code;

    return transformed;
  } catch (err) {
    return `
      console.error("Compile error:", ${JSON.stringify(err.message)});
    `;
  }
}

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
  const [committedCode, setCommittedCode] = useState(code);
  const formatTimer = useRef<NodeJS.Timeout | null>(null);
  const compileTimer = useRef<NodeJS.Timeout | null>(null);
  const runtimeTimer = useRef<NodeJS.Timeout | null>(null);

  const runtimeVersion = useRef(0);

  const run = useCallback(
    (value: string) => {
      const compiled = compiler(value);
      runtime(compiled);
    },
    [compiler, runtime],
  );

  // initial render
  useEffect(() => {
    run(initialCode);
  }, []);

  const compiled = useMemo(() => {
    try {
      return compiler(committedCode);
    } catch (err) {
      console.error('[COMPILER ERROR]', err);
      return null;
    }
  }, [committedCode, compiler]);

  // live updates
  useEffect(() => {
    if (!compiled) return;

    runtimeVersion.current += 1;
    const currentVersion = runtimeVersion.current;

    if (runtimeTimer.current) {
      clearTimeout(runtimeTimer.current);
    }

    runtimeTimer.current = setTimeout(() => {
      if (currentVersion !== runtimeVersion.current) return;

      runtime(compiled).catch((err) => {
        console.error('[RUNTIME ERROR]', err);
      });
    }, 0);

    return () => {
      if (runtimeTimer.current) {
        clearTimeout(runtimeTimer.current);
      }
    };
  }, [compiled, runtime]);

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

// export function useBaseEditor({
//   initialCode,
//   compiler = reactCompiler,
//   runtime,
//   formatter = formatCode,
//   autoFormatDelay = 800,
//   runtimeDelay = 250,
// }: {
//   runtime: Runtime;
//   compiler?: Compiler;
//   initialCode: string;
//   formatter?: Formatter;
//   runtimeDelay?: number;
//   autoFormatDelay?: number;
// }) {
//   const [code, setCode] = useState(initialCode);
//   const [committedCode, setCommittedCode] = useState(initialCode);

//   const latestCode = useRef(code);

//   const formatTimer = useRef<NodeJS.Timeout | null>(null);
//   const commitTimer = useRef<NodeJS.Timeout | null>(null);
//   const runtimeTimer = useRef<NodeJS.Timeout | null>(null);

//   const runtimeVersion = useRef(0);

//   // keep latest code reference
//   useEffect(() => {
//     latestCode.current = code;
//   }, [code]);

//   // -----------------------------
//   // COMPILE
//   // -----------------------------
//   const compiled = useMemo(() => {
//     try {
//       return compiler(committedCode);
//     } catch (err) {
//       console.error('[COMPILER ERROR]', err);
//       return null;
//     }
//   }, [committedCode, compiler]);

//   // -----------------------------
//   // RUNTIME (single pipeline)
//   // -----------------------------
//   useEffect(() => {
//     if (!compiled) return;

//     runtimeVersion.current += 1;
//     const version = runtimeVersion.current;

//     if (runtimeTimer.current) {
//       clearTimeout(runtimeTimer.current);
//     }

//     runtimeTimer.current = setTimeout(() => {
//       if (version !== runtimeVersion.current) return;

//       runtime(compiled).catch((err) => {
//         console.error('[RUNTIME ERROR]', err);
//       });
//     }, 0);

//     return () => {
//       if (runtimeTimer.current) {
//         clearTimeout(runtimeTimer.current);
//       }
//     };
//   }, [compiled, runtime]);

//   // -----------------------------
//   // COMMIT (debounced code → compiled input)
//   // -----------------------------
//   useEffect(() => {
//     if (commitTimer.current) {
//       clearTimeout(commitTimer.current);
//     }

//     commitTimer.current = setTimeout(() => {
//       setCommittedCode(code);
//     }, runtimeDelay);

//     return () => {
//       if (commitTimer.current) {
//         clearTimeout(commitTimer.current);
//       }
//     };
//   }, [code, runtimeDelay]);

//   // -----------------------------
//   // FORMAT (optional)
//   // -----------------------------
//   useEffect(() => {
//     if (!formatter) return;

//     if (formatTimer.current) {
//       clearTimeout(formatTimer.current);
//     }

//     formatTimer.current = setTimeout(async () => {
//       try {
//         const prev = latestCode.current;
//         const formatted = await formatter(prev);

//         if (!formatted || formatted === prev) return;

//         setCode(formatted);
//       } catch (err) {
//         console.error('[FORMAT ERROR]', err);
//       }
//     }, autoFormatDelay);

//     return () => {
//       if (formatTimer.current) {
//         clearTimeout(formatTimer.current);
//       }
//     };
//   }, [code, formatter, autoFormatDelay]);

//   return {
//     code,
//     setCode,
//     compiled,
//   };
// }

// export const reactCompiler = (code: string) => {
//   return (
//     Babel.transform(code, {
//       presets: ['react'],
//       sourceType: 'module',
//     }).code || ''
//   );
// };

// export function formatCode(code: string): string {
//   try {
//     return prettier.format(code, {
//       parser: 'babel',
//       plugins: [babel, estree],
//       semi: false,
//       singleQuote: true,
//     });
//   } catch {
//     return code;
//   }
// }
