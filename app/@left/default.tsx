'use client'

import { CounterControls } from '@/app/shell/CounterControls'
import { useShellCounter } from '@/app/shell/useShellCounter'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { useState, useMemo } from 'react'

export function SelfContainedTest() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('hello')

  const derived = useMemo(() => {
    return text.split('').reverse().join('')
  }, [text])

  return (
    <div className="p-4 border rounded-lg bg-surface flex flex-col gap-3 w-full">
      <div className="text-xl font-bold">Self-contained state test</div>

      <div className="flex gap-2 items-center">
        <button
          className="px-3 py-1 bg-blue-500 text-on-surface rounded"
          onClick={() => setCount((c) => c + 1)}
        >
          +
        </button>

        <button
          className="px-3 py-1 bg-red-500 text-on-surface rounded"
          onClick={() => setCount((c) => c - 1)}
        >
          -
        </button>

        <div className="font-mono">count: {count}</div>
      </div>

      <input
        className="border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="type something..."
      />

      <div className="text-sm text-gray-700">
        reversed: <span className="font-mono">{derived}</span>
      </div>
    </div>
  )
}

export default function Page() {
  const counter = useShellCounter()
  const segment = useSelectedLayoutSegment('left')
  const pathname = usePathname()
  return (
    <div className="flex flex-col bg-surface-variant h-full p-2">
      <h1 className="text-2xl font-bold text-on-surface">{FILE_PATH}</h1>
      <div>
        <h1 className="text-xl font-bold text-sky-500">We can maintainstate across page renders</h1>
        <CounterControls {...counter} />
      </div>
      {pathname}
      <SelfContainedTest />
      {segment}
    </div>
  )
}

export const FILE_PATH = 'app/@left/default.tsx'
