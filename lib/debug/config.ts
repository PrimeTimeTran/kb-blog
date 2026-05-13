import type {
  LogLevel,
  LogShape,
  TraceView,
  TraceData,
  LoggerConfig,
  TraceEmitOptions,
} from './types'

let CONFIG = {
  LOG_LEVEL: (process.env.LOG_LEVEL || 'error') as LogLevel,
  DEBUG: process.env.DEBUG || 'build',
  LOG_SHAPE: 'inspect' as LogShape,
  TRACE_SOURCE: false,
  TRACE_RAW: false,
}

export function setLoggerConfig(overrides: Partial<LoggerConfig>) {
  CONFIG = { ...CONFIG, ...overrides }
}

export const levelRank: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

export { CONFIG }
