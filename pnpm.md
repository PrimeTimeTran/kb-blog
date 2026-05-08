# 📦 How pnpm quietly fixed a broken “local package” workflow

At some point in building a multi-project setup, things start to blur:

- one app is running the UI
- another is the actual package you’re developing
- a third is the test client where everything should “just work”

That’s exactly where things usually break down.

This is where **pnpm ended up mattering more than expected**.

---

# 🧱 The setup we were dealing with

We had three moving parts:

- 🟦 **runner**: `/Users/future/l.blog`
  (where the package is actively developed)

- 📦 **package**: `/Users/future/l.blog/packages/docksystem`
  (the actual UI system being built)

- 🟩 **client**: `/Users/future/KB/project/showcase-3`
  (the real Next.js app consuming it)

The goal:

> Change code in the package → instantly reflect in the client

---

# 💥 The problem before pnpm “clicked”

Even though the package was linked locally, the workflow felt inconsistent:

- updates sometimes didn’t show
- installs felt “cached”
- builds didn’t reflect new changes reliably
- Tailwind + build artifacts made things even more confusing

At times it looked like:

> “I updated the package, but the client is still running old behavior”

Which is the worst kind of ambiguity in a dev loop.

---

# 🧠 What pnpm actually changed

The key shift wasn’t “faster installs” — it was this:

## pnpm enforces a real, explicit link between projects

Instead of silently hoisting or duplicating modules like npm/yarn often do, pnpm:

- uses strict node linking
- preserves workspace references cleanly
- makes local `file:` dependencies deterministic

So when we had:

```json
"@primetimetran/docksystem": "file:../../../l.blog/packages/docksystem"
```

pnpm ensured:

> “this is the actual source directory — not a cached copy”

---

# 🔁 Why updates suddenly became consistent

Once pnpm was in control:

### Before

- dependency graph was fuzzy
- rebuild timing mattered
- `.next` cache could hide changes
- node_modules duplication caused confusion

### After

- client always resolves the same local package
- updates are deterministic
- reinstall = clean graph refresh
- no accidental “stale package illusion”

---

# 🧪 The moment it actually mattered

The biggest win wasn’t theoretical.

It showed up when:

- rebuilding the package
- publishing a new local version
- reinstalling in the client
- running `pnpm update && restart`

Suddenly:

> the client actually reflected the latest package code reliably

No guessing.

No “maybe cache?”

Just consistent behavior.

---

# 🧠 The real insight

pnpm didn’t “fix” the system.

It did something more subtle:

> It removed ambiguity from dependency resolution.

And in multi-package systems, ambiguity is the real bug.

---

# ⚙️ What pnpm gave us (in practice)

- predictable local linking
- stable dependency graph across projects
- fewer “it works in runner but not client” moments
- clearer mental model of what code is actually running

---

# 🚀 Where this goes next

Once this foundation is stable, you can safely build:

- UI packages with compiled assets (CSS, tokens, themes)
- command systems shared across apps
- versioned internal design systems
- multi-app monorepo workflows

Without constantly asking:

> “am I actually running the latest code?”

---

# 🧭 Closing thought

pnpm didn’t feel important at first.

It just made installs cleaner.

But in a multi-project setup, it quietly becomes the thing that decides whether your workflow feels:

- chaotic ❌
- or deterministic ✅
