import type {
  LogShape,
  TraceView,
  // TraceData,
  // LoggerConfig,
  // TraceEmitOptions,
} from './types'

export const LOG_SHAPES: Record<LogShape, (obj: any) => any> = {
  summary: (obj) => ({
    keys: Object.keys(obj || {}),
  }),

  shallow: (obj) => obj,

  deep: (obj) => JSON.parse(JSON.stringify(obj)),

  inspect: (obj) => ({
    keys: Object.keys(obj || {}),
    preview: Object.entries(obj || {}).slice(0, 5),
  }),
}

export function normalizeTraceData(data: any, depth = 2): TraceView {
  if (data == null) {
    return { levels: [], preview: [], raw: data }
  }

  const levels: string[] = []
  const preview: [string, any][] = []

  function walk(obj: any, prefix = '', level = 1) {
    if (level > depth || typeof obj !== 'object') return

    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key

      levels.push(`${level}:${path}`)

      if (level === 1) {
        preview.push([key, value])
      }

      if (value && typeof value === 'object') {
        walk(value, path, level + 1)
      }
    }
  }

  walk(data)

  return {
    levels,
    preview,
    raw: data,
  }
}
