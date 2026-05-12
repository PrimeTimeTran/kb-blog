import { CONFIG, levelRank } from './config'

import type {
  LogLevel,
  LogShape,
  TraceView,
  TraceData,
  LoggerConfig,
  TraceEmitOptions,
} from './types'

export function getCallerLocation(depth = 3) {
  const stack = new Error().stack?.split('\n')
  if (!stack || stack.length <= depth) return null

  const line = stack[depth]?.trim()
  return line || null
}

export function shouldLog(namespace: string, level: LogLevel): boolean {
  const enabled = getEnabled()

  if (!enabled.has(namespace) && !enabled.has('*')) return false
  if (levelRank[level] < levelRank[CONFIG.LOG_LEVEL]) return false

  return true
}

export function resolveShape(opts?: TraceEmitOptions): LogShape {
  return opts?.shape ?? CONFIG.LOG_SHAPE
}

export function banner(color: string, text: string) {
  const reset = '\x1b[0m'
  return `${color}${text}${reset}`
}

export function getColor(id: string) {
  const colors = ['\x1b[36m', '\x1b[33m', '\x1b[35m', '\x1b[32m', '\x1b[34m']

  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

export function getEnabled(): Set<string> {
  return new Set(
    CONFIG.DEBUG.split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  )
}

/* ─────────────────────────────────────────────
   TRACE FACTORY
───────────────────────────────────────────── */
export function isTraceView(x: any): x is TraceView {
  return (
    x && typeof x === 'object' && Array.isArray(x.levels) && Array.isArray(x.preview) && 'raw' in x
  )
}
