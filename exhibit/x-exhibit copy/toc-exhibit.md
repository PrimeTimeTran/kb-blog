1. **React Functional UI**
   - Raw eval/transpile loop
   - Single-file execution
   - Fastest feedback loop
   - Proved the editing/runtime concept

2. **React Live**
   - Raw eval/transpile loop
   - Single-file execution
   - Fastest feedback loop
   - Proved the editing/runtime concept

3. **Iframe POC**
   - Runtime isolation
   - Separate execution environment
   - Started solving refresh/reset/global collision problems
   - Introduced the “mini app runtime” direction instead of just “live JSX eval”

4. **Client-side assembly with string literals**
   - Fake filesystem/module graph via in-memory strings
   - Dynamic import-ish behavior
   - Started resembling a real bundler/runtime
   - Huge conceptual leap because components became composable instead of one giant blob

5. **Client-side assembly with SSR shells (app shell + template starter code)**
   - Most mature version so far
   - Shell/runtime separation
   - Incremental replacement of user code
   - Moving toward:
     - persistent runtime
     - HMR-style updates
     - virtual FS
     - app-router-like composition
     - “browser-native IDE” architecture

And yeah, I’d also say:

- the **ESM build experiments**
- full “real bundler in browser”
- import graph purity
- exact module semantics

…were mostly time sinks _relative to where the actual product insight was emerging_.

Not useless — because they clarified constraints — but they weren’t the core breakthrough.

The core breakthrough seems to be:

> “Can we fake just enough of a module/runtime system to create the feeling of a real IDE without implementing webpack/vite/turbopack in the browser?”

That’s the thread that consistently kept producing momentum.

The SSR-shell direction especially feels important because it shifted the architecture from:

> “execute code”

to:

> “maintain a long-lived application runtime and hot-swap pieces of it”

That’s a completely different category of system.

And honestly, the other important realization was probably:

- you do **not** want full correctness first
- you want:
  - believable dev ergonomics
  - persistent runtime state
  - component graph updates
  - isolated execution
  - filesystem illusion
  - predictable refresh semantics

That’s why the iframe + registry + virtual modules direction kept surviving iterations while the “real ESM/browser bundler purity” paths kept exploding in complexity.
