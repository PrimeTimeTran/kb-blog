function useMotionBox({ themePulse, rotationStep, shape }) {
  const boxRef = React.useRef(null);

  const dragging = React.useRef(false);
  const start = React.useRef({ x: 0, y: 0 });
  const pos = React.useRef({ x: 0, y: 0 });

  // keep derived state local (no external globals)
  const active = themePulse + rotationStep;

  const apply = React.useCallback(() => {
    if (!boxRef.current) return;

    const scale = 1 + themePulse * 0.03;
    const rotate = rotationStep + shape.rot;

    boxRef.current.style.transform = `
      translate(${pos.current.x}px, ${pos.current.y}px)
      rotate(${rotate}deg)
      scale(${scale})
    `;
  }, [themePulse, rotationStep, shape]);

  function onPointerDown(e) {
    dragging.current = true;

    start.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    };
  }

  function onPointerMove(e) {
    if (!dragging.current) return;

    pos.current.x = e.clientX - start.current.x;
    pos.current.y = e.clientY - start.current.y;

    apply();
  }

  function onPointerUp() {
    dragging.current = false;
  }

  React.useEffect(() => {
    apply();
  }, [apply]);

  function reset() {
    pos.current = { x: 0, y: 0 };
    apply();
  }

  return {
    boxRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    reset,
    active,
  };
}

function App() {
  const [themePulse, setThemePulse] = React.useState(0);
  const [rotationStep, setRotationStep] = React.useState(0);
  const [showGrid, setShowGrid] = React.useState(true);
  const [shapeMode, setShapeMode] = React.useState(0);
  const shapes = [
    { r: 22, skew: 0, rot: 0 },
    { r: 40, skew: 0, rot: 2 },
    { r: 12, skew: 6, rot: -2 },
    { r: 999, skew: 0, rot: 0 }, // circle mode
  ];
  function cycleShape() {
    setShapeMode((v) => v + 1);
  }

  const shape = shapes[shapeMode % shapes.length];
  const { boxRef, onPointerDown, onPointerMove, onPointerUp, reset, active } = useMotionBox({
    themePulse,
    rotationStep,
    shape,
  });

  function resetAll() {
    setThemePulse(0);
    setRotationStep(0);
    setShapeMode(0);

    // reset drag position through hook
    reset();
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
      {/* background */}
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

      {/* HEADER */}
      <div className="relative z-10 text-center mb-10 px-6">
        <div className="text-sm tracking-widest text-white/40 uppercase">interactive motion sandbox</div>

        <div className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
          Play with <span className="text-green-300">state</span>, watch it become{' '}
          <span className="text-blue-300">motion</span>
        </div>
      </div>

      {/* controls */}
      <div className="relative z-10 flex items-center gap-3 mb-10 flex-wrap justify-center">
        <button
          onClick={() => setShowGrid((v) => !v)}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-gray-500"
        >
          Backlights
        </button>

        <button
          onClick={() => setThemePulse((v) => v + 1)}
          className="px-4 py-2 rounded-xl bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 text-green-300"
        >
          Grow
        </button>

        <button
          onClick={() => setRotationStep((v) => v + 15)}
          className="px-4 py-2 rounded-xl bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/20 text-blue-300"
        >
          Rotate
        </button>

        {/* NEW */}
        <button
          onClick={cycleShape}
          className="px-4 py-2 rounded-xl bg-purple-400/10 hover:bg-purple-400/20 border border-purple-400/20 text-purple-300"
        >
          Morph shape
        </button>

        {/* NEW */}
        <button
          onClick={resetAll}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white"
        >
          Reset
        </button>
      </div>

      {/* STAGE */}
      <div className="relative z-10 flex items-center justify-center">
        <div
          ref={boxRef}
          onPointerDown={onPointerDown}
          className="
            relative flex items-center justify-center
            backdrop-blur-xl border border-white/10
            bg-white/5 shadow-2xl shadow-black/40
            cursor-grab active:cursor-grabbing
            select-none
            transition-all duration-300
          "
          style={{
            width: `${260 + themePulse * 10}px`,
            height: `260px`,
            borderRadius: `${shape.r + Math.sin(active * 0.3) * 10}px`,
            transform: `none`,
          }}
        >
          {/* glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-60"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(34,197,94,0.2), transparent 60%),
                           radial-gradient(circle at 70% 70%, rgba(59,130,246,0.2), transparent 60%)`,
              filter: 'blur(20px)',
            }}
          />

          {/* content */}
          <div className="relative text-center px-6 pointer-events-none">
            <div className="text-xs text-white/40 uppercase tracking-widest mb-2">living state object</div>

            <div className="text-5xl font-bold text-on-background leading-none">
              {shapeMode === 0 ? 'stable' : shapeMode === 1 ? 'morphing' : 'unstable'}
            </div>

            <div className="text-sm text-white/50 mt-3">
              rotate: {rotationStep} · pulse: {themePulse}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
