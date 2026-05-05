'use client'
import { useState, useRef } from 'react'

function IconRail({ navItems }) {
  return (
    <nav className="p-2 space-y-2 flex flex-col items-center">
      {navItems.map((item) => (
        <a key={item.href} href={item.href} className="p-2 hover:bg-gray-100 rounded">
          <item.icon size={18} />
        </a>
      ))}
    </nav>
  )
}

function Sidebar({ navItems }) {
  return (
    <nav className="p-3 space-y-2">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
        >
          <item.icon size={16} />
          {item.label}
        </a>
      ))}
    </nav>
  )
}

export default function ThreeColumnLayout({ left, children, right }) {
  const [leftWidth, setLeftWidth] = useState(240)
  const [rightWidth, setRightWidth] = useState(240)

  const containerRef = useRef(null)

  // LEFT RESIZE
  const startLeftDrag = (e) => {
    const startX = e.clientX
    const startWidth = leftWidth

    const onMove = (e) => {
      const delta = e.clientX - startX
      setLeftWidth(Math.max(180, startWidth + delta))
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  // RIGHT RESIZE
  const startRightDrag = (e) => {
    const startX = e.clientX
    const startWidth = rightWidth

    const onMove = (e) => {
      const delta = startX - e.clientX
      setRightWidth(Math.max(180, startWidth + delta))
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div ref={containerRef} className="flex w-full max-w-7xl mx-auto items-start">
      {/* LEFT */}
      <aside
        style={{ width: leftWidth }}
        className="hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r"
      >
        {left}
      </aside>

      {/* LEFT RESIZER */}
      <div
        onMouseDown={startLeftDrag}
        className="hidden xl:block w-1 cursor-col-resize hover:bg-slate-300"
      />

      {/* MAIN */}
      <main className="flex-1 min-w-0 px-6">{children}</main>

      {/* RIGHT RESIZER */}
      <div
        onMouseDown={startRightDrag}
        className="hidden xl:block w-1 cursor-col-resize hover:bg-slate-300"
      />

      {/* RIGHT */}
      <aside
        style={{ width: rightWidth }}
        className="hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-l"
      >
        {right}
      </aside>
    </div>
  )
}
