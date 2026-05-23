import { CONFIG, levelRank } from './config';

import type { LogLevel, LogShape, TraceView, TraceEmitOptions } from './types';

export function getCallerLocation(depth = 3) {
  const stack = new Error().stack?.split('\n');
  if (!stack || stack.length <= depth) return null;

  const line = stack[depth]?.trim();
  return line || null;
}

export function matchesDebugNamespace(namespace: string) {
  const patterns = CONFIG.DEBUG.split(',').map((x) => x.trim());

  return patterns.some((pattern) => {
    if (pattern === '*') {
      return true;
    }

    if (pattern.endsWith('*')) {
      return namespace.startsWith(pattern.slice(0, -1));
    }

    return namespace === pattern;
  });
}

export function shouldLog(namespace: string, level: LogLevel) {
  if (!CONFIG.TRACE_ENABLED) {
    return false;
  }

  if (levelRank[level] < levelRank[CONFIG.LOG_LEVEL]) {
    return false;
  }

  return matchesDebugNamespace(namespace);
}

export function resolveShape(opts?: TraceEmitOptions): LogShape {
  return opts?.shape ?? CONFIG.LOG_SHAPE;
}

export function banner(color: string, text: string) {
  const reset = '\x1b[0m';
  return `${color}${text}${reset}`;
}

export function getColor(id: string) {
  const colors = ['\x1b[36m', '\x1b[33m', '\x1b[35m', '\x1b[32m', '\x1b[34m'];

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

export function getEnabled(): Set<string> {
  return new Set(
    CONFIG.DEBUG.split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

/* ─────────────────────────────────────────────
   TRACE FACTORY
───────────────────────────────────────────── */
export function isTraceView(x: any): x is TraceView {
  return x && typeof x === 'object' && Array.isArray(x.levels) && Array.isArray(x.preview) && 'raw' in x;
}
