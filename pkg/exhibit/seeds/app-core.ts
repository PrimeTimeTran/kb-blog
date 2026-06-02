const go = `
<script>
  window.__VFS__ = window.parent.runtime;

  window.require = (id) => window.__VFS__.customRequire(id);

  window.module = { exports: {} };
  window.exports = window.module.exports;
</script>
`;

export default {
  isReady: false,
  // --- 1. CONFIGURATION & STATE ---
  vfs: {},
  root: null,
  // Which file contains the root component?
  // <App />?.
  // That's the purpose of this
  ENTRY_PATH: null,
  messageQueue: [],
  moduleRegistry: {},

  // --- 2. LIFECYCLE & RENDERING ---
  init() {
    // 1. Listen for standard postMessages (from the IDE)
    window.addEventListener('message', (event) => {
      // Use the arrow function () => to bind 'this' automatically
      this.processMessage(event.data);
    });

    // 3. Process queued messages
    while (this.messageQueue.length > 0) {
      this.processMessage(this.messageQueue.shift());
    }
  },
  ensureRoot() {
    if (!this.root) {
      const rootEl =
        document.getElementById('root') ||
        document.body.appendChild(Object.assign(document.createElement('div'), { id: 'root' }));
      this.root = ReactDOM.createRoot(rootEl);
    }
    return this.root;
  },
  notifyErrorless() {
    window.AppCore.clearErrorOverlay();
    window.parent.postMessage({ type: 'ui:errorless' }, '*');
  },
  render(path) {
    const mod = this.customRequire(path);

    // -----------------------------
    // 1. STATIC ASSETS
    // -----------------------------
    if (mod?.type === 'static' || typeof mod?.default === 'string') {
      return this.renderStatic(path, mod);
    }

    // -----------------------------
    // 2. HTML MODULES
    // -----------------------------
    if (mod?.__type === 'html') {
      return this.renderHTML(mod.__html);
    }

    // -----------------------------
    // 3. CSS MODULES
    // -----------------------------
    if (mod?.__type === 'css') {
      return this.loadCSS(path, mod);
    }

    // -----------------------------
    // 4. JSON / DATA MODULES
    // -----------------------------
    if (mod && typeof mod === 'object' && !mod.default && !mod.render) {
      console.log('📦 Data module (no render):', mod);
      return mod;
    }

    // -----------------------------
    // 5. REACT MODULES (ONLY VALID CASE)
    // -----------------------------
    const Component = mod.default ?? mod;

    if (typeof Component !== 'function') {
      throw new Error(`Unsupported entry type: ${typeof Component}. Path: ${path}`);
    }
    window.AppCore.notifyErrorless();
    const root = this.ensureRoot();
    root.render(window.React.createElement(Component));
  },
  renderStatic(path, mod) {
    const ext = path.split('.').pop();

    switch (ext) {
      case 'html':
        return this.renderHTML(mod.default);

      case 'css':
        return this.loadCSS(path, mod.default);

      case 'md':
        return this.renderMarkdown(mod.default);

      case 'txt':
        return this.renderText(mod.default);

      default:
        console.log('📄 Static asset ignored:', path);
    }
  },
  renderHTML(html) {
    const root = this.ensureRoot();
    root.innerHTML = html;
  },
  renderText(text) {
    const root = this.ensureRoot();
    root.innerText = text;
  },
  renderMarkdown(md) {
    const html = window.marked?.parse?.(md) ?? md;
    return this.renderHTML(html);
  },
  mountHTML(html) {
    let container = document.getElementById('html-root');

    if (!container) {
      container = document.createElement('div');
      container.id = 'html-root';
      document.body.appendChild(container);
    }

    container.innerHTML = html;
  },
  addErrorOverlay(payload) {
    const overlay = document.getElementById('error-overlay');
    let msg = `❌ Runtime Error\n\n`;
    if (payload.loc) {
      msg += `Line ${payload.loc.line}, Col ${payload.loc.column}\n`;
    }
    msg += `${payload.message}\n\n`;
    const textBody = document.getElementById('error-overlay-text');
    textBody.textContent = msg;
    overlay.style.display = 'block';
  },
  clearErrorOverlay() {
    const overlay = document.getElementById('error-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  },
  // --- 3. MODULE SYSTEM (VFS ENGINE) ---
  syncRegistry(files) {
    this.moduleRegistry = {};
    Object.entries(files || {}).forEach(([path, file]) => {
      this.registerModule(path, file.content);
    });
  },

  loadFile(path, callerPath = './') {
    const resolvedPath = this.resolvePath?.(path, callerPath) ?? path;

    const file = this.vfs?.[resolvedPath];

    if (!file) {
      throw new Error(`Cannot resolve file: ${path} from ${callerPath}`);
    }

    const type = getFileType(resolvedPath);

    switch (type) {
      case 'module':
        return this.loadModule(resolvedPath);

      case 'html':
        return this.loadHTML(resolvedPath, file.content);

      case 'css':
        return this.loadCSS(resolvedPath, file.content);

      case 'markdown':
        return this.loadMarkdown(file.content);

      case 'json':
        try {
          return JSON.parse(file.content);
        } catch (e) {
          this.reportError(e);
          return null;
        }

      case 'text':
        return file.content;

      default:
        return file.content;
    }
  },
  loadHTML(path, html) {
    // OPTION A: just return for JSX-style usage
    return {
      __type: 'html',
      __html: html,
    };

    // OPTION B (IDE mode): auto-mount
    // this.mountHTML(html);
    // return {};
  },
  loadCSS(path, css) {
    if (typeof document === 'undefined') return;

    let styleTag = document.querySelector(`style[data-vfs="${path}"]`);

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.setAttribute('data-vfs', path);
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = css;

    return { __type: 'css' };
  },
  loadMarkdown(md) {
    // optional dependency-safe fallback
    if (typeof window === 'undefined') return md;

    if (window.marked) {
      return {
        __type: 'markdown',
        __html: window.marked.parse(md),
      };
    }

    return md;
  },

  normalizePath(p) {
    return '/' + p?.replace(/^\/+/, '').replace(/\/+/g, '/');
  },
  resolvePath(target, base) {
    if (!target.startsWith('.')) return target;

    const baseDir = base.substring(0, base.lastIndexOf('/'));
    return `${baseDir}/${target.replace('./', '')}`.replace(/\/+/g, '/');
  },
  isBareModule(id) {
    return !id.startsWith('.') && !id.startsWith('/');
  },
  toKey(p) {
    return this.normalizePath('/' + p.replace(/^\/+/, ''));
  },
  registerModule(path, content) {
    try {
      const ext = path.split('.').pop()?.toLowerCase();
      const key = this.toKey(path);

      // --------------------------------------------
      // 1. STATIC ASSETS (NO EXECUTION)
      // --------------------------------------------
      const STATIC_EXT = new Set(['html', 'md', 'txt', 'css', 'json']);
      if (STATIC_EXT.has(ext)) {
        let exports;

        switch (ext) {
          case 'json':
            exports = JSON.parse(content);
            break;
          default:
            exports = content;
        }

        this.moduleRegistry[key] = {
          exports: { default: exports },
          factory: null,
          wasExecuted: true,
          type: 'static',
        };

        console.log(`📄 Registered static asset: ${path}`);
        return;
      }
      // --------------------------------------------
      // 2. EXECUTABLE MODULES
      // --------------------------------------------
      const { transformSync } = require('@babel/core');

      const transformed = transformSync(content, {
        filename: key,
        babelrc: false,
        configFile: false,
        presets: [
          ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
          ['@babel/preset-react', { runtime: 'automatic' }],
        ],
        plugins: [require('@babel/plugin-transform-modules-commonjs')],
      }).code;

      if (transformed.includes('export default') || transformed.includes('export {')) {
        throw new Error('Babel ESM output detected — CommonJS transform failed');
      }

      // const factory = new Function('module', 'exports', 'require', transformed);
      const factory = new Function(
        'module',
        'exports',
        'require',
        `
            return (function(module, exports, require) {
              ${transformed}
            })(module, exports, require);
            `,
      );

      this.moduleRegistry[key] = {
        exports: {},
        factory,
        wasExecuted: false,
        type: 'module',
      };
      console.log(`⚙️ Registered module: ${path}`);
    } catch (err) {
      console.error(`❌ Execution error in ${path}:`, err);
      this.reportError(err);
      throw err;
    }
  },
  customRequire(modulePath, callerPath = '/') {
    // --------------------------------------------
    // 1. EXTERNAL / BARE MODULES
    // --------------------------------------------
    if (this.isBareModule(modulePath)) {
      const external = this.getExternalDep(modulePath);
      if (external) return external;
      throw new Error(`Missing external dependency: ${modulePath}`);
    }
    // --------------------------------------------
    // 2. RESOLVE PATH (ONLY RELATIVE HANDLING HERE)
    // --------------------------------------------
    const fullPath = this.resolvePath(modulePath, callerPath);
    const key = this.toKey(fullPath);
    const mod = this.moduleRegistry[key];
    if (!mod) {
      throw new Error(`Cannot resolve: ${modulePath} (resolved: ${key})`);
    }
    // --------------------------------------------
    // 3. STATIC MODULE
    // --------------------------------------------
    if (mod.type === 'static') {
      return {
        type: 'static',
        default: mod.exports.default,
      };
    }
    // --------------------------------------------
    // 4. EXECUTION (STRICT ONCE GUARANTEE)
    // --------------------------------------------
    if (mod.factory && !mod.wasExecuted) {
      mod.wasExecuted = true;
      const boundRequire = (p) => this.customRequire(p, key);
      mod.factory(mod, mod.exports, boundRequire);
    }
    return mod.exports;
  },
  getExternalDep(id) {
    if (id === '@babel/core') {
      return require('@babel/core');
    }
    if (id === '@babel/preset-react') {
      return require('@babel/preset-react');
    }
    if (id === '@babel/preset-typescript') {
      return require('@babel/preset-typescript');
    }
    if (id === '@babel/plugin-transform-modules-commonjs') {
      return require('@babel/plugin-transform-modules-commonjs');
    }
    if (id === 'react') return React;
    if (id === 'react/jsx-runtime') return jsxRuntime;
    return null;
  },

  Handlers: {
    'runtime:boot': (ctx, payload) => {
      // [SETUP FRAMEWORK/RUNTIME]
      ctx.ENTRY_PATH = payload.entry || './5-design-system/1-Application.tsx';
      ctx.vfs = payload.files;
      ctx.processMessage({ type: 'vfs:update', payload: { files: payload.files } });
    },
    // --- UI & System Operations ---
    // theme:change, ui:error, vfs:update, vfs: sync, file:select,
    'theme:change': (ctx, { theme }) => {
      const newTheme = theme == 'dark';
      console.info('🎨 Change', { theme });
      document.documentElement.dataset.theme = theme;
      document.body.style.background = theme === 'dark' ? '#0b0b0f' : '#ffffff';
    },
    'ui:error': (ctx, { message, stack, loc }) => {
      console.error('❌ ui:error ');
      ctx.onError(message, { loc, stack });
    },
    'vfs:update': (ctx, payload) => {
      // [SETUP VFS]
      console.log('🗂️ vfs:update!');
      if (!payload?.files) {
        console.error("⚠️ vfs:update received but 'files' missing!");
        return;
      }
      // ctx.ENTRY_PATH = payload.entryPoint || './hello-world/page.tsx';
      ctx.syncRegistry(payload.files);
      ctx.bootRender(payload.entryPoint || ctx.ENTRY_PATH);
    },
    'vfs:sync': (ctx, payload) => {
      console.log('🗂️ vfs:sync');
      // File update, name change, meta data (which directory, extension, etc)
      if (!payload?.path || payload.content === undefined) {
        console.warn('⚠️ vfs:sync received invalid data');
        return;
      }
      ctx.registerModule(payload.path, payload.content);
      ctx.render(ctx.ENTRY_PATH);
    },
    'vfs:file:select': (ctx, { path }) => {
      console.log('🗂️ vfs:file:select');
      // Logic: Change active state without re-rendering the whole app
      ctx.activeFile = path;
      console.log(`📂 Editor focused on: ${path}`);
      // Potentially notify parent to update editor cursor position
      window.parent.postMessage({ type: 'ui:editor-focus', path }, '*');
    },
  },
  // --- 4. COMMUNICATION & HMR ---
  processMessage(msg) {
    // console.log('[IFRAME APP CORE MSG] ...msg');
    // 1. Ensure a basic structure exists
    if (!msg || !msg.type) return;
    if (!this.isReady) {
      this.messageQueue.push(e.msg);
      return;
    }
    const handler = this.Handlers[msg.type];
    if (!handler) {
      console.warn(`⚠️ Unhandled message type: ${msg.type}`);
      return;
    }
    // 2. Defensive Payload Extraction
    // Even if the IDE sends nothing, we pass an empty object {}
    const payload = msg.payload || {};
    try {
      handler(this, payload);
    } catch (err) {
      // 3. Centralized Error Handling
      this.reportError(err);
    }
  },
  setupHMR() {
    const socket = new WebSocket('ws://localhost:8080/browser');
    console.log('✅ WS Connected');
    socket.onmessage = async (event) => {
      console.log('📝 WS Connected');
      const data = JSON.parse(event.data instanceof Blob ? await event.data.text() : event.data);
      this.processMessage(data);
    };
  },
  reportError(err) {
    console.log({ err });
    console.error('⛔️ Error: Module System Error:', err);
    window.AppCore.addErrorOverlay(err);
    window.parent.postMessage({ type: 'iframe:error', payload: { message: err.message } }, '*');
  },
  markReady() {
    this.isReady = true;
    // Process anything that arrived while we were booting
    this.messageQueue.forEach((msg) => this.processMessage({ data: msg }));
    this.messageQueue = [];
  },
  bootRender(path = '') {
    const mod = this.customRequire(path);

    // -----------------------------------
    // 1. STATIC FILES
    // -----------------------------------
    if (mod?.type === 'static') {
      const ext = path.split('.').pop()?.toLowerCase();

      switch (ext) {
        case 'html':
          this.mountHTML(mod.default);
          return;
        case 'css':
          this.loadCSS(path, mod.default);
          return;
        case 'md':
          this.renderMarkdown(mod.default);
          return;
        case 'json':
          console.log('JSON entry:', mod.default);
          return;
        case 'txt':
          this.mountText(mod.default);
          return;
        default:
          throw new Error(`Unsupported static entry: ${path}`);
      }
    }

    // -----------------------------------
    // 2. REACT MODULES
    // -----------------------------------
    const Component = mod?.default ?? mod;

    if (typeof Component === 'function') {
      const root = this.ensureRoot();
      root.render(React.createElement(Component));
      return;
    }

    throw new Error(`Unsupported entry type: ${typeof Component}`);
  },
  boot: () => {
    console.log('✅ DOMContentLoaded');
    window.AppCore.setupHMR();
    window.AppCore.markReady();
    window.parent.postMessage({ type: 'iframe:ready' }, '*');
  },
};
