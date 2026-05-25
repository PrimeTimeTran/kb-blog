'use client';

import dynamic from 'next/dynamic';
import { useTheme } from '@teispace/next-themes';
import { useMemo, useRef, useEffect } from 'react';
import { initAceExtensions } from '@/lib/syntax-registry';

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

export function Editor({
  mode,
  value,
  onChange,
  formatter,
  expanded = false,
  setEditorReady,
  autoHeight = false,
  highlightActiveLine = false,
  showPrintMargin = false,
}: EditorProps) {
  const editorRef = useRef<any>(null);
  const { resolvedTheme } = useTheme();

  const stateRef = useRef({ onChange, value, formatter });
  useEffect(() => {
    stateRef.current = { onChange, value, formatter };
  }, [onChange, value, formatter]);

  useEffect(() => {
    if (editorRef.current?.editor) {
      editorRef.current.editor.resize();
    }
  }, [expanded]);

  const editorTheme = useMemo(() => {
    return resolvedTheme === 'dark' ? 'tomorrow_night' : 'chrome';
  }, [resolvedTheme]);

  const handleFormat = async (editorInstance: any) => {
    const currentFormatter = stateRef.current.formatter;
    if (!currentFormatter) return;

    try {
      const currentCode = editorInstance.getValue();
      const formatted = await currentFormatter(currentCode);

      if (formatted && formatted !== currentCode) {
        editorInstance.session.setValue(formatted);
        stateRef.current.onChange(formatted);
      }
    } catch (err) {
      console.error('[ACE FORMAT ERROR]', err);
    }
  };

  const handleEditorLoad = (editorInstance: any) => {
    if (setEditorReady) setEditorReady(true);

    // =========================================================================
    // IMPROVEMENT: Leverage Ace's Native Command Manager over raw DOM handlers
    // =========================================================================

    // 1. FORMAT HOTKEY: Command/Ctrl + S
    editorInstance.commands.addCommand({
      name: 'formatCode',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
      exec: () => {
        handleFormat(editorInstance);
      },
    });

    // 2. SHORTCUT: Command/Ctrl + X (Enhanced line cut tool)
    editorInstance.commands.addCommand({
      name: 'smartCut',
      bindKey: { win: 'Ctrl-X', mac: 'Command-X' },
      exec: () => {
        cut(editorInstance, stateRef.current.onChange);
      },
    });

    // 3. SHORTCUT: Command/Ctrl + / (Native line toggler code block syntax switcher)
    editorInstance.commands.addCommand({
      name: 'toggleCommentShortcut',
      bindKey: { win: 'Ctrl-/', mac: 'Command-/' },
      exec: () => {
        toggleComment(editorInstance, stateRef.current.onChange);
      },
    });
    // =========================================================================
    // FIX: Override default "Delete Line" and map to Multi-Cursor Select Next Reference
    // =========================================================================
    editorInstance.commands.addCommand({
      name: 'selectNextReferenceCustom',
      bindKey: { win: 'Ctrl-D', mac: 'Command-D' },
      exec: (editor: any) => {
        // Runs Ace's native multi-cursor search highlighter matching the current token selection
        editor.execCommand('selectMoreAfter');
      },
    });

    // Optional companion hotkey: Cmd + U to undo/step back a selection if you highlight too far
    editorInstance.commands.addCommand({
      name: 'selectMoreBeforeCustom',
      bindKey: { win: 'Ctrl-U', mac: 'Command-U' },
      exec: (editor: any) => {
        editor.execCommand('selectMoreBefore');
      },
    });

    // // =========================================================================
    // // ADDED: Fold & Unfold Current Local Scope Block
    // // =========================================================================
    // // 1. FOLD CURRENT BLOCK
    // editorInstance.commands.addCommand({
    //   name: 'foldBlockCustom',
    //   // Mac: Control + Option + [  (Zero browser collisions!)
    //   bindKey: { win: 'Ctrl-Shift-[', mac: 'Ctrl-Option-[' },
    //   exec: (editor: any) => {
    //     editor.execCommand('fold');
    //   },
    // });

    // // 2. UNFOLD CURRENT BLOCK
    // editorInstance.commands.addCommand({
    //   name: 'unfoldBlockCustom',
    //   // Mac: Control + Option + ]
    //   bindKey: { win: 'Ctrl-Shift-]', mac: 'Ctrl-Option-]' },
    //   exec: (editor: any) => {
    //     editor.execCommand('unfold');
    //   },
    // });

    // // 3. FOLD ALL CODES
    // editorInstance.commands.addCommand({
    //   name: 'foldAllBlocksCustom',
    //   // Standard chord: Ctrl + K, then Ctrl + 0
    //   bindKey: { win: 'Ctrl-K Ctrl-0', mac: 'Ctrl-K Ctrl-0' },
    //   exec: (editor: any) => {
    //     editor.execCommand('foldall');
    //   },
    // });

    // // 4. UNFOLD ALL CODES
    // editorInstance.commands.addCommand({
    //   name: 'unfoldAllBlocksCustom',
    //   // Standard chord: Ctrl + K, then Ctrl + J
    //   bindKey: { win: 'Ctrl-K Ctrl-J', mac: 'Ctrl-K Ctrl-J' },
    //   exec: (editor: any) => {
    //     editor.execCommand('unfoldall');
    //   },
    // });
  };

  return (
    <div className="w-full h-full relative group">
      {formatter && (
        <button
          type="button"
          onClick={() => editorRef.current?.editor && handleFormat(editorRef.current.editor)}
          className="absolute top-2 right-4 z-20 px-2 py-1 text-[10px] tracking-wider font-mono bg-zinc-800/80 backdrop-blur text-zinc-400 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-zinc-700 hover:text-zinc-200"
        >
          Format (⌘S)
        </button>
      )}

      <AceEditor
        ref={editorRef}
        name="ace-editor"
        mode={mode}
        theme={editorTheme}
        value={value ?? ''}
        onChange={onChange}
        width="100%"
        height={autoHeight ? 'auto' : '100%'}
        highlightActiveLine={highlightActiveLine}
        showPrintMargin={showPrintMargin}
        setOptions={{
          useWorker: false,
          maxLines: autoHeight ? (expanded ? Infinity : 10) : undefined,
          minLines: autoHeight ? 10 : undefined,
          autoScrollEditorIntoView: autoHeight,
        }}
        onLoad={handleEditorLoad}
        // Run clean format passes immediately when the user finishes and clicks away
        onBlur={() => editorRef.current?.editor && handleFormat(editorRef.current.editor)}
      />
    </div>
  );
}

export interface EditorProps {
  mode: string;
  value: string;
  onChange: (value: string) => void;
  formatter?: (code: string) => Promise<string> | string;
  expanded?: boolean;
  setEditorReady?: (ready: boolean) => void;
  autoHeight?: boolean;
  highlightActiveLine?: boolean;
  showPrintMargin?: boolean;
}

function cut(editor: any, onChange: (val: string) => void) {
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

function toggleComment(editor: any, onChange: (val: string) => void) {
  if (!editor) return;
  editor.toggleCommentLines();
  onChange(editor.getValue());
}
