import { LogLevel, LogShape, LoggerConfig } from './types';

export const levelRank: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

let CONFIG: LoggerConfig = {
  LOG_LEVEL: (process.env.LOG_LEVEL as LogLevel) || 'debug',
  LOG_SHAPE: (process.env.LOG_SHAPE as LogShape) || 'summary',
  DEBUG: process.env.DEBUG || 'content:get',
  TRACE_RAW: false,
  TRACE_SOURCE: true,
  TRACE_ENABLED: process.env.TRACE_ENABLED !== 'false',
};

export function setLoggerConfig(overrides: Partial<LoggerConfig>) {
  CONFIG = {
    ...CONFIG,
    ...overrides,
  };
}

export function getLoggerConfig() {
  return CONFIG;
}

export { CONFIG };
