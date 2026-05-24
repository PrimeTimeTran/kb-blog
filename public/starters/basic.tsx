function App() {
  const [themePulse, setThemePulse] = React.useState(0);
  const [globalOffset, setGlobalOffset] = React.useState(0);
  const [showGrid, setShowGrid] = React.useState(true);

  const active = themePulse + globalOffset;

  // =========================
  // DRAG STATE (NEW)
  // =========================
  const [drag, setDrag] = React.useState({ x: 0, y: 0 });
  const dragging = React.useRef(false);
  const start = React.useRef({ x: 0, y: 0 });

  function onPointerDown(e) {
    dragging.current = true;
    start.current = {
      x: e.clientX - drag.x,
      y: e.clientY - drag.y,
    };
  }

  function onPointerMove(e) {
    if (!dragging.current) return;

    setDrag({
      x: e.clientX - start.current.x,
      y: e.clientY - start.current.y,
    });
  }

  function onPointerUp() {
    dragging.current = false;
  }

  return (
    <div
      className="
      relative h-screen w-screen overflow-hidden
      flex flex-col items-center justify-center
      text-[rgb(var(--fg))]
      bg-[rgb(var(--bg))]
    "
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`
          absolute inset-0 transition-opacity duration-700
          ${showGrid ? 'opacity-100' : 'opacity-0'}
        `}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.18),transparent_45%)]" />
        </div>

        <div
          className="absolute inset-0 opacity-30 animate-pulse"
          style={{
            filter: 'blur(60px)',
            transform: `scale(${1 + active * 0.02})`,
          }}
        />
      </div>

      {/* HEADER / PROMPT */}
      <div className="relative z-10 text-center mb-10 px-6">
        <div className="text-sm tracking-widest text-white/40 uppercase">interactive motion sandbox</div>

        <div className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
          Play with <span className="text-green-300">state</span>, watch it become{' '}
          <span className="text-blue-300">motion</span>
        </div>

        <div className="text-sm text-white/40 mt-3">
          click buttons below — everything is driven by a single reactive loop
        </div>
      </div>

      {/* controls */}
      <div className="relative z-10 flex items-center gap-3 mb-10">
        <button
          onClick={() => setShowGrid((v) => !v)}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
        >
          Toggle field
        </button>

        <button
          onClick={() => setThemePulse((v) => v + 1)}
          className="px-4 py-2 rounded-xl bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 text-green-300 transition"
        >
          Pulse reality
        </button>

        <button
          onClick={() => setGlobalOffset((v) => v + 1)}
          className="px-4 py-2 rounded-xl bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/20 text-blue-300 transition"
        >
          Shift space
        </button>
      </div>

      {/* MAIN MORPHING STAGE */}
      <div
        className="
          relative z-10 flex items-center justify-center
          transition-all duration-500 ease-out
        "
        style={{
          transform: `
            translateY(${Math.sin(active * 0.5) * 12}px)
          `,
        }}
      >
        <div
          onPointerDown={onPointerDown}
          className="
            relative flex items-center justify-center
            backdrop-blur-xl border border-white/10
            bg-white/5 shadow-2xl shadow-black/40
            transition-all duration-500
            cursor-grab active:cursor-grabbing
            select-none
          "
          style={{
            width: `${260 + themePulse * 10}px`,
            height: `${260 + globalOffset * 12}px`,
            borderRadius: `${20 + Math.sin(active * 0.3) * 18}px`,

            // =========================
            // ONLY CHANGE IS HERE
            // =========================
            transform: `
              translate(${drag.x}px, ${drag.y}px)
              rotate(${Math.sin(active * 0.2) * 2}deg)
              scale(${1 + themePulse * 0.03})
            `,
          }}
        >
          {/* glow shell */}
          <div
            className="absolute inset-0 rounded-2xl opacity-60"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(34,197,94,0.2), transparent 60%),
                           radial-gradient(circle at 70% 70%, rgba(59,130,246,0.2), transparent 60%)`,
              filter: 'blur(20px)',
            }}
          />

          {/* content */}
          <div className="relative text-center px-6">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-2">living state object</div>

            <div className="text-5xl font-bold text-white leading-none">
              {themePulse % 2 === 0 ? 'stable' : 'active'}
            </div>

            <div className="text-sm text-white/50 mt-3">
              shift: {globalOffset} · pulse: {themePulse}
            </div>
          </div>

          {/* hint overlay */}
          <div className="absolute bottom-3 text-xs text-white/30">try clicking “Pulse reality” repeatedly</div>
        </div>
      </div>
    </div>
  );
}
