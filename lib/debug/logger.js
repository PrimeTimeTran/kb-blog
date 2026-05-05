let CONFIG = {
  DEBUG: process.env.DEBUG || '',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  // DEBUG: 'mdx',
  // LOG_LEVEL: 'debug',
}
// Logging:
// - “I want to see this later”
// Events:
// - “I want something else to happen now”
const levelRank = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

function getEnabled() {
  return new Set(
    CONFIG.DEBUG.split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  )
}

function createLogger(namespace) {
  return (level, ...args) => {
    const enabled = getEnabled()

    if (!enabled.has(namespace) && !enabled.has('*')) return
    if (levelRank[level] < levelRank[CONFIG.LOG_LEVEL]) return

    console.log(`[${namespace}:${level}]`, ...args)
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

export function setLoggerConfig(overrides = {}) {
  CONFIG = { ...CONFIG, ...overrides }
}

export function time(label, fn) {
  const start = performance.now()
  const result = fn()
  const end = performance.now()

  log.content('info', `${label} took ${(end - start).toFixed(2)}ms`)

  return result
}
