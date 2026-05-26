import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sortTree } from '../../lib/sort-tree';

export function SidebarNode({ node = [], openMap, setOpenMap }) {
  if (!Array.isArray(node)) return null;

  const sorted = sortTree(node);

  return (
    <ul className="pl-1">
      {sorted.map((item) => (
        <SidebarItem key={item.slug || item.name} item={item} openMap={openMap} setOpenMap={setOpenMap} />
      ))}
    </ul>
  );
}

export function SidebarItem({ item, openMap = {}, setOpenMap }) {
  const router = useRouter();

  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const href = item.file ? `/kb/${item.file}` : null;

  const id = item.file || item.name;
  const open = openMap[id] ?? false;

  const toggle = () => {
    setOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const canToggle = hasChildren;

  return (
    <li className="select-none">
      <div
        onClick={canToggle ? toggle : undefined}
        className="group flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-primary/5 "
      >
        {/* LEFT: structure control (expand/collapse) */}
        {/* expand/collapse */}
        <div className="flex items-center gap-1">
          {canToggle ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              className="flex items-center gap-1 rounded px-1 "
            >
              <span className="text-base leading-none">{open ? '▾' : '▸'}</span>
              <span className="text-xs">📁</span>
            </button>
          ) : (
            <span className="pl-2 text-xs text-on-surface">📄</span>
          )}
        </div>

        {/* RIGHT: navigation (file target) */}
        {href ? (
          <Link scroll={false} href={href} className="flex flex-1 items-center">
            <span className={`w-full text-sm transition-colors text ${router.asPath === href ? 'font-semibold ' : ''}`}>
              {item.name}
            </span>
          </Link>
        ) : (
          <span className="flex-1 text-sm text-on-surface-variant ">{item.name}</span>
        )}
      </div>

      {/* children */}
      {hasChildren && open && (
        <div className="ml-3 border-l border-zinc-200 pl-2 ">
          <SidebarNode node={item.children} openMap={openMap} setOpenMap={setOpenMap} />
        </div>
      )}
    </li>
  );
}

export default function SidebarTree({ data }) {
  const [openMap, setOpenMap] = useState({});
  return <SidebarNode node={data} openMap={openMap} setOpenMap={setOpenMap} />;
}
