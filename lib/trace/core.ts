import { randomUUID } from 'crypto';

import { CONFIG } from './config';
import { normalizeTraceData } from './shapes';
import { shouldLog, resolveShape, banner, isTraceView, getColor } from './utils';
import type { LogLevel, TraceApi, TraceEmitOptions } from './types';

const IS_BUILD = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'production';
const TRACE_ENABLED = CONFIG.TRACE_ENABLED && !IS_BUILD;

function out(...args: any[]) {
  if (!TRACE_ENABLED) return;
  console.log(...args);
}

function err(...args: any[]) {
  if (!TRACE_ENABLED) return;
  console.error(...args);
}
export function createTrace(namespace: string): TraceApi {
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 6)
      : Math.random().toString(36).slice(2, 8);
  const color = getColor(id);

  const context = {
    startedAt: Date.now(),
    meta: {} as Record<string, any>,
  };

  function can(level: LogLevel = 'debug') {
    return TRACE_ENABLED && shouldLog(namespace, level);
  }

  function write(level: LogLevel, ...args: any[]) {
    if (!can(level)) return;
    out(...args);
  }

  function writeErr(level: LogLevel, ...args: any[]) {
    if (!can(level)) return;
    err(...args);
  }

  if (can('debug')) {
    write('debug', banner(color, `\n━━━ TRACE START ${namespace}:${id} ━━━`));
  }

  function setContext(partial: Record<string, any>) {
    context.meta = {
      ...context.meta,
      ...partial,
    };

    return api;
  }

  function emit(level: LogLevel, event: string, data?: unknown, opts: TraceEmitOptions = {}) {
    if (!can(level)) return;

    resolveShape(opts);

    const shaped = typeof data === 'object' ? normalizeTraceData(data, opts.depth ?? 2) : data;

    write(level, `${getColor(id)}[${namespace}:${level}]`, event);

    if (isTraceView(shaped)) {
      write(level, '  levels:');

      shaped.levels.forEach((l) => {
        write(level, '   ', l);
      });

      write(level, '  preview:', shaped.preview);

      if (CONFIG.TRACE_RAW) {
        write(level, '  raw:');
        console.dir(shaped.raw, {
          depth: null,
        });
      }
    } else if (shaped !== undefined) {
      write(level, '  value:', shaped);
    }
  }

  const api: TraceApi = {
    id,

    setContext,

    log(level: LogLevel, event: string, data?: unknown, opts?: TraceEmitOptions) {
      emit(level, event, data, opts);
      return api;
    },

    mark(event: string, data?: unknown, opts?: TraceEmitOptions) {
      emit('info', event, data, opts);
      return api;
    },

    debug(event: string, data?: unknown, opts?: TraceEmitOptions) {
      return api.log('debug', event, data, opts);
    },

    info(event: string, data?: unknown, opts?: TraceEmitOptions) {
      return api.log('info', event, data, opts);
    },

    warn(event: string, data?: unknown, opts?: TraceEmitOptions) {
      return api.log('warn', event, data, opts);
    },

    error(event: string, data?: unknown, opts?: TraceEmitOptions) {
      return api.log('error', event, data, opts);
    },

    pick<T>(list: T[], index: number, label = 'PICK') {
      const item = list?.[index];

      write('debug', banner(getColor(id), `[${namespace}:${id}] ${label}[${index}]`), item);

      return item;
    },

    inspect(obj: any, path: (string | number)[]) {
      const value = path.reduce((acc, key) => acc?.[key], obj);

      write('debug', banner(getColor(id), `[${namespace}:${id}] INSPECT ${path.join('.')}`), value);

      return value;
    },

    async span<T>(label: string, fn: (span: any) => Promise<T> | T): Promise<T> {
      const startedAt = Date.now();

      write('debug', banner(getColor(id), `[${namespace}:${id}] ▶ ${label}`));

      try {
        const result = await fn(api);

        write(
          'debug',
          '\x1b[90m',
          {
            span: label,
            duration: Date.now() - startedAt,
          },
          '\x1b[0m',
        );

        return result;
      } catch (error) {
        writeErr('error', banner(getColor(id), `[${namespace}:${id}] ✖ ${label}`));

        writeErr('error', error);

        throw error;
      }
    },

    end() {
      if (!can('debug')) return;

      write('debug', banner(color, `━━━ TRACE END ${namespace}:${id} ━━━`));

      if (Object.keys(context.meta).length > 0) {
        write('debug', '\x1b[90m', context.meta, '\x1b[0m');
      }

      write(
        'debug',
        '\x1b[90m',
        {
          duration: Date.now() - context.startedAt,
        },
        '\x1b[0m\n',
      );
    },
  };

  return api;
}
