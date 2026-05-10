'use client'

type CounterControlsProps = {
  count: number
  inc: () => void
  dec: () => void
  reset: () => void
}

export function CounterControls({ count, inc, dec, reset }: CounterControlsProps) {
  const baseBtn =
    'h-8 px-2 text-sm rounded-md border transition ' +
    'border-gray-300 dark:border-gray-600 ' +
    'bg-white dark:bg-gray-800 ' +
    'text-gray-800 dark:text-gray-200 ' +
    'hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-[0.98]'

  const primaryBtn =
    'h-8 px-3 text-sm rounded-md transition ' +
    'bg-black text-white dark:bg-white dark:text-black ' +
    'hover:opacity-90 active:opacity-80'

  return (
    <div className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 w-fit">
      <button onClick={dec} className={baseBtn}>
        −
      </button>

      <div className="min-w-10 text-center text-sm text-gray-800 dark:text-gray-200">{count}</div>

      <button onClick={inc} className={primaryBtn}>
        +
      </button>

      <button onClick={reset} className={baseBtn}>
        reset
      </button>
    </div>
  )
}
