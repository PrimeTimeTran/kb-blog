'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CounterControls } from '@/app/shell/CounterControls'

export default function PageClient({ tree, isCatchAll = false }) {
  const pathname = usePathname()
  const [count, setCount] = useState(0)

  const [nextPageRoute] = useState(() => {
    const newPage1 = crypto.randomUUID().substring(0, 4)

    const parts = pathname?.split('/').filter(Boolean) ?? []
    const result = parts.slice(1).join('/') + '/'

    if (isCatchAll) {
      const newPage2 = crypto.randomUUID().substring(0, 4)
      return `/layouts/${newPage1}/${newPage2}?prev=${encodeURIComponent(result)}`
    }

    return `/layouts/${newPage1}?prev=${encodeURIComponent(result)}`
  })

  return (
    <div className="flex flex-1 flex-col gap-2 justify-center items-center w-full">
      <div className="flex gap-2">
        <CounterControls
          count={count}
          inc={() => setCount((c) => c + 1)}
          dec={() => setCount((c) => c - 1)}
          reset={() => setCount(0)}
        />
        <div className="flex flex-col items-center gap-3 p-3 border rounded-lg w-fit bg-surface">
          <span className="text-3xl text-on-surface">Go to this url</span>
          {nextPageRoute ? (
            <Link href={nextPageRoute} className="font-mono underline text-primary">
              {nextPageRoute}
            </Link>
          ) : (
            <span className="font-mono opacity-50">generating...</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col items-start gap-3 p-3 border rounded-lg w-fit bg-surface">
          <h1 className="text-xl">Current:</h1>
          <span className="font-mono font-bold">{pathname}</span>
          <pre className="text-on-surface-variant prose dark:prose-inert">{tree}</pre>
        </div>
      </div>
    </div>
  )
}
