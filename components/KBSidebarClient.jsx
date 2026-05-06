'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function KBSidebarClient({ index }) {
  const [openMap, setOpenMap] = useState({})
  return <SidebarNode node={index} openMap={openMap} setOpenMap={setOpenMap} />
}

export function SidebarNode({ node = [], openMap, setOpenMap }) {
  if (!Array.isArray(node)) return null

  return (
    <ul className="pl-1">
      {(node ?? []).map((item) => (
        <SidebarItem
          key={item.slug || item.name}
          item={item}
          openMap={openMap}
          setOpenMap={setOpenMap}
        />
      ))}
    </ul>
  )
}

export function SidebarItem({ item, openMap = {}, setOpenMap }) {
  const router = useRouter()

  const hasChildren = Array.isArray(item.children) && item.children.length > 0

  // ✅ NEW: file is the source of truth
  const href = item.file ? `/kb/${item.file}` : null

  const id = item.file || item.name
  const open = openMap[id] ?? false

  const toggle = () => {
    setOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  const canToggle = hasChildren

  return (
    <li className="select-none">
      <div
        onClick={canToggle ? toggle : undefined}
        className="group flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        {/* LEFT: structure control (expand/collapse) */}
        {/* expand/collapse */}
        <div className="flex items-center gap-1 text-zinc-500">
          {canToggle ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggle()
              }}
              className="flex items-center gap-1 rounded px-1 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              <span className="text-base leading-none">{open ? '▾' : '▸'}</span>
              <span className="text-xs">📁</span>
            </button>
          ) : (
            <span className="pl-2 text-xs text-zinc-400">📄</span>
          )}
        </div>

        {/* RIGHT: navigation (file target) */}
        {href ? (
          <Link scroll={false} href={href} className="flex flex-1 items-center">
            <span
              className={`w-full text-sm transition-colors ${
                router.asPath === href
                  ? 'font-semibold text-blue-600'
                  : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {item.name}
            </span>
          </Link>
        ) : (
          <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">{item.name}</span>
        )}
      </div>

      {/* children */}
      {hasChildren && open && (
        <div className="ml-3 border-l border-zinc-200 pl-2">
          <SidebarNode node={item.children} openMap={openMap} setOpenMap={setOpenMap} />
        </div>
      )}
    </li>
  )
}
