'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Navbar } from '@/components/Navbar'
import { useScrollShrink } from '@/lib/hooks/useScrollShrink'
import { ScrollSpyProvider } from '@/components/providers/ScrollSpyProvider'

export default function PanelsLayout({ mainWide, left, right, children }) {
  const [state, setState] = useState({
    dock: {
      left: true,
      right: true,
      leftWidth: 280,
      rightWidth: 280,
      leftCollapsed: false,
      rightCollapsed: false,
    },
    overlay: {
      left: { open: false, width: 320 },
      right: { open: false, width: 320 },
    },
  })
  const scrollRef = useRef()
  const shrunk = useScrollShrink(scrollRef, 40)

  const update = (fn) => setState((s) => ({ ...s, ...fn(s) }))
  const leftDockRef = useRef()
  const startLeftResize = (e) => {
    const startX = e.clientX
    const startW = state.dock.rightWidth

    const onMove = (e) => {
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
    // <div className="flex flex-1 flex-col min-h-0">
    <div className="flex flex-1 flex-col min-h-0 h-full">
      <Navbar className="h-14 sticky top-0 z-10 flex justify-around theme-border-b px-3 bg-white dark:bg-black" />
      <ScrollSpyProvider scrollRef={scrollRef}>
        <div className="flex min-h-0 flex-1">
          {/* LEFT DOCK */}
          {state.dock.left && (
            <div
              className="flex-3 min-w-0 flex h-full "
              ref={leftDockRef}
              style={{
                width: state.dock.leftCollapsed ? 64 : state.dock.leftWidth,
              }}
            >
              <div
                className={`sidebar h-full flex flex-col overflow-y-auto ${left && 'theme-border-r'} grow ${state.dock.leftCollapsed ? 'collapsed' : ''}`}
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
          <main
            ref={scrollRef}
            className={`${mainWide ? 'flex-10' : 'flex-6'} min-w-0 min-h-0 overflow-y-auto px-6 no-scrollbar`}
          >
            {children}
          </main>

          {/* RIGHT DOCK */}
          {state.dock.right && (
            <div className="flex-3 min-w-0 flex h-full">
              {/* RESIZER */}
              {!state.dock.rightCollapsed && (
                <div
                  onMouseDown={startRightResize}
                  className="w-1 cursor-col-resize hover:bg-slate-300"
                />
              )}

              <div
                className="h-full flex flex-col overflow-y-auto"
                style={{
                  width: state.dock.rightCollapsed ? 64 : state.dock.rightWidth,
                }}
              >
                {typeof right === 'function'
                  ? right({ collapsed: state.dock.rightCollapsed })
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
                  className="fixed left-0 inset-y-0 z-9999 flex bg-green-500/30 border-r"
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
                  className="fixed right-0 inset-y-0 z-9999 flex bg-green-500/30 border-l"
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
          <div className="h-[100vh]" />
        </div>
      </ScrollSpyProvider>
    </div>
  )
}
