'use client';
import { useState, useEffect, useMemo, useRef } from 'react';
import { initialCode } from '../data';
import { Editor } from '../components/Editor';
import { createIframeRuntime, useBaseEditor } from '../useBaseEditor';

import { nextVfs } from '../generated/next-vfs';
import { buildTree } from '../lib/core/editor';
import { useBootOrchestrator } from '../hooks/useBootOrchestrator';

export function EditorPage({ boot, snapshot }) {
  const renderId = useRef(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runtime = useMemo(() => createIframeRuntime(renderId, iframeRef), []);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [vfs, setVfs] = useState<Record<string, string>>({});
  /* ---------------- DERIVED ---------------- */
  const fileCode = activeFile ? (vfs[activeFile] ?? '') : '';
  const editorKey = activeFile ?? 'no-file';
  const { code, setCode, setEditorReady } = useBaseEditor({
    key: editorKey,
    initialCode: fileCode,
    runtime,
  });
  useEffect(() => {
    console.log({ snapshot });
    if (!snapshot) return;

    const files = snapshot.files;

    const entry =
      snapshot.entry ??
      files['/app/page.tsx'] ??
      files['/app/main.tsx'] ??
      Object.keys(files).find((f) => f.includes('page.tsx')) ??
      Object.keys(files).find((f) => f.endsWith('.tsx')) ??
      Object.keys(files)[0];

    console.log('[ENTRY RESOLVED]', entry);

    setVfs(files);
    setActiveFile(entry ?? null);

    if (entry) {
      runtime(files, entry);
    }
  }, [snapshot, runtime]);

  const onChange = (next: string) => {
    if (!activeFile) return;

    setVfs((prev) => {
      const updated = {
        ...prev,
        [activeFile]: next,
      };

      // live runtime update (always full snapshot)
      runtime(updated, snapshot?.entry ?? activeFile);

      return updated;
    });
  };

  /* ---------------- TREE ---------------- */
  const tree = useMemo(() => buildTree(vfs), [vfs]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      {/* SIDEBAR */}
      <div className="w-1/4 border-r border-white/10 overflow-auto p-2">
        {Object.entries(tree).map(([name, node]) => (
          <TreeNode key={name} name={name} node={node} onSelect={(path) => setActiveFile(path)} />
        ))}
      </div>

      {/* EDITOR */}
      <div className="w-3/4 flex border-r border-white/10">
        <Editor mode="jsx" value={code} onChange={onChange} setEditorReady={setEditorReady} />
      </div>

      {/* PREVIEW */}
      <div className="w-1/2 bg-on-surface">
        <iframe ref={iframeRef} className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin" />
      </div>
    </div>
  );
}
function TreeNode({ node, name }: any) {
  const [open, setOpen] = useState(true);

  if (node.type === 'file') {
    return <div className="pl-4 text-sm text-white/80">📄 {name}</div>;
  }

  return (
    <div className="pl-2">
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer text-white font-medium">
        📁 {name}
      </div>

      {open && (
        <div className="pl-4 border-l border-white/10">
          {Object.entries(node.children).map(([childName, childNode]) => (
            <TreeNode key={childName} name={childName} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
}
