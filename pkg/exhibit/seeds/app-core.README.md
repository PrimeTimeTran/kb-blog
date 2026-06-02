# 📘 README: Module Runtime Strategy (VFS + Iframe System)

This project supports **two module execution modes**. Both are valid, but they require fundamentally different runtime assumptions.

---

# ⚖️ Mode 1 — CommonJS (Node-style runtime)

## 🧠 Concept

This mode compiles all modules into **CommonJS** using Babel:

- `require()`
- `module.exports`
- `exports`

It behaves like a **mini Node.js runtime**, even inside an iframe or VFS.

---

## 🔧 Babel configuration

```js
// babel.config.js (or inline transform)
{
  presets: [
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    require('@babel/plugin-transform-modules-commonjs')
  ]
}
```

---

## ⚙️ Runtime requirements (IMPORTANT)

You MUST provide a Node-like environment:

- `require(id)` → resolves via VFS
- `module = { exports: {} }`
- `exports`
- execution wrapper (`new Function` or equivalent)

---

## 🧩 Iframe bootstrap

```js
window.__VFS__ = runtime;

window.require = (id) => window.__VFS__.customRequire(id);

window.module = { exports: {} };
window.exports = window.module.exports;
```

---

## 📌 Execution model

```js
new Function('require', 'module', 'exports', code)(require, module, exports);
```

---

## ✅ Pros

- Matches Node.js mental model
- Works well with existing Babel transforms
- Easy dependency resolution logic (your VFS already supports it)

---

## ❌ Cons

- Requires runtime shims (`require`, `module`)
- Not browser-native
- More fragile in iframe environments

---

---

# ⚖️ Mode 2 — ES Modules (Browser-native runtime)

## 🧠 Concept

This mode keeps modules as **native ESM**:

- `import`
- `export`

No CommonJS transformation.

---

## 🔧 Babel configuration

```js
// babel.config.js (or inline transform)
{
  presets: [
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: []
}
```

---

## ⚙️ Runtime requirements

No `require`, no module shim.

You must use:

- dynamic `import()`
- URL-based module resolution (or VFS → blob URLs)

---

## 🧩 Iframe execution

```js
const mod = await import(moduleUrl);
```

OR VFS-backed loader:

```js
const mod = await vfs.import(modulePath);
```

---

## 📌 Execution model

Browser handles everything natively.

No manual function wrapping required.

---

## ✅ Pros

- Native browser support
- Cleaner mental model
- No require/module shims
- Better long-term direction

---

## ❌ Cons

- Requires async graph resolution
- More complex VFS integration
- Harder to replicate Node-like behavior
- Circular dependency handling changes

---

---

# 🧠 Decision rule

- If you want **Node-like behavior in iframe → use CommonJS**
- If you want **modern browser-native system → use ESM**

---

# 📦 Copy-paste runtime blocks

## 🔥 BLOCK 1 — CommonJS Runtime (your current system)

```js
// ============================
// COMMONJS VFS RUNTIME
// ============================

window.__VFS__ = runtime;

window.require = function (id) {
  return window.__VFS__.customRequire(id);
};

window.module = { exports: {} };
window.exports = module.exports;

// execute module
function runModule(code) {
  const module = { exports: {} };
  const exports = module.exports;

  return new Function('require', 'module', 'exports', code)(window.require, module, exports);
}
```

---

## 🌐 BLOCK 2 — ES Module Runtime (future-proof system)

```js
// ============================
// ESM VFS RUNTIME
// ============================

window.__VFS__ = runtime;

async function vfsImport(path) {
  const code = window.__VFS__.getModuleCode(path);

  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);

  const mod = await import(url);

  URL.revokeObjectURL(url);

  return mod;
}

window.vfsImport = vfsImport;
```

---

# 🚀 Final takeaway

Right now your system is:

> ⚙️ “CommonJS emulation inside a browser”

That’s why you needed Babel CJS transform + require shim.

If you ever switch to ESM mode, you can delete ~50% of your runtime complexity.
