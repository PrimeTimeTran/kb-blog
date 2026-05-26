'use client';

import { useState, useMemo } from 'react';
import { vfsAPI } from '../hooks/useVFS';

interface TreeNode {
  name: string;
  path: string; // Empty if it's a folder
  isFolder: boolean;
  children: Record<string, TreeNode>;
}

interface SidebarProps {
  vfs: vfsAPI;
  files: Record<string, any>;
  activePath: string;
}

// Helper: Converts your flat array of keys into a nested tree structure
function buildTree(paths: string[]): TreeNode {
  const root: TreeNode = { name: 'root', path: '', isFolder: true, children: {} };

  paths.forEach((fullPath) => {
    // Strip the starting "./" and split by folders
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

export function Sidebar({ vfs, files, activePath }: SidebarProps) {
  // Compute tree only when the file keys update
  const fileKeys = useMemo(() => Object.keys(files), [files]);
  const treeRoot = useMemo(() => buildTree(fileKeys), [fileKeys]);

  // Strip top level directories to start rendering right inside "exhibit/slots"
  const displayNodes = Object.values(treeRoot.children);
  return (
    <div className="w-64 h-full bg-surface border-r border-white/10 text-zinc-300 font-mono text-xs flex flex-col select-none shrink-0">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <span className="text-on-surface font-bold uppercase tracking-wider text-[10px]">📁 exhibit / slots</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {displayNodes.map((node) => (
          <FileNode key={node.name} node={node} activePath={activePath} onSelect={vfs.handleFileSelect} depth={0} />
        ))}
      </div>
    </div>
  );
}

interface FileNodeProps {
  node: TreeNode;
  activePath: string;
  onSelect: (path: string) => void;
  depth: number;
}

function FileNode({ node, activePath, onSelect, depth }: FileNodeProps) {
  // Folders are open by default
  const [isOpen, setIsOpen] = useState(true);

  const paddingLeft = `${depth * 12 + 8}px`;
  const isActive = node.path === activePath;

  if (node.isFolder) {
    const sortedChildren = Object.values(node.children).sort((a, b) => {
      // Sort folders first, then files alphabetically
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
          <span className="text-[10px] text-on-surface group-hover:text-zinc-400 transition-transform duration-100 style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}">
            {isOpen ? '▼' : '▶'}
          </span>
          <span className="truncate text-on-surface">
            {node.name.startsWith('@') ? `📂 ${node.name}` : `📁 ${node.name}`}
          </span>
        </button>

        {isOpen && (
          <div className="mt-0.5">
            {sortedChildren.map((child) => (
              <FileNode key={child.name} node={child} activePath={activePath} onSelect={onSelect} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // File rendering
  return (
    <button
      type="button"
      onClick={() => onSelect(node.path)}
      style={{ paddingLeft: `${depth * 12 + 20}px` }}
      className={`w-full text-left py-1 px-2 rounded truncate block transition-colors ${
        isActive ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
      }`}
    >
      📄 {node.name}
    </button>
  );
}
