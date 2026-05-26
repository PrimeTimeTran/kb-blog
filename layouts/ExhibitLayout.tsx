import { Globe, Globe2Icon } from 'lucide-react';
import { useState, useRef, useEffect, JSX } from 'react';

type ColProps = {
  left: JSX.Element;
  right: JSX.Element;
  children: JSX.Element;
};

export function ExhibitLayout({ left, right, children }: ColProps) {
  const getWidthsFromWeights = (totalWidth: number, weights: any[]) => {
    const totalWeight = weights.reduce((acc: any, w: any) => acc + w, 0);
    return weights.map((w: number) => (w / totalWeight) * totalWidth);
  };
  const initialSizes = getWidthsFromWeights(typeof window !== 'undefined' ? window.innerWidth : 1200, [3, 6, 3]);
  const { sizes, getHandleProps, isDragging } = useMultiSplitter(initialSizes);

  return (
    <div className="relative w-full overflow-hidden flex flex-col">
      <div className={`flex flex-1 ${isDragging ? 'select-none' : ''}`}>
        <div style={{ width: sizes[0] }} className="overflow-y-auto border-r border-white/5">
          {left || <SurfacePreviewLeft />}
        </div>
        <ResizeHandle {...getHandleProps(0)} />
        <div
          className="flex-1 relative" // Remove overflow-y-auto from here, put it on the child
          style={{ width: sizes[1] }}
        >
          <div className="absolute inset-0 overflow-y-auto">{!children ? children : <SurfacePreviewMain />}</div>
        </div>
        <ResizeHandle {...getHandleProps(1)} />
        <div style={{ width: sizes[2] }} className="overflow-y-auto border-l border-white/5">
          {right || <SurfacePreviewRight />}
        </div>
      </div>
      <BottomPanel />
    </div>
  );
}

function BottomPanel() {
  const { isOpen, toggle } = useOverlay();
  const { height, resizeProps } = useResizablePanel(250);
  return (
    <div
      style={{ height: isOpen ? `${height}px` : '0px' }}
      className={`z-20 absolute bottom-0 left-0 w-full bg-surface-container transition-[height] duration-300 ease-in-out ${isOpen ? 'border-t-2 border-gray-600' : ''}`}
    >
      <div {...resizeProps} className="w-full h-4 -top-2 absolute cursor-row-resize group">
        <div className="w-full bg-transparent group-hover:bg-gray-500 transition-colors" />
      </div>
      <button onClick={toggle}>Close Console</button>
    </div>
  );
}

export function useMultiSplitter(initialSizes: number[], minSize = 100) {
  const [sizes, setSizes] = useState(initialSizes);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const startPosRef = useRef(0);
  const startSizeLeftRef = useRef(0);
  const startSizeRightRef = useRef(0);

  const startDrag = (index: number) => (e: React.PointerEvent) => {
    setDraggingIndex(index);
    startPosRef.current = e.clientX;
    startSizeLeftRef.current = sizes[index];
    startSizeRightRef.current = sizes[index + 1];
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDrag = (e: React.PointerEvent) => {
    if (draggingIndex === null) return;

    const delta = e.clientX - startPosRef.current;

    setSizes((prev) => {
      const next = [...prev];
      const newLeft = Math.max(minSize, startSizeLeftRef.current + delta);
      const newRight = Math.max(minSize, startSizeRightRef.current - delta);
      const totalSpace = startSizeLeftRef.current + startSizeRightRef.current;

      next[draggingIndex] = newLeft;
      next[draggingIndex + 1] = Math.max(minSize, totalSpace - newLeft);
      return next;
    });
  };

  const stopDrag = (e: React.PointerEvent) => {
    setDraggingIndex(null);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return {
    sizes,
    isDragging: draggingIndex !== null,
    // Helper to generate props for each handle
    getHandleProps: (index: number) => ({
      onPointerDown: startDrag(index),
      onPointerMove: onDrag,
      onPointerUp: stopDrag,
      onPointerCancel: stopDrag,
    }),
  };
}

export function useOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, toggle: () => setIsOpen(!isOpen) };
}

export function useResizablePanel(initialHeight: number) {
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (e: PointerEvent) => {
      // movementY is reliable, but calculating from a ref is often smoother
      setHeight((prev) => Math.max(100, Math.min(window.innerHeight * 0.8, prev - e.movementY)));
    };

    const handlePointerUp = () => setIsResizing(false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizing]);

  return {
    height,
    isResizing,
    resizeProps: {
      onPointerDown: (e: React.PointerEvent) => {
        setIsResizing(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      },
    },
  };
}

const ResizeHandle = ({ ...props }) => (
  <div {...props} className="group w-2 flex justify-center cursor-col-resize relative">
    <div className="handlebar" />
  </div>
);
export function NestedElevationPreview() {
  return (
    // Layer 1: Background (The page itself)
    <div className="p-12 bg-background">
      {/* Layer 2: Lowest (The Page Surface) */}
      <article className="bg-surface-lowest p-8 rounded-3xl border border-surface-variant shadow-lg">
        <h1 className="text-3xl font-bold text-on-surface mb-6">Article Heading</h1>

        {/* Layer 3: Surface Low (The Main Content Area) */}
        <section className="bg-surface-container-low p-6 rounded-2xl border border-surface-variant">
          <p className="text-on-surface-variant mb-6">
            This is the main article content. It sits on top of the 'lowest' layer, creating a distinct reading area.
          </p>

          {/* Layer 4: Surface Container (The Interaction Area) */}
          <div className="bg-surface-container p-6 rounded-xl border border-on-surface-variant/10">
            <h3 className="font-bold text-on-surface mb-4">Interactive Sidebar</h3>

            {/* Layer 5: Surface High (The Input/Clickable Zone) */}
            <div className="bg-surface-container-high p-4 rounded-lg border border-on-surface-variant/20 hover:border-surface-variant transition-colors cursor-pointer">
              <p className="text-sm font-medium text-on-surface">Hoverable Item / Input Field</p>
            </div>
          </div>
        </section>

        {/* Footer: Layer 6: Highest (Pinned or emphasized element) */}
        <footer className="mt-8 bg-surface-container-highest p-4 rounded-xl flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-on-surface">Pinned Action</span>
          <button className="px-4 py-2 bg-surface text-on-surface rounded-lg text-sm shadow">Save</button>
        </footer>
      </article>
    </div>
  );
}
export function SurfacePreviewMain() {
  return (
    <div className="w-full h-auto p-8 space-y-8">
      {/* 1. HERO: The "Base" elevation */}
      <NestedElevationPreview />
      <ElevationExplorer />

      {/* 2. GRID: Consistent shadow-sm for sub-cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-white/5 shadow-sm">
          <h2 className="text-xs font-bold text-zinc-400 uppercase mb-4">Recent Files</h2>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface-container-low p-3 rounded-lg border border-white/5 hover:bg-surface-container transition-colors"
              >
                <span className="text-sm">file_{i}.ts</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-white/5 shadow-sm">
          <h2 className="text-xs font-bold text-zinc-400 uppercase mb-4">System Health</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 shadow-sm">
              <p className="text-[10px] text-zinc-500">MEMORY</p>
              <p className="text-lg font-bold text-emerald-400">42%</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 shadow-sm">
              <p className="text-[10px] text-zinc-500">CPU</p>
              <p className="text-lg font-bold text-amber-400">18%</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TOOLBAR: High elevation, distinct style */}
      <nav className="bg-surface-container-high p-2 rounded-xl border border-white/10 shadow-lg flex items-center gap-2">
        <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors shadow-sm hover:shadow-md">
          <div className="w-5 h-5 bg-zinc-500 rounded-sm" />
        </button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <span className="text-sm font-medium">Toolbar Action</span>
      </nav>

      {/* 4. SECTIONED CARD: Unified header elevation */}
      <article className="bg-surface-container-lowest rounded-xl overflow-hidden border border-white/5 shadow-sm">
        <header className="bg-surface-container-low px-4 py-3 border-b border-white/5">
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Section Header</h2>
        </header>
        <div className="p-4">
          <p className="text-sm">Standard section content body.</p>
        </div>
      </article>

      <SurfaceFormsPreview />
      <EmptyStatePreview />
      <AlertLogPreview />
      <ShadowGuide />
      <DesignSystemGuide />
      <ButtonSystemGuide />
    </div>
  );
}
export function ElevationExplorer() {
  return (
    <div className="p-8 space-y-8 bg-background text-on-surface">
      <h1 className="text-2xl font-bold">Surface Elevation System</h1>

      {/* Container Elevation Scale */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-lowest p-6 rounded-2xl border border-surface-variant">
          <p className="font-bold text-on-surface">Lowest</p>
          <span className="text-xs text-on-surface-variant">bg-surface-lowest</span>
        </div>

        <div className="bg-surface-container-low p-6 rounded-2xl border border-surface-variant">
          <p className="font-bold text-on-surface">Low</p>
          <span className="text-xs text-on-surface-variant">bg-surface-container-low</span>
        </div>

        <div className="bg-surface-container p-6 rounded-2xl border border-surface-variant">
          <p className="font-bold text-on-surface">Container</p>
          <span className="text-xs text-on-surface-variant">bg-surface-container</span>
        </div>

        <div className="bg-surface-container-high p-6 rounded-2xl border border-surface-variant">
          <p className="font-bold text-on-surface">High</p>
          <span className="text-xs text-on-surface-variant">bg-surface-container-high</span>
        </div>

        <div className="bg-surface-container-highest p-6 rounded-2xl border border-surface-variant">
          <p className="font-bold text-on-surface">Highest</p>
          <span className="text-xs text-on-surface-variant">bg-surface-container-highest</span>
        </div>
      </div>

      {/* Semantic Components */}
      <div className="p-6 bg-surface border border-surface-variant rounded-2xl">
        <h2 className="text-lg font-bold text-on-surface mb-2">Semantic Surfaces</h2>
        <div className="flex gap-4">
          <div className="p-4 bg-surface rounded-lg border border-on-surface-variant/20">Base Surface</div>
          <div className="p-4 bg-surface-variant rounded-lg text-on-surface-variant">Surface Variant</div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    // LAYER 1: Base Sidebar (Lowest)
    <div className="h-full w-full bg-surface-lowest border-r border-on-surface-variant/10 flex flex-col shadow-2xl">
      {/* Sidebar Header: Pinned at top */}
      <div className="p-6 border-b border-on-surface-variant/10">
        <h2 className="text-sm font-bold tracking-tighter text-on-surface">WORKSPACE</h2>
      </div>

      {/* LAYER 2: Content Area (Low) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search Input: Elevated as a container */}
        <div className="bg-surface-container-low p-3 rounded-xl border border-on-surface-variant/5">
          <input
            placeholder="Search files..."
            className="w-full bg-transparent text-sm placeholder:text-on-surface-variant/60 focus:outline-none text-on-surface"
          />
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <label className="px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
            Navigation
          </label>
          {['Dashboard', 'Analytics', 'Components'].map((item) => (
            <button
              key={item}
              className="w-full p-3 rounded-lg flex items-center justify-between group hover:bg-surface-container-high transition-all border border-transparent hover:border-on-surface-variant/10"
            >
              <span className="text-sm text-on-surface">{item}</span>
              <span className="text-[10px] bg-surface-variant px-1.5 py-0.5 rounded text-on-surface-variant group-hover:text-on-surface">
                ⌘
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* LAYER 3: Footer Card (Container High) */}
      <div className="p-4 bg-surface-container-high border-t border-on-surface-variant/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-xs">
            JD
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-on-surface">Jane Doe</p>
            <p className="text-[10px] text-on-surface-variant">Pro Plan</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
export function SurfacePreviewLeft() {
  return <Sidebar />;
}
export function SurfacePreviewRight() {
  return (
    // Layer 1: Base panel elevation (Lowest)
    <div className="w-full h-full bg-surface-lowest border-l border-on-surface-variant/10 flex flex-col shadow-inner">
      {/* Panel Header: Bordered with variant */}
      <div className="p-4 border-b border-on-surface-variant/10 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Properties</h3>
        <span className="text-[10px] bg-surface-variant text-on-surface-variant px-1.5 py-0.5 rounded">ID: 8492</span>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Section: Typography */}
        <div className="space-y-3">
          <label className="text-[11px] font-semibold text-on-surface-variant uppercase">Typography</label>
          {/* Elevation Layer 2: Container Low */}
          <div className="bg-surface-container-low p-3 rounded-lg border border-on-surface-variant/10">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-on-surface">Font Weight</span>
              <span className="font-mono text-on-surface-variant">600</span>
            </div>
            {/* Input uses surface-variant for contrast */}
            <input type="range" className="w-full h-1 accent-red-500 bg-surface-variant rounded-full appearance-none" />
          </div>
        </div>

        {/* Section: Color/Effects */}
        <div className="space-y-3">
          <label className="text-[11px] font-semibold text-on-surface-variant uppercase">Effects</label>
          <div className="grid grid-cols-2 gap-2">
            {['Blur', 'Shadow', 'Border', 'Glow'].map((effect) => (
              <button
                key={effect}
                /* Interactive elements use standard container scale */
                className="bg-surface-container hover:bg-surface-container-high border border-on-surface-variant/20 py-2 px-3 rounded text-xs text-on-surface transition-all active:scale-95"
              >
                {effect}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Action Area: Elevated as a specific container */}
      <div className="p-4 border-t border-on-surface-variant/10 bg-surface-container-low">
        <button className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded transition-colors border border-red-500/20">
          RESET PROPERTIES
        </button>
      </div>
    </div>
  );
}

export function SurfaceFormsPreview() {
  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-white/5 shadow-sm">
      {/* 1. Basic Form Section (Nested Elevation) */}
      <div className="bg-surface-container-lowest p-6 ">
        <h3 className="text-lg font-bold mb-6">Component Settings</h3>

        <div className="space-y-6">
          {/* Input Group: Surface Container Low as the background for the input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-500 uppercase">Project Name</label>
            <div className="bg-surface-container-low p-1 rounded-lg border border-white/5">
              <input
                className="w-full bg-transparent px-3 py-2 text-sm focus:outline-none"
                placeholder="Enter project name..."
              />
            </div>
          </div>

          {/* Select/Dropdown Group */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Framework</label>
              <div className="bg-surface-container-low p-2 rounded-lg border border-white/5 cursor-pointer hover:bg-surface-container transition-colors">
                <span className="text-sm">Next.js</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Version</label>
              <div className="bg-surface-container p-2 rounded-lg border border-white/5">
                <select className="w-full bg-transparent text-sm focus:outline-none">
                  <option>v14.0.0</option>
                  <option>v15.0.0</option>
                </select>
              </div>
            </div>
          </div>

          {/* Toggle/Switch */}
          <div className="bg-surface-container p-4 rounded-xl flex items-center justify-between border border-white/5">
            <div>
              <p className="text-sm font-medium">Enable Analytics</p>
              <p className="text-xs text-zinc-500">Track user behavior in production</p>
            </div>
            <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyStatePreview() {
  return (
    // 'bg-surface-lowest' creates the card separation from the main page background
    <div className="flex items-center justify-center p-12 bg-surface-lowest rounded-2xl border border-on-surface-variant/10">
      <div className="text-center max-w-sm">
        {/* Decorative background container (Elevated) */}
        <div className="w-16 h-16 bg-surface-container-low rounded-2xl mx-auto mb-4 flex items-center justify-center border border-on-surface-variant/10">
          <span className="text-2xl">📦</span>
        </div>

        <h3 className="text-lg font-bold text-on-surface mb-2">No data found</h3>
        <p className="text-sm text-on-surface-variant mb-6">
          Your workspace is currently empty. Start by creating your first component to get things moving.
        </p>

        {/* Action Button: Uses container elevation for press-effect */}
        <button className="bg-surface-container hover:bg-surface-container-high px-6 py-2 rounded-lg text-sm font-semibold border border-on-surface-variant/20 text-on-surface transition-all">
          Create New Project
        </button>
      </div>
    </div>
  );
}

export function AlertLogPreview() {
  const alerts = [
    { id: 1, type: 'CRITICAL', msg: 'Database latency exceeded', time: '10:42 AM' },
    { id: 2, type: 'INFO', msg: 'System update completed', time: '10:35 AM' },
    { id: 3, type: 'WARNING', msg: 'High memory usage', time: '10:15 AM' },
  ];

  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-white/5">
      <h3 className="text-sm font-bold text-zinc-400 uppercase mb-4">System Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          /* Use 'low' as the default item state */
          <div
            key={alert.id}
            className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-white/5 hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${alert.type === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-500'}`} />
              <span className="text-sm font-medium">{alert.msg}</span>
            </div>
            <span className="text-xs text-zinc-600 font-mono">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export function ShadowGuide() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-2xl border border-white/5 shadow-md">
      <h2 className="text-sm font-bold uppercase tracking-wider mb-6">Elevation Guide</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tip 1: Consistency */}
        <div className="space-y-2">
          <div className="h-20 bg-surface-container-low rounded-xl shadow-sm border border-white/5" />
          <p className="text-xs font-semibold text-zinc-400">SMALL (sm)</p>
          <p className="text-[10px] text-zinc-500">Use for 80% of your cards. Keeps things grounded.</p>
        </div>

        {/* Tip 2: Interaction */}
        <div className="space-y-2">
          <div className="h-20 bg-surface-container-low rounded-xl shadow-md border border-white/5" />
          <p className="text-xs font-semibold text-zinc-400">MEDIUM (md)</p>
          <p className="text-[10px] text-zinc-500">Use for interactive states or important action blocks.</p>
        </div>

        {/* Tip 3: Hierarchy */}
        <div className="space-y-2">
          <div className="h-20 bg-surface-container-low rounded-xl shadow-lg border border-white/5" />
          <p className="text-xs font-semibold text-zinc-400">LARGE (lg)</p>
          <p className="text-[10px] text-zinc-500">Only for elements that physically "float" above the UI.</p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-xs text-zinc-500 space-y-1">
        <p>
          <strong>• Rule of Thumb:</strong> Don't mix shadows on the same component (e.g., don't use shadow-sm +
          shadow-md).
        </p>
        <p>
          <strong>• Dark Mode Tip:</strong> Shadows are harder to see on dark backgrounds. If a shadow feels
          "invisible," add a `border border-white/10` to define the shape instead.
        </p>
        <p>
          <strong>• Keep it subtle:</strong> If you can distinctly "see" the shadow as a dark blur, it's too heavy. It
          should be felt as depth, not seen as ink.
        </p>
      </div>
    </div>
  );
}
export function DesignSystemGuide() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-2xl border border-white/5 shadow-sm space-y-8">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Color Hierarchy & Best Practices</h2>
        <p className="text-sm text-zinc-500 max-w-xl">
          Never place a Primary action on a background that has low contrast. Use <strong>Surface Containers</strong> to
          create "Well-Defined Zones" for your actions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: The "Primary Focus" Zone */}
        <div className="bg-surface-container p-6 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-sm font-semibold mb-2">The Primary Action</h3>
          <p className="text-[12px] text-zinc-500 mb-4 leading-relaxed">
            Use for the "Primary" action. It should always stand out. Place it on the highest surface (e.g., Surface
            Container) to elevate it above the background.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:brightness-110">
            Create Project
          </button>
        </div>

        {/* Card 2: The "Secondary/Info" Zone */}
        <div className="bg-surface-container p-6 rounded-xl border border-white/10 shadow-md">
          <h3 className="text-sm font-semibold mb-2">Secondary / Muted</h3>
          <p className="text-[12px] text-zinc-500 mb-4 leading-relaxed">
            Use for secondary tasks. Keep these "muted" by using lower-contrast colors. They should feel part of the
            structure, not a distraction.
          </p>
          <button className="bg-surface-container-low text-zinc-300 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-container-high transition-colors">
            Cancel
          </button>
        </div>
      </div>

      {/* Best Practice Callout */}
      <div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-primary flex items-start gap-4">
        <div className="text-primary mt-0.5">💡</div>
        <div className="text-xs text-zinc-400 space-y-1">
          <p>
            <strong>Rule 1:</strong> Primary actions should never compete with each other. Limit one "Primary" action
            per card.
          </p>
          <p>
            <strong>Rule 2:</strong> Use "Muted" text (zinc-500) for all non-essential metadata. Save your pure white
            (#FFFFFF) for the most important titles.
          </p>
          <p>
            <strong>Rule 3:</strong> If an action is destructive, use the "Critical" (Red) color, but keep it on a
            Secondary background to reduce visual anxiety.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ButtonSystemGuide() {
  const Button = ({ variant = 'primary', label, description }) => {
    const baseClass = 'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm';
    const variants = {
      // PRIMARY: High visibility, contrast is key
      primary: `
        bg-blue-600 text-white 
        hover:bg-blue-500 
        active:scale-95 
        shadow-lg shadow-blue-500/20 
        border border-blue-400/20
      `,

      // SECONDARY: Subtle but distinct
      secondary: `
        bg-surface-container border border-white/10 
        text-zinc-800 dark:text-zinc-200 
        hover:bg-surface-container-high hover:border-zinc-400/50 
        active:scale-95
      `,

      ghost: `
        bg-transparent 
        text-red-600 dark:text-blue-400 
        hover:text-black dark:hover:text-white 
        hover:bg-zinc-200/50 dark:hover:bg-white/10
      `,
      // DANGER: Must use stronger borders and distinct backgrounds in dark mode
      danger: `
        bg-transparent border border-transparent
        text-red-600 dark:text-red-400 
        hover:bg-red-50 dark:hover:bg-red-500/10 
        hover:border-red-300 dark:hover:border-red-500/30
        active:scale-95
      `,
    };

    return (
      <div className="flex items-center gap-4">
        <button className={`${baseClass} ${variants[variant]}`}>{label}</button>
        <p className="text-[11px] text-zinc-500 leading-tight max-w-[200px]">{description}</p>
      </div>
    );
  };

  return (
    <div className="bg-surface-container-lowest p-8 rounded-2xl border border-white/5 shadow-md space-y-8">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider mb-2">Button Component Library</h2>
        <p className="text-sm text-zinc-500">
          Buttons communicate intent. Use variants to guide users to the "Happy Path."
        </p>
      </div>

      <div className="space-y-6">
        <Button
          variant="primary"
          label="Create Workspace"
          description="The 'Happy Path'. Only one primary button per screen."
        />
        <Button
          variant="secondary"
          label="View Settings"
          description="Standard actions. Feels elevated but not demanding."
        />
        <Button variant="ghost" label="Cancel" description="Secondary/Tertiary. Used to keep the UI clean." />
        <Button
          variant="danger"
          label="Delete Project"
          description="High stakes. Use sparingly and confirm before triggering."
        />
      </div>

      {/* Guidelines Section */}
      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-zinc-300">Interaction Guidelines</h4>
          <ul className="text-[11px] text-zinc-500 space-y-1 list-disc pl-4">
            <li>
              <strong>Active State:</strong> Always include `active:scale-95`. It provides physical feedback.
            </li>
            <li>
              <strong>Disabled State:</strong> Lower the opacity to `0.4` and remove the cursor.
            </li>
            <li>
              <strong>Spacing:</strong> Ensure buttons are at least `36px` tall for touch friendliness.
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-zinc-300">Color Strategy</h4>
          <ul className="text-[11px] text-zinc-500 space-y-1 list-disc pl-4">
            <li>Primary buttons should "pop" off the `lowest` background.</li>
            <li>Never use red as a default; save it for destructive actions only.</li>
            <li>Use `ghost` buttons for grouped toolbars to reduce visual clutter.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
