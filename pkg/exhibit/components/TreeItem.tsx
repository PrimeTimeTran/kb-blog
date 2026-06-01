'use client';

import { getIconForFile, getIconForFolder } from 'vscode-icons-js';

import { ChevronRight } from 'lucide-react';
import { TreeItemProps } from '@/lib/types';
import { useState } from 'react';

export function TreeItem({ node, activePath, onSelect, depth }: TreeItemProps) {
  const [isOpen, setIsOpen] = useState(true);

  const paddingLeft = `${depth * 12 + 8}px`;
  const isActiveNode = node.path === activePath;

  if (node.kind === 'folder') {
    const sortedChildren = (node.children ?? []).sort((a, b) => {
      if (a.kind === 'folder' && b.kind !== 'folder') return -1;
      if (a.kind !== 'folder' && b.kind === 'folder') return 1;
      return a.name.localeCompare(b.name);
    });

    return (
      <div className="border-0">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{ paddingLeft }}
          className="w-full text-left py-1 px-2 rounded flex items-center gap-1.5 text-zinc-400 hover:bg-level transition-colors group"
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
            <TreeIcon name={node.name} resolve={getIconForFolder} />
            {node.name}
          </span>
        </button>

        <div
          className={`
            overflow-hidden
            transition-all
            duration-200
            ease-out
            ${isOpen ? 'max-h-250 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="mt-0.5">
            {sortedChildren.map((child) => (
              <TreeItem
                key={child.path}
                node={child}
                activePath={activePath}
                onSelect={onSelect}
                depth={depth + 1}
                children={[]}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => node.kind === 'file' && onSelect(node.path)}
      style={{ paddingLeft: `${depth * 12 + 20}px` }}
      data-active={isActiveNode}
      className="tree-item"
    >
      <TreeIcon name={node.name} resolve={getIconForFile} />
      {node.name}
    </button>
  );
}

interface IconProps {
  name?: string;
  resolve: (name: string) => string;
}

function TreeIcon(props: IconProps) {
  const iconName = props.resolve(props.name || '').replace('.svg', '');
  return (
    <svg width={16} height={16} style={{ display: 'inline-block' }}>
      <use href={`/vscode-sprite.svg#${iconName}`} />
    </svg>
  );
}
