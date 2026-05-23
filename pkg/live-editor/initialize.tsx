export function injectReact(compiledCode, version) {
  return `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://localhost:3000/react.js"></script>
  <script src="https://localhost:3000/reactdom.js"></script>
  <script>
    console.log('[IFRAME BOOT] version:', '${version}');
  </script>
  <!-- Force browser to load CDNs sequentially in their own blocks -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    #root {
      background-color: var(--color-surface);
    }
  </style>
</head>
<body>
  <div id="root" class='bg-surface'></div>
    <script>
    setTimeout(() => {
      try {
        console.log('[IFRAME RUNTIME START]', '${version}');

        if (typeof ReactDOM === 'undefined') {
          throw new ReferenceError('ReactDOM is not defined at runtime initialization.');
        }

        // 1. Evaluate your compiled code so App is globally available
        ${compiledCode}
        console.log('[IFRAME COMPILED EXECUTED]', '${version}');

        // 2. Render the app
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(App));

      } catch (err) {
        console.error('[IFRAME ERROR]', err);
        document.body.innerHTML =
          '<pre style="color:red;padding:16px;">' + (err.stack || err) + '</pre>';
      }
    }, 0);
  </script>
</body>
</html>`;
}

export const initialCode = `function Counter({ label }) {
  const [count, setCount] = React.useState(0);
  const [step, setStep] = React.useState(1);
  const [locked, setLocked] = React.useState(false);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-md p-6 shadow-lg shadow-black/40">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-white/60">{label}</h2>
        <button
          onClick={() => setLocked((v) => !v)}
          className={\`text-xs px-2 py-1 rounded-md border transition \${
            locked
              ? 'border-red-500/40 text-red-300 bg-red-500/10'
              : 'border-white/10 text-white/50 hover:text-white'
          }\`}
        >
          {locked ? 'Locked' : 'Unlocked'}
        </button>
      </div>

      <div className="text-5xl font-bold text-center text-green-400 mb-4 tracking-tight">
        {count}
      </div>

      <div className="flex gap-2 justify-center mb-4">
        <button
          disabled={locked}
          onClick={() => setCount((c) => c + step)}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition text-sm disabled:opacity-40"
        >
          +{step}
        </button>

        <button
          disabled={locked}
          onClick={() => setCount((c) => c - step)}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition text-sm disabled:opacity-40"
        >
          -{step}
        </button>

        <button
          disabled={locked}
          onClick={() => setCount(0)}
          className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition text-sm disabled:opacity-40"
        >
          reset
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-white/50">
        <span>step</span>
        <input
          disabled={locked}
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="w-32 accent-green-400"
        />
      </div>
    </div>
  );
}

function App() {
  const [themePulse, setThemePulse] = React.useState(0);
  const [globalOffset, setGlobalOffset] = React.useState(0);
  const [showGrid, setShowGrid] = React.useState(true);

  console.log('App render');

  return (
    <div
      className={\`h-screen w-screen flex flex-col items-center justify-center gap-6 transition-all \${
        showGrid
          ? 'bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.15),transparent_40%)]'
          : 'bg-zinc-950'
      } text-white overflow-hidden\`}
    >
      {/* top controls */}
      <div className="flex items-center gap-3 text-xs text-white/60">
        <button
          onClick={() => setShowGrid((v) => !v)}
          className="px-3 py-1 rounded-md border border-white/10 hover:bg-white/10"
        >
          toggle bg
        </button>

        <button
          onClick={() => setThemePulse((v) => v + 1)}
          className="px-3 py-1 rounded-md border border-white/10 hover:bg-white/10"
        >
          pulse {themePulse}
        </button>

        <button
          onClick={() => setGlobalOffset((v) => v + 1)}
          className="px-3 py-1 rounded-md border border-white/10 hover:bg-white/10"
        >
          shift {globalOffset}
        </button>
      </div>

      {/* counters */}
      <div className="flex gap-6 flex-wrap justify-center">
        <Counter label="alpha" />
        <Counter label="beta" />
        <Counter label="gamma" />
      </div>
    </div>
  );
}`;
