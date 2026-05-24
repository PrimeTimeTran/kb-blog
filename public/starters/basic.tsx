function Counter({ label }) {
  const [count, setCount] = React.useState(0);
  const [step, setStep] = React.useState(1);
  const [locked, setLocked] = React.useState(false);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-md p-6 shadow-lg shadow-black/40">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-mono text-white/60">{label}</h2>
        <button
          onClick={() => setLocked((v) => !v)}
          className={`text-xs px-2 py-1 rounded-md border transition ${
            locked ? 'border-red-500/40 text-red-300 bg-red-500/10' : 'border-white/10 text-white/50 hover:text-white'
          }`}
        >
          {locked ? 'Locked' : 'Unlocked'}
        </button>
      </div>

      <div className="text-5xl font-bold text-center text-green-400 mb-4 tracking-tight">{count}</div>

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

  return (
    <div
      className="
        relative h-screen w-screen flex flex-col items-center justify-center gap-6
        transition-colors duration-300 overflow-hidden
        text-[rgb(var(--fg))]
        bg-[rgb(var(--bg))]
      "
    >
      {/* background layer */}
      <div
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-300
          ${showGrid ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.15),transparent_40%)]" />
      </div>

      {/* controls */}
      <div className="relative z-10 flex items-center gap-3">
        {/* TOGGLE GRID */}
        <button
          onClick={() => setShowGrid((v) => !v)}
          className="
            flex items-center gap-2
            px-4 py-2 rounded-xl
            text-sm font-medium
            border border-white/10
            bg-white/5 hover:bg-white/10
            text-[rgb(var(--fg))]
            transition
          "
        >
          Toggle BG
        </button>

        {/* PULSE */}
        <button
          onClick={() => setThemePulse((v) => v + 1)}
          className="
              flex items-center gap-2
              px-4 py-2 rounded-xl
              text-sm font-medium
              border border-green-400/20
              bg-green-400/10 hover:bg-green-400/20
              text-green-300
              transition
            "
        >
          Pulse
        </button>

        {/* SHIFT */}
        <button
          onClick={() => setGlobalOffset((v) => v + 1)}
          className="
              flex items-center gap-2
              px-4 py-2 rounded-xl
              text-sm font-medium
              border border-blue-400/20
              bg-blue-400/10 hover:bg-blue-400/20
              text-blue-300
              transition
            "
        >
          Shift
        </button>
      </div>

      {/* MAIN STAGE BOX */}
      <div
        className={`
          relative z-10 w-64 h-64 rounded-2xl border border-white/10
          flex items-center justify-center
          transition-all duration-300
          bg-white/5 backdrop-blur-md
          shadow-lg shadow-black/40
        `}
        style={{
          transform: `
            translate(${globalOffset * 10}px, ${globalOffset * 6}px)
            scale(${themePulse % 2 === 0 ? 1 : 1.05})
          `,
        }}
      >
        {/* pulse glow layer */}
        <div
          className={`
            absolute inset-0 rounded-2xl
            transition-opacity duration-300
            ${themePulse > 0 ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="absolute inset-0 rounded-2xl bg-green-400/10 blur-xl" />
        </div>

        {/* content */}
        <div className="relative text-center">
          <div className="text-sm text-white/60 mb-2">interactive box</div>
          <div className="text-2xl font-bold">pulse: {themePulse}</div>
          <div className="text-xs text-white/40 mt-1">shift: {globalOffset}</div>
        </div>
      </div>
    </div>
  );
}
