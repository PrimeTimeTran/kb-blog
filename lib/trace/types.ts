/* ─────────────────────────────────────────────
   LOGGING
───────────────────────────────────────────── */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogShape = 'summary' | 'shallow' | 'deep' | 'inspect';

/* ─────────────────────────────────────────────
   TRACE DATA
───────────────────────────────────────────── */

export type Primitive = string | number | boolean | null | undefined;

export interface TraceView {
  levels: string[];
  preview: [string, unknown][];
  raw: unknown;
}

export type TraceObject = Record<string, unknown>;

export type TraceData = Primitive | Primitive[] | TraceView | TraceObject | unknown[];

/* ─────────────────────────────────────────────
   OPTIONS
───────────────────────────────────────────── */

export interface TraceEmitOptions {
  shape?: LogShape;
  depth?: number;
}

export interface TraceOptions {
  shape?: LogShape;
}

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */

/**
 * LoggerConfig defines how runtime observability behaves in a given environment.
 *
 * Think of this as the "lens" through which your system is observed.
 * It does NOT change behavior of the program — it changes what you are allowed to see.
 */
export interface LoggerConfig {
  /**
   * LOG_LEVEL
   * ----------------------------
   * The global visibility threshold for logs.
   *
   * Think of this as:
   * "How noisy am I willing to let the system be?"
   *
   * Examples:
   * - 'debug' → show everything (development)
   * - 'info'  → show meaningful events only (staging/prod debugging)
   * - 'warn'  → only problems and warnings
   * - 'error' → only failures
   *
   * Logs below this level are filtered out entirely.
   */
  LOG_LEVEL: LogLevel;

  /**
   * DEBUG (Namespace filter)
   * ----------------------------
   * A namespace-based filter for debug logs.
   *
   * Think of this as:
   * "Which subsystem am I currently interested in?"
   *
   * Examples:
   * - "content:*" → show debug logs only for content pipeline
   * - "trace:*"   → show trace system internals
   * - "*"         → enable all debug namespaces
   *
   * This is NOT a level — it's a scope selector for debug noise.
   */
  DEBUG: string;

  /**
   * LOG_SHAPE
   * ----------------------------
   * Controls the structure of emitted logs.
   *
   * Think of this as:
   * "What format do logs take when they leave the system?"
   *
   * Examples:
   * - 'pretty' → human readable terminal logs
   * - 'json'   → structured machine-readable logs
   *
   * This is what determines observability integration quality.
   */
  LOG_SHAPE: LogShape;

  /**
   * TRACE_SOURCE
   * ----------------------------
   * Whether logs should include origin metadata.
   *
   * Think of this as:
   * "Do I want to know where this log came from?"
   *
   * When enabled:
   * - file name
   * - function name
   * - call site
   *
   * Useful for debugging pipelines and tracing execution flow.
   */
  TRACE_SOURCE: boolean;

  /**
   * TRACE_RAW
   * ----------------------------
   * Whether to include raw unformatted payloads in logs.
   *
   * Think of this as:
   * "Do I want the full unprocessed truth?"
   *
   * Useful when debugging:
   * - serialization issues
   * - transformation pipelines
   * - data loss between stages
   *
   * But noisy in production.
   */
  TRACE_RAW: boolean;
  /**
   * Master switch.
   */
  TRACE_ENABLED: boolean;
}

/* ─────────────────────────────────────────────
   TRACE API
───────────────────────────────────────────── */

/**
 * TraceApi represents a single execution trace context.
 *
 * Think of it as:
 * "A living record of everything that happens during one unit of work"
 *
 * Usually that unit of work is:
 * - a request (HTTP)
 * - a command
 * - a pipeline run
 *
 * It combines:
 * - structured logging
 * - performance spans
 * - contextual metadata
 */
export interface TraceApi {
  /**
   * Unique trace identifier.
   *
   * Think of this as:
   * "The request/session fingerprint"
   *
   * Used to correlate logs across:
   * - spans
   * - events
   * - nested operations
   */
  id: string;

  /**
   * setContext
   * ----------------------------
   * Attaches persistent metadata to the trace.
   *
   * Think of this as:
   * "Global labels applied to everything inside this trace"
   *
   * Examples:
   * - userId
   * - slug
   * - collection name
   * - request type
   *
   * This data is automatically included in all logs/events/spans.
   */
  setContext(partial: Record<string, unknown>): TraceApi;

  /**
   * log
   * ----------------------------
   * Low-level logging primitive.
   *
   * Think of this as:
   * "Emit a raw observability event with a level"
   *
   * Use when:
   * - you need explicit control over log level
   * - building higher-level helpers (event/debug/info/warn/error)
   */
  log(level: LogLevel, event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi;

  /**
   * mark
   * ----------------------------
   * Records a named checkpoint in the execution trace.
   *
   * Think of this as:
   * "A point-in-time annotation on the lifecycle of a request"
   *
   * It does NOT represent severity or an error condition.
   * It simply describes *what happened* at this point in execution.
   *
   * This is used to build a readable timeline of system behavior.
   *
   * Examples:
   * - REQUEST_RECEIVED
   * - CONTENT_LOADED
   * - PIPELINE_STARTED
   * - EMBED_RESOLVED
   *
   * Typically emitted at INFO level, but the semantic meaning
   * is independent of log severity.
   */
  mark(event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi;

  /**
   * debug
   * ----------------------------
   * Internal diagnostic logging.
   *
   * Think of this as:
   * "I am explaining my internal reasoning"
   *
   * Not important for production behavior,
   * but critical for debugging system internals.
   */
  debug(event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi;

  /**
   * info
   * ----------------------------
   * Important but non-error system events.
   *
   * Think of this as:
   * "This is a meaningful milestone in execution"
   */
  info(event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi;

  /**
   * warn
   * ----------------------------
   * Unexpected but recoverable conditions.
   *
   * Think of this as:
   * "Something is off, but I can continue"
   */
  warn(event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi;

  /**
   * error
   * ----------------------------
   * Failure state logging.
   *
   * Think of this as:
   * "Execution path failed or produced invalid state"
   *
   * Usually triggers:
   * - stack capture
   * - error aggregation
   * - alerting systems
   */
  error(event: string, data?: unknown, opts?: TraceEmitOptions): TraceApi;

  /* ─────────────────────────────
     UTILITIES
  ───────────────────────────── */

  /**
   * pick
   * ----------------------------
   * Safe array inspection helper for tracing decisions.
   *
   * Think of this as:
   * "Show me what was chosen at runtime and why"
   *
   * Useful for:
   * - debugging branching logic
   * - explaining selection decisions in logs
   */
  pick<T>(list: readonly T[], index: number, label?: string): T | undefined;

  /**
   * inspect
   * ----------------------------
   * Safe deep inspection utility.
   *
   * Think of this as:
   * "Show me a slice of a complex object at a path"
   *
   * Used to avoid dumping full objects while still gaining visibility.
   */
  inspect<T>(obj: T, path: readonly (string | number)[]): unknown;

  /* ─────────────────────────────
     SPANS
  ───────────────────────────── */

  /**
   * span
   * ----------------------------
   * Measures and labels a unit of asynchronous work.
   *
   * Think of this as:
   * "Time a block of logic and report its duration automatically"
   *
   * Provides:
   * - start time
   * - end time
   * - duration
   * - success/failure boundary
   *
   * Used for performance profiling and execution breakdown.
   */
  span<T>(label: string, fn: (span: TraceApi) => Promise<T> | T): Promise<T>;

  /* ─────────────────────────────
     LIFECYCLE
  ───────────────────────────── */

  /**
   * end
   * ----------------------------
   * Marks the end of a trace lifecycle.
   *
   * Think of this as:
   * "We are done observing this unit of work"
   *
   * After this:
   * - no more events should be emitted
   * - trace is considered complete
   */
  end(): void;
}
