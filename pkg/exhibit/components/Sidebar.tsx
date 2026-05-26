'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { TreeNode, SidebarProps, FileNodeProps } from '@/pkg/exhibit';

import { ChevronRight } from 'lucide-react';

import { getIconForFile, getIconForFolder } from 'vscode-icons-js';

function FileIcon({ name }: { name: string }) {
  const iconName = getIconForFile(name);
  return <Image src={`/vscode-icons/${iconName}`} width={16} height={16} alt={''} />;
}
function FolderIcon({ name }: { name: string }) {
  const iconName = getIconForFolder(name);
  return <Image src={`/vscode-icons/${iconName}`} width={16} height={16} alt={''} />;
}

export function Sidebar({ vfs }: SidebarProps) {
  const fileKeys = useMemo(() => Object.keys(vfs.files), [vfs.files]);
  const treeRoot = useMemo(() => buildTree(fileKeys), [fileKeys]);

  const displayNodes = Object.values(treeRoot.children);
  return (
    <div className="w-64 h-full bg-surface border-r border-white/10 text-zinc-300 font-mono text-xs flex flex-col select-none shrink-0">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <span className="text-on-surface font-bold uppercase tracking-wider text-[10px]">📁 File Explorer</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {displayNodes.map((node) => (
          <FileNode key={node.name} node={node} activePath={vfs.activePath} onSelect={vfs.handleFileSelect} depth={0} />
        ))}
      </div>
    </div>
  );
}

function buildTree(paths: string[]): TreeNode {
  const root: TreeNode = { name: 'root', path: '', isFolder: true, children: {} };

  paths.forEach((fullPath) => {
    const cleanPath = fullPath.replace(/^\.\//, '');
    const parts = cleanPath.split('/');

    let current = root;
    let accumulatedPath = '.';

    parts.forEach((part, index) => {
      accumulatedPath += `/${part}`;
      const isLast = index === parts.length - 1;

      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          path: isLast ? fullPath : '',
          isFolder: !isLast,
          children: {},
        };
      }
      current = current.children[part];
    });
  });

  return root;
}

function FileNode({ node, activePath, onSelect, depth }: FileNodeProps) {
  const [isOpen, setIsOpen] = useState(true);

  const paddingLeft = `${depth * 12 + 8}px`;
  const isActive = node.path === activePath;

  if (node.isFolder) {
    const sortedChildren = Object.values(node.children).sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });

    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{ paddingLeft }}
          className="w-full text-left py-1 px-2 rounded hover:bg-white/5 flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-colors group"
        >
          <span
            className="transition-transform duration-200"
            style={{
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronRight height={16} width={16} />
          </span>
          <span className="flex flex-row text-on-surface gap-2">
            <FolderIcon name={node.name} />
            {node.name}
          </span>
        </button>

        <div
          className={`
            overflow-hidden
            transition-all
            duration-200
            ease-out
            ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="mt-0.5">
            {sortedChildren.map((child) => (
              <FileNode key={child.name} node={child} activePath={activePath} onSelect={onSelect} depth={depth + 1} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(node.path)}
      style={{ paddingLeft: `${depth * 12 + 20}px` }}
      data-active={isActive}
      className="file-item"
    >
      <FileIcon name={node.name} />
      {node.name}
    </button>
  );
}
