'use client';

import { getIconForFile, getIconForFolder } from 'vscode-icons-js';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { TreeItemProps } from '@/pkg/exhibit';
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

type IconResolver = (name: string) => string | undefined;

type IconProps = {
  name: string;
  resolve: IconResolver;
};

function TreeIcon(props: IconProps) {
  const iconName = props.resolve(props.name || '');

  return (
    <Image
      src={`/vscode-icons/${iconName}`}
      width={16}
      height={16}
      alt=""
      style={{ width: 16, height: 16, objectFit: 'contain' }}
    />
  );
}
