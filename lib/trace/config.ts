import type { LogLevel, LogShape, LoggerConfig } from './types';

let CONFIG = {
  // LOG_LEVEL: (process.env.LOG_LEVEL || 'debug') as LogLevel,
  LOG_LEVEL: 'debug' as LogLevel,
  DEBUG: process.env.DEBUG || 'content:get',
  // DEBUG: 'content:index',
  LOG_SHAPE: 'x' as LogShape,
  TRACE_SOURCE: true,
  TRACE_RAW: true,
};

export function setLoggerConfig(overrides: Partial<LoggerConfig>) {
  CONFIG = { ...CONFIG, ...overrides };
}

export const levelRank: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export { CONFIG };
