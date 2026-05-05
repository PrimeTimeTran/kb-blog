'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TiTags } from 'react-icons/ti'
import { RiBloggerLine } from 'react-icons/ri'
import { SiThealgorithms } from 'react-icons/si'
import { GoProjectSymlink } from 'react-icons/go'
import { GiGiftOfKnowledge } from 'react-icons/gi'

// CSS Examples.
// https://prismic.io/blog/css-hover-effects#7-4corner-image

const items = [
  { href: 'a', label: 'Blog', icon: RiBloggerLine },
  { href: 'b', label: 'Algorithms', icon: SiThealgorithms },
  { href: 'c', label: 'Projects', icon: GoProjectSymlink },
  { href: 'd', label: 'Knowledge', icon: GiGiftOfKnowledge },
  { href: 'e', label: 'Tags', icon: TiTags },
]

function Sidebar({ currentRoute, collapsed, isRight = false }) {
  return (
    <div className="p-2 space-y-2">
      {items.map((item, i) => {
        const isActive = item.href === currentRoute
        const Icon = item.icon

        return (
          <div
            key={item.label}
            className={`flex items-center h-10 px-2 rounded-md hover:bg-gray-100 ${isRight ? 'text-right justify-end items-end' : ''}`}
          >
            {/* ICON (always visible) */}
            <div
              className="w-8 flex items-center justify-center shrink-0 transition-all duration-150"
              style={{
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {/* <Icon
                className={`
                  text-lg transition-all duration-200
                  ${isActive ? 'text-blue-600 scale-110' : ''}
                `}
              /> */}

              {/* Jello Effect on shift */}
              {/* <Icon
                className={`
                  text-lg transition-transform duration-200
                  ${collapsed ? 'scale-110 opacity-90' : 'scale-100 opacity-100'}
                `}
              /> */}
              {/* Active */}
              <Icon
                className={`
                  text-lg transition-all duration-200
                  ${isActive ? 'text-blue-600 scale-110' : ''}
                `}
              />
            </div>

            {/* LABEL (animated) */}
            <span
              style={{
                transitionDelay: collapsed ? `${(items.length - i) * 30}ms` : `${i * 30}ms`,
              }}
              className={`
          whitespace-nowrap transition-all duration-150
          ${
            collapsed
              ? 'opacity-0 -translate-x-2 w-0 overflow-hidden'
              : 'opacity-100 translate-x-0 w-auto'
          }
        `}
            >
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function PanelsLayout({ left, right, children }) {
  left = Sidebar
  right = Sidebar
  const [state, setState] = useState({
    dock: {
      left: true,
      right: true,
      leftWidth: 240,
      rightWidth: 280,
      leftCollapsed: false,
      rightCollapsed: false,
    },
    overlay: {
      left: { open: true, width: 320 },
      right: { open: true, width: 320 },
    },
  })

  const update = (fn) => setState((s) => ({ ...s, ...fn(s) }))
  const leftDockRef = useRef()
  const startLeftResize = (e) => {
    const startX = e.clientX
    const startW = state.dock.rightWidth

    const onMove = (e) => {
      // if (leftDockRef.current) return

      leftDockRef.current = requestAnimationFrame(() => {
        setState((s) => ({
          ...s,
          dock: {
            ...s.dock,
            leftWidth: Math.max(120, startW + (e.clientX - startX)),
          },
        }))

        leftDockRef.current = null
      })
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
  const rightDockRef = useRef()
  const startRightResize = (e) => {
    const startX = e.clientX
    const startW = state.dock.rightWidth

    const onMove = (e) => {
      update((s) => ({
        dock: {
          ...s.dock,
          rightWidth: Math.max(60, startW - (e.clientX - startX)),
        },
      }))
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const startOverlayLeftResize = (e) => {
    const startX = e.clientX
    const startW = state.overlay.left.width

    const onMove = (e) => {
      const next = Math.max(240, startW + (e.clientX - startX))

      setState((s) => ({
        ...s,
        overlay: {
          ...s.overlay,
          left: {
            ...s.overlay.left,
            width: next,
          },
        },
      }))
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const startOverlayRightResize = (e) => {
    const startX = e.clientX
    const startW = state.overlay.right.width

    const onMove = (e) => {
      const next = Math.max(240, startW - (e.clientX - startX))

      setState((s) => ({
        ...s,
        overlay: {
          ...s.overlay,
          right: {
            ...s.overlay.right,
            width: next,
          },
        },
      }))
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* NAVBAR */}
      <header className="h-14 sticky top-0 z-50 flex items-center border-b px-3 bg-yellow-300">
        <button
          onClick={() =>
            setState((s) => ({
              ...s,
              dock: {
                ...s.dock,
                leftCollapsed: !s.dock.leftCollapsed,
              },
            }))
          }
          // onClick={() =>
          //   setState((s) => ({
          //     ...s,
          //     overlay: {
          //       ...s.overlay,
          //       leftOpen: true,
          //     },
          //   }))
          // }
        >
          ☰
        </button>

        <div className="ml-3 font-semibold">App</div>

        <button
          className="ml-auto"
          onClick={
            () =>
              setState((s) => ({
                ...s,
                dock: {
                  ...s.dock,
                  rightCollapsed: !s.dock.rightCollapsed,
                },
              }))
            // setState((s) => ({
            //   ...s,
            //   dock: { ...s.dock, right: true },
            // }))
          }
        >
          ☰
        </button>
      </header>

      {/* BODY */}
      <div className="flex flex-1 min-h-0">
        {/* LEFT DOCK */}
        {state.dock.left && (
          <div className="flex shrink-0 bg-yellow-500">
            <div
              ref={leftDockRef}
              className={`sidebar h-full border-r ${state.dock.leftCollapsed ? 'collapsed' : ''}`}
              style={{
                flexBasis: state.dock.leftCollapsed ? 64 : state.dock.leftWidth,
              }}
            >
              {typeof left === 'function'
                ? left({ collapsed: state.dock.leftCollapsed, currentRoute: 'a' })
                : left}
            </div>

            {/* RESIZER */}
            {!state.dock.leftCollapsed && (
              <div
                onMouseDown={startLeftResize}
                className="w-1 cursor-col-resize hover:bg-slate-300"
              />
            )}
          </div>
        )}

        {/* MAIN */}
        <main className="flex-1 min-w-0 px-6 overflow-y-auto h-screen">{children}</main>

        {state.dock.right && (
          <div className="flex shrink-0 bg-red-400">
            {/* RESIZER */}
            {!state.dock.rightCollapsed && (
              <div
                onMouseDown={startRightResize}
                className="w-1 cursor-col-resize hover:bg-slate-300"
              />
            )}

            <div
              ref={rightDockRef}
              className={`sidebar h-full border-l ${state.dock.rightCollapsed ? 'collapsed' : ''}`}
              style={{
                width: state.dock.rightCollapsed ? 64 : state.dock.rightWidth,
              }}
            >
              {typeof right === 'function'
                ? right({ collapsed: state.dock.rightCollapsed, isRight: true })
                : right}
            </div>
          </div>
        )}
        <AnimatePresence>
          {state.overlay.left.open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    overlay: {
                      ...s.overlay,
                      left: { ...s.overlay.left, open: false },
                    },
                  }))
                }
              />

              <motion.div
                className="fixed left-0 inset-y-0 z-[9999] flex bg-green-500/30 border-r"
                style={{ width: state.overlay.left.width }}
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
              >
                <div className="flex-1 min-h-0 overflow-y-auto">{left}</div>

                <div
                  onMouseDown={startOverlayLeftResize}
                  className="w-1 cursor-col-resize hover:bg-slate-400"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {state.overlay.right.open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    overlay: {
                      ...s.overlay,
                      right: { ...s.overlay.right, open: false },
                    },
                  }))
                }
              />

              <motion.div
                className="fixed right-0 inset-y-0 z-[9999] flex bg-green-500/30 z-50 border-l flex"
                style={{ width: state.overlay.right.width }}
                initial={{ x: 320 }}
                animate={{ x: 0 }}
                exit={{ x: 320 }}
              >
                {/* RESIZE HANDLE */}
                <div
                  onMouseDown={startOverlayRightResize}
                  className="w-1 cursor-col-resize hover:bg-slate-400"
                />

                {/* CONTENT */}
                <div className="flex-1 overflow-y-auto">{right}</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
