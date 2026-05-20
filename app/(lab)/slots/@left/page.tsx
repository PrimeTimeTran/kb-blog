'use client'

import { CounterControls } from '@/app/shell/CounterControls'
import { useShellCounter } from '@/app/shell/useShellCounter'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'

export default function Page() {
  const counter = useShellCounter()
  const segment = useSelectedLayoutSegment('left')
  const pathname = usePathname()
  return (
    <div className="flex flex-col bg-lime-400 h-full">
      <h1 className="font-bold text-2xl text-green-600">app/(preview)/layouts/@left/page.tsx</h1>
      {pathname}
      {segment}
      <CounterControls {...counter} />
    </div>
  )
}
