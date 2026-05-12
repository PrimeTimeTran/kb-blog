/* ─────────────────────────────────────────────
   LOGGING
───────────────────────────────────────────── */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export type LogShape = 'summary' | 'shallow' | 'deep' | 'inspect'

/* ─────────────────────────────────────────────
   TRACE DATA
───────────────────────────────────────────── */

export type Primitive = string | number | boolean | null | undefined

export interface TraceView {
  levels: string[]
  preview: [string, unknown][]
  raw: unknown
}

export type TraceObject = Record<string, unknown>

export type TraceData = Primitive | Primitive[] | TraceView | TraceObject | unknown[]

/* ─────────────────────────────────────────────
   OPTIONS
───────────────────────────────────────────── */

export interface TraceEmitOptions {
  shape?: LogShape
  depth?: number
}

export interface TraceOptions {
  shape?: LogShape
}

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */

export interface LoggerConfig {
  LOG_LEVEL: LogLevel
  DEBUG: string

  LOG_SHAPE: LogShape

  TRACE_SOURCE: boolean
  TRACE_RAW: boolean
}

/* ─────────────────────────────────────────────
   TRACE API
───────────────────────────────────────────── */

export interface TraceApi {
  id: string

  /* ─────────────────────────────
     CONTEXT
  ───────────────────────────── */

  setContext(partial: Record<string, unknown>): TraceApi

  /* ─────────────────────────────
     EMIT
  ───────────────────────────── */

  log(level: LogLevel, event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi

  event(event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi

  warn(event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi

  error(event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi

  /* ─────────────────────────────
     UTILITIES
  ───────────────────────────── */

  pick<T>(list: readonly T[], index: number, label?: string): T | undefined

  inspect<T>(obj: T, path: readonly (string | number)[]): unknown

  /* ─────────────────────────────
     SPANS
  ───────────────────────────── */

  span<T>(label: string, fn: (span: TraceApi) => Promise<T> | T): Promise<T>

  /* ─────────────────────────────
     LIFECYCLE
  ───────────────────────────── */

  end(): void
}
