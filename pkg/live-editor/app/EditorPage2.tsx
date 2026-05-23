'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Editor } from '../components/Editor';
import { createIframeRuntime } from '../useBaseEditor';
import { buildTree } from '../lib/core/editor';
import { useBootOrchestrator } from '../hooks/useBootOrchestrator';

export function EditorPage() {
  const renderId = useRef(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const runtime = useMemo(() => createIframeRuntime(renderId, iframeRef), []);
  const { snapshot } = useBootOrchestrator();
  const [vfs, setVfs] = useState<Record<string, string>>({});
  const [activeFile, setActiveFile] = useState<string | null>(null);
  useEffect(() => {
    if (!snapshot) return;
    setVfs(snapshot.files);
    setActiveFile(snapshot.entry);
    runtime(snapshot.files, snapshot.entry);
  }, [snapshot, runtime]);
  const [code, setCode] = useState('');
  useEffect(() => {
    console.log('[VFS UPDATE]', vfs[activeFile ?? '']);
  }, [vfs, activeFile]);
  useEffect(() => {
    if (!activeFile) return;
    setCode(vfs[activeFile] ?? '');
  }, [activeFile, vfs]);
  useEffect(() => {
    if (!activeFile) return;
    if (!snapshot?.entry) return;
    console.log(iframeRef.current?.contentDocument?.documentElement?.innerHTML);
    runtime(vfs, snapshot.entry);
  }, [vfs, activeFile, snapshot, runtime]);

  setTimeout(() => {
    const iframe = iframeRef.current;
    console.log('[OUTSIDE IFRAME CHECK]', iframe  ?.contentWindow?.__IFRAME_ALIVE__);
    console.log('[SRC DOC SET]', iframe .current?.srcdoc?.slice(0, 100));
  }, 500);
  console.log({ loi: code });

  const tree = useMemo(() => buildTree(vfs), [vfs]);
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      {/* SIDEBAR */}
      <div className="w-1/4 border-r border-white/10 overflow-auto p-2">
        {Object.entries(tree).map(([name, node]) => (
          <TreeNode key={name} name={name} node={node} onSelect={setActiveFile} />
        ))}
      </div>

      {/* EDITOR */}
      <div className="w-1/2 border-r border-white/10">
        <Editor mode="jsx" value={code} onChange={setCode} />
      </div>

      {/* PREVIEW */}
      <div className="w-1/4 bg-black">
        <iframe ref={iframeRef} className="w-full h-full border-0" sandbox="allow-scripts allow-same-origin" />
      </div>
    </div>
  );
}

function TreeNode({ node, name, onSelect }: any) {
  const [open, setOpen] = useState(true);

  if (node.type === 'file') {
    return (
      <div className="pl-4 text-sm text-white/80 cursor-pointer" onClick={() => onSelect(node.path)}>
        📄 {name}
      </div>
    );
  }

  return (
    <div className="pl-2">
      <div onClick={() => setOpen((v: boolean) => !v)} className="cursor-pointer text-white font-medium">
        📁 {name}
      </div>

      {open && (
        <div className="pl-4 border-l border-white/10">
          {Object.entries(node.children).map(([childName, childNode]) => (
            <TreeNode key={childName} name={childName} node={childNode} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
