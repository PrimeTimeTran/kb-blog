import { useMemo } from 'react'

export function ProjectionChart({ text, base = 10, growth = 1.15, points = 6 }) {
  const data = useMemo(() => {
    return Array.from({ length: points }, (_, i) => {
      return Math.round(base * Math.pow(growth, i))
    })
  }, [base, growth, points])

  return (
    <div className="my-6 rounded-lg border p-4 dark:border-gray-700">
      <h3 className="mb-2 text-sm font-semibold text-gray-500">Projection Chart</h3>

      {text && <p className="mb-3 text-gray-700 dark:text-gray-300">{text}</p>}

      <div className="flex h-24 items-end gap-2">
        {(data ?? []).map((value, i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-6 rounded bg-blue-500"
              style={{
                height: `${value}px`,
              }}
            />
            <span className="mt-1 text-xs text-gray-500">{value}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        Base: {base} • Growth: {growth}x
      </p>
    </div>
  )
}
