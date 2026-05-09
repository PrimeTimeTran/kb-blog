'use client'

import { useState, useEffect } from 'react'
import { useDock, useSys } from '@primetimetran/beeline'

export const LAYER_REGISTRY = {
  regions: [
    { id: 'leftStack', label: 'Left Stack' },
    { id: 'rightStack', label: 'Right Stack' },
  ],

  overlays: [
    { id: 'leftSingleton', label: 'Left Singleton' },
    { id: 'centerSingleton', label: 'Center Singleton' },
    { id: 'rightSingleton', label: 'Right Singleton' },
    { id: 'bottomSingleton', label: 'Bottom Inspector' },
  ],

  system: [
    { id: 'leftStack', label: 'Left Stack' },
    { id: 'rightStack', label: 'Right Stack' },
    { id: 'leftSingleton', label: 'Left Singleton' },
    { id: 'centerSingleton', label: 'Center Singleton' },
    { id: 'bottomSingleton', label: 'Bottom Inspector' },
    { id: 'systemPanel', label: 'Right Singleton' },
  ],
} as const

function Panel() {
  const dock = useDock()
  const [tab, setTab] = useState<keyof typeof LAYER_REGISTRY>('system')

  const items = LAYER_REGISTRY[tab]

  return (
    <div className="h-full w-full flex flex-col">
      {/* HEADER + TABS */}
      <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex gap-2">
          {Object.keys(LAYER_REGISTRY).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`text-xs capitalize px-2 py-1 rounded ${
                tab === t ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-col gap-2 overflow-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => dock.layer.toggle(item.id)}
            className="rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white hover:bg-zinc-700"
          >
            {item.id} {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
export function ChatPanel() {
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
export function CommandPalette() {
  return (
    <div className="flex flex-col bg-zinc-900 text-white rounded-lg shadow-xl">
      <input className="p-3 bg-transparent outline-none" />
      <div className="max-h-64 overflow-y-auto">results...</div>
    </div>
  )
}
export function Inspector() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">messages...</div>

      <div className="border-t p-2">input box</div>
    </div>
  )
}
export function ClientRegister({}: {}) {
  const dock = useDock()

  useEffect(() => {
    dock.layer.register({
      id: 'systemPanel',
      nature: 'singleton',
      position: 'right',

      open: false,

      trigger: {
        type: 'floating',
        position: 'bottom-right',
        autoHideWhenOpen: false,
        icon: '⚙️',
      },

      orchestration: {
        panel: {
          className: 'bg-zinc-900/95',
        },
      },

      node: <Panel />,
    })
    dock.layer.push({
      id: 'leftStack',
      nature: 'stack',
      position: 'left',
      open: false,
      node: <ChatPanel />,
    })
    dock.layer.push({
      id: 'centerSingleton',
      nature: 'singleton',
      position: 'center',
      open: false,
      node: <CommandPalette />,
    })
    dock.layer.push({
      id: 'rightSingleton',
      nature: 'singleton',
      position: 'right',
      open: false,
      node: <ChatPanel />,
    })
    dock.layer.push({
      id: 'bottomSingleton',
      nature: 'singleton',
      position: 'bottom',
      open: false,
      node: <Inspector />,
    })
  }, []) // ❗ IMPORTANT: no dock dependency

  return null
}
