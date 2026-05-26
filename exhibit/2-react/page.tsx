export default function App() {
  const {
    boxRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    active,
    scale,
    rotationStep,
    showGrid,
    shapeMode,
    shape,
    boxWidth,
    grow,
    rotate,
    cycleShape,
    toggleBacklight,
    resetAll,
    morphs,
  } = useMotionBox();

  return (
    <div
      className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center text-[rgb(var(--fg))] bg-[rgb(var(--bg))]"
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

      <header className="relative z-10 text-center mb-10 px-6">
        <div className="text-sm tracking-widest text-[rgb(var(--fg)/0.5)] uppercase">interactive motion sandbox</div>

        <div className="text-4xl md:text-5xl font-bold mt-3 leading-tight">
          Play with <span className="text-green-300">state</span>, watch it become{' '}
          <span className="text-blue-300">motion</span>
        </div>
      </header>

      <section className="relative z-10 flex flex-wrap items-center justify-center gap-3 mb-10 px-4">
        <ControlButton onClick={toggleBacklight} icon={showGrid ? 'lightbulb' : 'lightbulb_circle'}>
          Back lights
        </ControlButton>

        <ControlButton onClick={grow} icon="zoom_in" variant="green">
          Scale
        </ControlButton>

        <ControlButton onClick={rotate} icon="rotate_right" variant="blue">
          Rotate
        </ControlButton>

        <ControlButton onClick={cycleShape} icon="category" variant="purple">
          Morph
        </ControlButton>

        <ControlButton onClick={resetAll} icon="restart_alt" variant="red">
          Reset
        </ControlButton>
      </section>

      <main className="relative z-10 flex items-center justify-center">
        <div
          ref={boxRef}
          onPointerDown={onPointerDown}
          className="relative flex items-center justify-center backdrop-blur-xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 cursor-grab active:cursor-grabbing select-none transition-all duration-500 ease-out"
          style={{
            width: `${boxWidth}px`,
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

          <section className="relative text-center px-6 pointer-events-none">
            <div className="text-xs text-[rgb(var(--fg)/0.5)] uppercase tracking-widest mb-2">living state object</div>

            <div className="text-5xl font-bold text-on-background leading-none">
              {shapeMode === 0 ? 'stable' : shapeMode === 1 ? 'morphing' : 'unstable'}
            </div>

            <div className="text-sm text-[rgb(var(--fg)/0.5)] mt-3">
              scale: {scale} · rotate: {rotationStep} · morphs: {morphs}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Icon({ name, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${className}`} style={{ userSelect: 'none' }}>
      {name}
    </span>
  );
}

function ControlButton({ onClick, icon, children, variant = 'default' }) {
  // Map your design variants to clean Tailwind themes
  const themes = {
    default: `
      dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-gray-300 dark:hover:text-white
      bg-gray-100 hover:bg-gray-200/80 border-gray-200 text-gray-700 hover:text-gray-900
    `,
    green: `
      dark:bg-green-500/10 dark:hover:bg-green-500/20 dark:border-green-500/20 dark:text-green-400
      bg-green-50 hover:bg-green-100 border-green-200 text-green-700
    `,
    blue: `
      dark:bg-blue-500/10 dark:hover:bg-blue-500/20 dark:border-blue-500/20 dark:text-blue-400
      bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700
    `,
    purple: `
      dark:bg-purple-500/10 dark:hover:bg-purple-500/20 dark:border-purple-500/20 dark:text-purple-400
      bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700
    `,
    red: `
      dark:bg-red-500/10 dark:hover:bg-red-500/20 dark:border-red-500/30 dark:text-red-400
      bg-red-50 hover:bg-red-100 border-red-200 text-red-700
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border
        transition-all duration-200 ease-out active:scale-95
        ${themes[variant]}
      `}
    >
      <span className="material-symbols-outlined text-[18px]" style={{ userSelect: 'none' }}>
        {icon}
      </span>
      {children}
    </button>
  );
}

function useMotionBox() {
  const boxRef = React.useRef(null);

  // --- SandBox State Engine ---
  const [scale, setScale] = React.useState(0);
  const [rotationStep, setRotationStep] = React.useState(0);
  const [showGrid, setShowGrid] = React.useState(true);
  const [shapeMode, setShapeMode] = React.useState(0);
  const [morphs, setMorphs] = React.useState(0);

  // Dynamically calculate the perfect circle radius based on current scale state
  const boxWidth = 260 + scale * 10;
  const circleRadius = boxWidth / 2;

  const shapes = [
    { r: 22, skew: 0, rot: 0 },
    { r: 40, skew: 0, rot: 2 },
    { r: 12, skew: 6, rot: -2 },
    { r: circleRadius, skew: 0, rot: 0 }, // Dynamic perfect circle mode
  ];

  const shape = shapes[shapeMode % shapes.length];

  // --- Drag-and-Drop Mutation Tracking ---
  const dragging = React.useRef(false);
  const start = React.useRef({ x: 0, y: 0 });
  const pos = React.useRef({ x: 0, y: 0 });

  const active = scale + rotationStep;

  const apply = React.useCallback(() => {
    if (!boxRef.current) return;

    const newScale = 1 + scale * 0.03;
    const rotate = rotationStep + shape.rot;

    if (dragging.current) {
      boxRef.current.style.transitionProperty = 'colors, border-radius, width, height';
    } else {
      boxRef.current.style.transitionProperty = 'transform, colors, border-radius, width, height';
    }

    boxRef.current.style.transform = `
      translate(${pos.current.x}px, ${pos.current.y}px)
      rotate(${rotate}deg)
      scale(${newScale})
    `;
  }, [scale, rotationStep, shape]); // Removed 'morphs' dependency as it's purely visual metadata

  // --- Event Handlers ---
  function onPointerDown(e) {
    dragging.current = true;

    if (boxRef.current) {
      boxRef.current.style.transitionProperty = 'colors, border-radius, width, height';
    }

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
    if (boxRef.current) {
      boxRef.current.style.transitionProperty = 'transform, colors, border-radius, width, height';
    }
  }

  React.useEffect(() => {
    apply();
  }, [apply]);

  const grow = () => setScale((v) => v + 1);
  const rotate = () => setRotationStep((v) => v + 45);

  // FIX: Using functional state updates removes the stale closure bug completely
  const cycleShape = () => {
    setMorphs((m) => m + 1);
    setShapeMode((s) => s + 1);
  };

  const toggleBacklight = () => setShowGrid((v) => !v);

  function resetAll() {
    setScale(0);
    setRotationStep(0);
    setShapeMode(0);
    setMorphs(0);
    pos.current = { x: 0, y: 0 };

    if (boxRef.current) {
      boxRef.current.style.transitionProperty = 'transform, colors, border-radius, width, height';
    }
    apply();
  }

  return {
    boxRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    active,
    scale,
    rotationStep,
    showGrid,
    shapeMode,
    shape,
    boxWidth,
    grow,
    rotate,
    cycleShape,
    toggleBacklight,
    resetAll,
    morphs,
  };
}
