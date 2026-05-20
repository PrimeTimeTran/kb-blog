'use client'

import { CounterControls } from '@/app/shell/CounterControls'
import { useShellCounter } from '@/app/shell/useShellCounter'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'

export default function Page() {
  const pathname = usePathname()
  const counter = useShellCounter()
  const segment = useSelectedLayoutSegment('left')
  return (
    <div className="flex flex-col p-2 h-full bg-indigo-500">
      <h1 className="font-bold text-2xl text-purple-600">app/(preview)/layouts/@right/page.tsx</h1>
      {pathname}
      <CounterControls {...counter} />
      {segment}
    </div>
  )
}
