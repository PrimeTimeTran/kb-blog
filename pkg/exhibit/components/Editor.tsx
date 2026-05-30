'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import type { Ace } from 'ace-builds';
import { EditorProps } from '@/pkg/exhibit';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';
import { initAceExtensions } from '@/lib/syntax-registry';
import { useTheme } from '@teispace/next-themes';

export function Editor({
  vfs,
  value,
  mode,
  onChange,
  expanded = false,
  setEditorReady,
  autoHeight = false,
  highlightActiveLine = false,
  showPrintMargin = false,
}: EditorProps) {
  const editorRef = useRef<AceEditorInstance | null>(null);
  const [editorInstance, setEditorInstance] = useState<AceEditorInstance | null>(null);

  const activePath = vfs?.activePath;

  const editorMode = useMemo(() => {
    return activePath ? getEditorMode(activePath) : mode;
  }, [activePath, mode]);

  const formatter = useMemo(() => {
    return activePath ? getFormatter(activePath) : null;
  }, [activePath]);

  const stateRef = useRef({ onChange, value, formatter });

  useEditorHotkeys(editorInstance, stateRef, setEditorReady);

  useEffect(() => {
    stateRef.current = { onChange, value, formatter };
  }, [onChange, value, formatter]);

  // 1. Create the debounced function using useMemo
  const debouncedOnChange = useMemo(() => {
    return debounce((val) => {
      onChange(val);
    }, 500);
  }, [onChange]);

  useEffect(() => {
    if (editorRef.current?.editor) {
      editorRef.current.editor.resize();
    }
  }, [expanded]);

  const { resolvedTheme } = useTheme();
  const editorTheme = useMemo(() => {
    return resolvedTheme === 'dark' ? 'tomorrow_night' : 'chrome';
  }, [resolvedTheme]);

  const handleFormat = async (e) => {
    if (!editorRef.current?.editor) return;
    const editor = editorInstance.current;
    const formatter = stateRef.current.formatter;
    if (!formatter) return;

    try {
      const currentCode = editorRef?.current?.editor.getValue();
      const formatted = await formatter(currentCode);
      if (formatted && formatted !== currentCode) {
        editor?.editor.session.setValue(formatted);
        stateRef.current.onChange(formatted);
        console.log('formatting done');
      }
    } catch (err) {
      console.error('[ACE FORMAT ERROR]', err);
    }
  };

  const isReady = Boolean(vfs?.activeFile || mode);

  if (!isReady) {
    return <div className="p-2 text-xs text-zinc-500">Loading editor...</div>;
  }

  return (
    <div className="w-full h-full relative group overflow-hidden bg-surface">
      <button
        type="button"
        onClick={handleFormat}
        className="absolute top-2 right-4 z-20 px-2 py-1 text-[10px] tracking-wider font-mono backdrop-blur border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 hover:bg-black/50 text-white rounded"
      >
        Format (⌘S)
      </button>

      <AceEditor
        value={value ?? ''}
        key={vfs?.activePath}
        ref={editorRef}
        mode={editorMode}
        theme={editorTheme}
        width="100%"
        height={autoHeight ? 'auto' : '100%'}
        onChange={debouncedOnChange}
        showPrintMargin={showPrintMargin}
        highlightActiveLine={highlightActiveLine}
        onLoad={setEditorInstance}
        // Run clean format passes immediately when the user finishes and clicks away
        onBlur={handleFormat}
        setOptions={{
          useWorker: false,
          maxLines: autoHeight ? (expanded ? Infinity : 10) : undefined,
          minLines: autoHeight ? 10 : undefined,
          autoScrollEditorIntoView: autoHeight,
        }}
      />
    </div>
  );
}

// =========================================================================
// IMPROVEMENT: Leverage Ace's Native Command Manager over raw DOM handlers
// =========================================================================
export const useEditorHotkeys = (
  editorInstance: AceEditorInstance | null,
  stateRef: React.MutableRefObject<any>,
  setEditorReady: undefined | ((ready: boolean) => void),
): void => {
  // 2. Define Hotkeys
  // Ace uses command objects: { name, bindKey, exec }

  useEffect(() => {
    if (setEditorReady) setEditorReady(true);
    const handleFormat = async () => {
      const formatter = stateRef.current.formatter;
      if (!formatter) return;

      try {
        const currentCode = editorInstance.getValue();
        const formatted = await formatter(currentCode);
        if (formatted) {
          editorInstance.session.setValue(formatted);
          stateRef.current.onChange(formatted);
        }
        console.log('formatting done');
      } catch (err) {
        console.error('[ACE FORMAT ERROR]', err);
      }
    };
    if (!editorInstance) return;
    const editor = editorInstance;

    editor.commands.addCommand({
      name: 'formatCode',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
      exec: (ed) => {
        console.log('Saving...');
        handleFormat(editor);
      },
    });

    editor.commands.addCommand({
      name: 'smartCut',
      bindKey: { win: 'Ctrl-X', mac: 'Command-X' },
      exec: () => {
        cut(editor, stateRef.current.onChange);
      },
    });

    editor.commands.addCommand({
      name: 'toggleCommentShortcut',
      bindKey: { win: 'Ctrl-/', mac: 'Command-/' },
      exec: () => {
        toggleComment(editor, stateRef.current.onChange);
      },
    });
    editor.commands.addCommand({
      name: 'selectNextReferenceCustom',
      bindKey: { win: 'Ctrl-D', mac: 'Command-D' },
      exec: (ed) => {
        ed.execCommand('selectMoreAfter');
      },
    });

    // Optional companion hotkey: Cmd + U to undo/step back a selection if you highlight too far
    editor.commands.addCommand({
      name: 'selectMoreBeforeCustom',
      bindKey: { win: 'Ctrl-U', mac: 'Command-U' },
      exec: (ed) => {
        ed.execCommand('selectMoreBefore');
      },
    });
    editor.commands.addCommand({
      name: 'toggleFoldAll',
      bindKey: { win: 'Ctrl-Alt-0', mac: 'Command-Option-0' },
      exec: (ed) => {
        const session = ed.getSession();
        const folds = session.getAllFolds();

        if (folds.length > 0) {
          // If there are any folded regions, unfold everything
          session.unfold(null, true);
        } else {
          // Otherwise, fold all
          session.foldAll();
        }
      },
    });

    editor.commands.addCommand({
      name: 'toggleFoldAtCursor',
      bindKey: { win: 'Ctrl-Alt-9', mac: 'Command-Option-9' },
      exec: (ed) => {
        const session = ed.getSession();
        const row = ed.getCursorPosition().row;

        // toggleFoldWidget automatically handles the logic of
        // collapsing if expanded, and expanding if collapsed.
        session.toggleFoldWidget(row);
      },
    });

    // Cleanup when the editor unmounts
    return () => {
      editor.commands.removeCommand('formatCode');
    };
  }, [editorInstance, setEditorReady]);
};

type AceEditorInstance = {
  editor: Ace.Editor;
  commands: Ace.CommandManager;
};

const AceEditor = dynamic(
  async () => {
    const aceModule = await import('react-ace');
    await initAceExtensions();
    return aceModule.default;
  },
  {
    ssr: false,
    loading: () => <div className="p-4 text-xs font-mono text-zinc-500">Loading code editor...</div>,
  },
);

function cut(editor: Ace.Editor, onChange: (val: string) => void) {
  if (!editor) return;
  const range = editor.getSelectionRange();

  if (range.isEmpty()) {
    const row = range.start.row;
    editor.session.removeFullLines(row, row);
  } else {
    editor.session.remove(range);
  }
  onChange(editor.getValue());
}

function toggleComment(editor: Ace.Editor, onChange: (val: string) => void) {
  if (!editor) return;
  editor.toggleCommentLines();
  onChange(editor.getValue());
}

export function getEditorMode(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'tsx';

    case 'js':
      return 'javascript';
    case 'jsx':
      return 'jsx';

    case 'css':
      return 'css';

    case 'html':
      return 'html';

    case 'json':
      return 'json';

    case 'md':
      return 'markdown';

    default:
      return 'text';
  }
}

export type Formatter = (code: string) => string | Promise<string>;

export function getFormatter(path: string): Formatter {
  const ext = path.split('.').pop()?.toLowerCase();

  switch (ext) {
    // -------------------------------------------------
    // TYPESCRIPT / JAVASCRIPT (use Prettier or fallback)
    // -------------------------------------------------
    case 'ts':
    case 'tsx':
    case 'js':
    case 'jsx':
      return async (code: string) => {
        const prettier = await import('prettier/standalone');
        const parserTS = await import('prettier/parser-typescript');
        const parserBabel = await import('prettier/parser-babel');
        const estree = await import('prettier/plugins/estree');

        return prettier.format(code, {
          parser: ext === 'tsx' || ext === 'ts' ? 'typescript' : 'babel',
          plugins: [parserTS, parserBabel, estree],
        });
      };

    // -------------------------------------------------
    // JSON
    // -------------------------------------------------
    case 'json':
      return (code: string) => {
        try {
          return JSON.stringify(JSON.parse(code), null, 2);
        } catch {
          return code;
        }
      };

    // -------------------------------------------------
    // CSS
    // -------------------------------------------------
    case 'css':
      return async (code: string) => {
        const prettier = await import('prettier/standalone');
        const parserCSS = await import('prettier/parser-postcss');

        return prettier.format(code, {
          parser: 'css',
          plugins: [parserCSS],
        });
      };

    // -------------------------------------------------
    // HTML
    // -------------------------------------------------
    case 'html':
      return async (code: string) => {
        const prettier = await import('prettier/standalone');
        const parserHTML = await import('prettier/parser-html');

        return prettier.format(code, {
          parser: 'html',
          plugins: [parserHTML],
        });
      };

    // -------------------------------------------------
    // MARKDOWN
    // -------------------------------------------------
    case 'md':
      return async (code: string) => {
        const prettier = await import('prettier/standalone');
        const parserMarkdown = await import('prettier/parser-markdown');

        return prettier.format(code, {
          parser: 'markdown',
          plugins: [parserMarkdown],
        });
      };

    // -------------------------------------------------
    // DEFAULT
    // -------------------------------------------------
    default:
      return (code: string) => code;
  }
}
