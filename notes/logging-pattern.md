# Logging / Tracing / Debugging (Design Pattern Notes)

## 🧠 Core principle

Logging is not about printing information — it is about **reconstructing system behavior over time**.

A good logging system should answer:

- What happened?
- In what order?
- With what inputs?
- What decisions were made?
- Why did something fail?

If it can’t reconstruct execution, it’s just noise.

---

## 🧱 Three layers of observability

### 1. Logs (global, stateless)

Used for:

- system-level events
- coarse debugging
- long-term signals

Examples:

- server started
- cache invalidation
- request rejected

**Key property:** no identity, no flow context

---

### 2. Traces (request / execution scoped)

Used for:

- following a single execution path
- debugging pipelines
- understanding step-by-step behavior

Examples:

- loadContent start → parse → bundle → return
- API request lifecycle
- MDX compilation steps

**Key property:** shared `traceId` across steps

---

### 3. Events (structured facts inside traces)

Used for:

- capturing meaningful state transitions
- replacing ad-hoc console logs
- building future debugging UIs

Examples:

- FILE_RESOLVED
- FRONTMATTER_PARSED
- MDX_BUNDLED

**Key property:** machine-readable, not string-based

---

## 🧠 Logging design rule

> Log structure, not interpretation.

Bad:

```js
console.log('parsed keys', Object.keys(data));
```

Good:

```js
trace.mark('PARSED', { keys: Object.keys(data) });
```

Why:

- raw data is preserved
- formatting is decoupled
- future tooling becomes possible

---

## 📦 Data shaping principle

Never decide _what to log_ based on debugging moment.

Instead:

> Always capture full data, decide later how to display it.

Use **log shapes**:

- `summary` → keys only (default)
- `shallow` → full object (safe)
- `inspect` → preview + structure
- `deep` → full serialization (debug only)

This allows:

- production-safe logging
- deep debugging without code changes

---

## ⚙️ Configuration philosophy

Logging should be controlled by **three independent axes**:

### 1. Namespace

What system?

- mdx
- bundle
- content

### 2. Level

How important?

- debug / info / warn / error

### 3. Shape

How much detail?

- summary / shallow / inspect / deep

This avoids mixing concerns.

---

## 🔁 Trace design rule

A trace should:

- be created per execution
- carry a unique id
- never leak into global state
- emit structured events only

Example lifecycle:

```
TRACE mdx:abc123
  LOAD_CONTENT_START
  FILE_RESOLVED
  FRONTMATTER_PARSED
  MDX_BUNDLED
  LOAD_CONTENT_DONE
```

---

## 🧪 Debugging philosophy

Good debugging systems:

- do not require code changes to inspect more detail
- do not require “adding console logs everywhere”
- allow post-hoc exploration of execution

Bad systems:

- require constant log editing
- mix strings + data randomly
- cannot reconstruct execution flow

---

## 🧭 Practical guideline

When unsure what to log:

### ❌ Don’t do this

- “Should I log this value?”

### ✅ Do this instead

- “Is this part of system behavior or just noise?”

If it is behavior → trace event
If it is noise → ignore or shape it

---

## 🚀 Evolution path (important)

A mature logging system evolves into:

1. console logs (early stage)
2. structured logs
3. trace-based execution logs
4. UI-based log viewer (timeline/debugger)
5. replayable system executions

Your current system is transitioning from (2 → 3).

---

## 🧠 Final principle

> Logs are not for developers to read.
> Logs are for systems to explain themselves.
