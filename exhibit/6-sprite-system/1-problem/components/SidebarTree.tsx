import { SidebarTreeType, TreeViewOptions, VFSNode } from '@/lib/types';
import { useEffect, useMemo, useRef } from 'react';

import { TreeItem } from './TreeItem';
import { useRouter } from 'next/navigation';

const scrollMap = new Map<string, number>();

export function SidebarTree({ data, activePath, onSelect }: SidebarTreeType) {
  const visibleTree = useMemo(() => {
    return data
      .map((node: any) =>
        applyTreeView({
          node,
          opts: {
            hideFiles: false,
            sort: (a, b) => {
              if (a.kind !== b.kind) return a.kind === 'folder' ? -1 : 1;
              return a.name.localeCompare(b.name);
            },
          },
        }),
      )
      .filter(Boolean);
  }, [data]);

  const scrollRef = usePersistedScroll('kb-sidebar-scroll');

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto sidebar-tree">
      {visibleTree.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          activePath={activePath}
          onSelect={onSelect}
          children={node.children}
          depth={0}
        />
      ))}
    </div>
  );
}

export function buildTreeFromVFS(vfs: any): VFSNode[] {
  const root: Record<string, any> = {};

  for (const fullPath of Object.keys(vfs.files)) {
    const cleanPath = fullPath.replace(/^\.\//, '');
    const parts = cleanPath.split('/');

    let cursor = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      const nodePath = `./${parts.slice(0, i + 1).join('/')}`;

      if (!cursor[part]) {
        cursor[part] = {
          id: nodePath,
          name: part,
          path: nodePath,
          kind: isFile ? 'file' : 'folder',
          children: {},
        };
      } else {
        // ensure folder stays folder if deeper structure appears later
        if (!isFile) cursor[part].kind = 'folder';
      }

      cursor = cursor[part].children;
    }
  }

  function toArray(map: Record<string, any>): VFSNode[] {
    return Object.values(map)
      .map((node: any) => ({
        ...node,
        children: node.children ? toArray(node.children) : [],
      }))
      .sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === 'folder' ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }

  return toArray(root);
}

export function useTreeNavigation() {
  const router = useRouter();

  const onSelect = (path: string) => {
    if (!path) return;

    const cleanPath = toRoutePath(path);

    router.push(cleanPath, undefined, { scroll: false });
  };
  return { onSelect };
}

export function usePersistedScroll(key: string) {
  const ref = useRef<HTMLDivElement | null>(null);

  // restore
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const saved = scrollMap.get(key);
    if (saved != null) {
      el.scrollTop = saved;
    }
  }, [key]);

  // save
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      scrollMap.set(key, el.scrollTop);
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [key]);

  return ref;
}

export function applyTreeView({ node, opts }: { node: VFSNode; opts: TreeViewOptions }): any {
  if (!node) return null;

  if (opts.filter && !opts.filter(node)) return null;

  if (opts.hideFiles && node.kind === 'file') return null;
  if (opts.hideFolders && node.kind === 'folder') return null;

  const children = (node.children ?? [])
    .map((node) => applyTreeView({ node, opts }))
    .filter(Boolean)
    .sort(opts.sort ?? defaultTreeSort);

  return {
    ...node,
    children,
  };
}

function defaultTreeSort(a: { kind: string; name: string }, b: { kind: any; name: any }) {
  if (a.kind !== b.kind) {
    return a.kind === 'folder' ? -1 : 1;
  }
  return a.name.localeCompare(b.name);
}

function toRoutePath(path: string) {
  return '/kb' + '/' + path.replace(/^\.\//, '').replace(/^\/+/, '').replace(/\/+/g, '/');
}
