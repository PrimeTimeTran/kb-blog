import { randomUUID } from 'crypto'
import { CONFIG } from './config'
import { shouldLog, resolveShape, banner, isTraceView, getColor, getCallerLocation } from './utils'
import { normalizeTraceData, LOG_SHAPES } from './shapes'
import type { LogLevel } from './types'

import type { TraceEmitOptions } from './types'

export function createTrace(namespace: string) {
  const id = randomUUID().slice(0, 6)
  const color = getColor(id)

  const context = {
    startedAt: Date.now(),
    meta: {} as Record<string, any>,
  }

  console.log(banner(color, `\n━━━ TRACE START ${namespace}:${id} ━━━`))

  /* ─────────────────────────────
     CONTEXT
  ───────────────────────────── */

  function setContext(partial: Record<string, any>) {
    context.meta = { ...context.meta, ...partial }
    return api
  }

  /* ─────────────────────────────
     EMITTER
  ───────────────────────────── */

  function emit(level: LogLevel, event: string, data?: unknown, opts: TraceEmitOptions = {}) {
    if (!shouldLog(namespace, level)) return

    const source = CONFIG.TRACE_SOURCE ? getCallerLocation(4) : null
    const shape = resolveShape(opts)

    const shaped: TraceData =
      typeof data === 'object' ? normalizeTraceData(data, opts.depth ?? 2) : data

    // const expanded =
    //   shaped && typeof (shaped as any).inspect === 'function'
    //     ? { ...shaped, _inspect: '[call inspect() to view]' }
    //     : shaped
    console.log(`${getColor(id)}[${namespace}:${level}]`, event)

    if (isTraceView(shaped)) {
      console.log('  levels:')
      shaped.levels.forEach((l) => console.log('   ', l))

      console.log('  preview:', shaped.preview)

      if (CONFIG.TRACE_RAW) {
        console.log('  raw:')
        console.dir(shaped.raw, { depth: null })
      }
    } else {
      console.log('  value:', shaped)
    }
  }

  /* ─────────────────────────────
     API
  ───────────────────────────── */

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
      console.log(banner(getColor(id), `[${namespace}:${id}] ${label}[${index}]`), item)
      return item
    },

    inspect(obj: any, path: (string | number)[]) {
      const value = path.reduce((acc, key) => acc?.[key], obj)
      console.log(banner(getColor(id), `[${namespace}:${id}] INSPECT ${path.join('.')}`), value)
      return value
    },

    async span<T>(label: string, fn: (span: TraceSpan) => Promise<T> | T): Promise<T> {
      const startedAt = Date.now()

      console.log(banner(getColor(id), `[${namespace}:${id}] ▶ ${label}`))

      try {
        const result = await fn(api)

        console.log(
          '\x1b[90m',
          {
            span: label,
            duration: Date.now() - startedAt,
          },
          '\x1b[0m'
        )

        return result
      } catch (error) {
        console.log(banner(getColor(id), `[${namespace}:${id}] ✖ ${label}`))

        console.error(error)

        throw error
      }
    },

    end() {
      console.log(banner(color, `━━━ TRACE END ${namespace}:${id} ━━━`))

      if (Object.keys(context.meta).length > 0) {
        console.log('\x1b[90m', context.meta, '\x1b[0m')
      }

      console.log('\x1b[90m', { duration: Date.now() - context.startedAt }, '\x1b[0m\n')
    },
  }

  return api
}
