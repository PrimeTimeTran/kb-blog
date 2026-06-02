import { SidebarTreeProps, TreeNode, TreeViewOptions } from '@/lib/types';
import { useEffect, useMemo, useRef } from 'react';

import { TreeItem } from './TreeItem';
import { useRouter } from 'next/navigation';

const scrollMap = new Map<string, number>();

export function SidebarTree({ data, activePath, onSelect }: SidebarTreeProps) {
  const visibleTree = useMemo(() => {
    return (data ?? [])
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
  console.log({ activePath });
  return (
    <div ref={scrollRef} className="h-full overflow-y-auto sidebar-tree bg-lowest border-0">
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

export function useTreeNavigation() {
  const router = useRouter();

  const onSelect = (node: TreeNode) => {
    console.log(node.kind);
    console.log(node.path);
    if (node.kind !== 'file') return;

    const cleanPath = toRoutePath(node.path).replace(/\.(md|mdx)$/, '');
    // http://localhost:3000/kb/atom/math/calc/core/integral/integration
    console.log(cleanPath);

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

export function applyTreeView({ node, opts }: { node: TreeNode; opts: TreeViewOptions }): any {
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
