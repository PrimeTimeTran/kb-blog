import { randomUUID } from 'crypto'
import { CONFIG } from './config'
import { shouldLog, resolveShape, banner, isTraceView, getColor, getCallerLocation } from './utils'
import { normalizeTraceData } from './shapes'
import type { LogLevel, TraceEmitOptions } from './types'

/* ─────────────────────────────
   GLOBAL SILENCE GATE
───────────────────────────── */

const IS_BUILD =
  process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'production'

const TRACE_ENABLED = process.env.TRACE === 'true' && !IS_BUILD

function out(...args: any[]) {
  if (!TRACE_ENABLED) return
  console.log(...args)
}

function err(...args: any[]) {
  if (!TRACE_ENABLED) return
  console.error(...args)
}

/* ─────────────────────────────
   TRACE
───────────────────────────── */

export function createTrace(namespace: string) {
  const id = randomUUID().slice(0, 6)
  const color = getColor(id)

  const context = {
    startedAt: Date.now(),
    meta: {} as Record<string, any>,
  }

  out(banner(color, `\n━━━ TRACE START ${namespace}:${id} ━━━`))

  function setContext(partial: Record<string, any>) {
    context.meta = { ...context.meta, ...partial }
    return api
  }

  function emit(level: LogLevel, event: string, data?: unknown, opts: TraceEmitOptions = {}) {
    if (!TRACE_ENABLED) return
    if (!shouldLog(namespace, level)) return

    const shape = resolveShape(opts)

    const shaped = typeof data === 'object' ? normalizeTraceData(data, opts.depth ?? 2) : data

    out(`${getColor(id)}[${namespace}:${level}]`, event)

    if (isTraceView(shaped)) {
      out('  levels:')
      shaped.levels.forEach((l) => out('   ', l))

      out('  preview:', shaped.preview)

      if (CONFIG.TRACE_RAW) {
        out('  raw:')
        console.dir(shaped.raw, { depth: null })
      }
    } else {
      out('  value:', shaped)
    }
  }

  const api = {
    id,

    setContext,

    log(level: LogLevel, event: string, data?: unknown, opts?: TraceEmitOptions) {
      emit(level, event, data, opts)
      return api
    },

    event(event: string, data?: unknown, opts?: TraceEmitOptions) {
      emit('info', event, data, opts)
      return api
    },

    pick<T>(list: T[], index: number, label = 'PICK') {
      const item = list?.[index]
      out(banner(getColor(id), `[${namespace}:${id}] ${label}[${index}]`), item)
      return item
    },

    inspect(obj: any, path: (string | number)[]) {
      const value = path.reduce((acc, key) => acc?.[key], obj)
      out(banner(getColor(id), `[${namespace}:${id}] INSPECT ${path.join('.')}`), value)
      return value
    },

    async span<T>(label: string, fn: (span: any) => Promise<T> | T): Promise<T> {
      const startedAt = Date.now()

      out(banner(getColor(id), `[${namespace}:${id}] ▶ ${label}`))

      try {
        const result = await fn(api)

        out(
          '\x1b[90m',
          {
            span: label,
            duration: Date.now() - startedAt,
          },
          '\x1b[0m'
        )

        return result
      } catch (error) {
        out(banner(getColor(id), `[${namespace}:${id}] ✖ ${label}`))
        err(error)
        throw error
      }
    },

    end() {
      if (!TRACE_ENABLED) return

      out(banner(color, `━━━ TRACE END ${namespace}:${id} ━━━`))

      if (Object.keys(context.meta).length > 0) {
        out('\x1b[90m', context.meta, '\x1b[0m')
      }

      out('\x1b[90m', { duration: Date.now() - context.startedAt }, '\x1b[0m\n')
    },
  }

  return api
}
