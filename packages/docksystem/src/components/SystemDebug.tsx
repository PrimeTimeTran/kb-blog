'use client'
import { useEffect } from 'react'
import { useDock } from '../context/DockProvider'
import packageJson from '../../package.json'

export function SystemDebug() {
  const dock = useDock()
  useEffect(() => {
    dock?.state?.overlays?.push({
      id: 'cp1',
      type: 'singleton',
      placement: 'left',
      open: false,
      node: <CommandPalette />,
    })
    dock?.state?.overlays?.push({
      id: 'cp2',
      type: 'singleton',
      placement: 'right',
      open: false,
      node: <CommandPalette />,
    })
    dock?.state?.overlays?.push({
      id: 'ca1',
      type: 'singleton',
      placement: 'center',
      open: false,
      node: <ChatPanel />,
    })
    dock?.state?.overlays?.push({
      id: 'ca2',
      type: 'singleton',
      placement: 'bottom',
      open: false,
      node: <ChatPanel />,
    })
    dock?.state?.overlays?.push({
      id: 'i1',
      type: 'singleton',
      placement: 'bottom',
      open: false,
      node: <Inspector />,
    })
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-9999">
      <div className="w-72 rounded-2xl border border-white/10 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-white">
              Dock Debug Panel v{packageJson.version}
            </h1>
            <p className="text-xs text-zinc-400">Quick overlay + region controls</p>
          </div>

          <div className="rounded-md border border-white/10 bg-black/30 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-500">
            Dev
          </div>
        </div>

        {/* REGIONS */}
        <div className="mb-5">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Regions
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => dock.region.toggle('left')}
              className="rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-left text-sm text-white transition hover:bg-zinc-700"
            >
              Toggle Left
            </button>

            <button
              onClick={() => dock.region.toggle('right')}
              className="rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-left text-sm text-white transition hover:bg-zinc-700"
            >
              Toggle Right
            </button>
          </div>
        </div>

        {/* OVERLAYS */}
        <div>
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Overlays
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => dock.layer.toggle('cp1')}
              className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-left text-sm text-blue-200 transition hover:bg-blue-500/20"
            >
              Left Overlay
            </button>

            <button
              onClick={() => dock.layer.toggle('cp2')}
              className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-left text-sm text-emerald-200 transition hover:bg-emerald-500/20"
            >
              Right Overlay
            </button>

            <button
              onClick={() => dock.layer.toggle('ca1')}
              className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-left text-sm text-violet-200 transition hover:bg-violet-500/20"
            >
              Center Command Palette
            </button>

            <button
              onClick={() => dock.layer.toggle('ca2')}
              className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-2 text-left text-sm text-orange-200 transition hover:bg-orange-500/20"
            >
              Bottom Chat
            </button>

            <button
              onClick={() => dock.layer.toggle('i1')}
              className="rounded-lg border border-pink-500/20 bg-pink-500/10 px-3 py-2 text-left text-sm text-pink-200 transition hover:bg-pink-500/20"
            >
              Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
function ChatPanel() {
  const dock = useDock()
  return (
    <div className="flex flex-col h-full">
      <button onClick={() => dock.layer.toggle('chat-agent')}>Toggle Left</button>
      <button onClick={() => dock.layer.toggle('cmd-palette')}>Toggle Right</button>
      <div className="flex-1 overflow-y-auto">messages...</div>
      <div className="border-t p-2">input box</div>
    </div>
  )
}
function CommandPalette() {
  return (
    <div className="flex flex-col bg-zinc-900 text-white rounded-lg shadow-xl">
      <input className="p-3 bg-transparent outline-none" />
      <div className="max-h-64 overflow-y-auto">results...</div>
    </div>
  )
}
function Inspector() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">messages...</div>

      <div className="border-t p-2">input box</div>
    </div>
  )
}
