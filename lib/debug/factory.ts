import { randomUUID } from 'crypto'

import { CONFIG } from './config'
import type { LogLevel } from './types'
import { createTrace } from './core'
import { getEnabled } from './utils'

const levelRank: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

function shouldLog(namespace: string, level: LogLevel): boolean {
  const enabled = getEnabled()

  if (!enabled.has(namespace) && !enabled.has('*')) return false
  if (levelRank[level] < levelRank[CONFIG.LOG_LEVEL]) return false

  return true
}

function createLogger(namespace: string) {
  return {
    debug: (...args: any[]) => {
      if (!shouldLog(namespace, 'debug')) return
      console.log(`[${namespace}:debug]`, ...args)
    },

    info: (...args: any[]) => {
      if (!shouldLog(namespace, 'info')) return
      console.log(`[${namespace}:info]`, ...args)
    },

    warn: (...args: any[]) => {
      if (!shouldLog(namespace, 'warn')) return
      console.log(`[${namespace}:warn]`, ...args)
    },

    error: (...args: any[]) => {
      if (!shouldLog(namespace, 'error')) return
      console.log(`[${namespace}:error]`, ...args)
    },

    trace: () => createTrace(namespace),
  }
}

export const log = {
  mdx: createLogger('mdx'),
  bundle: createLogger('bundle'),
  content: createLogger('content'),
  tabgroup: createLogger('tabgroup'),
  embed: createLogger('embed'),
  registry: createLogger('registry'),
}
