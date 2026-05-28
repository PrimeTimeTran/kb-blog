import clsx from 'clsx';
import { useRef } from 'react';
import { motion } from 'framer-motion';

import * as types from '../types';
import { dumpScene } from '../src';
import { motionRegistry } from '../data';

export function CameraController({
  camera,
  setCamera,
  children,
}: {
  camera: { x: number; y: number; zoom: number };
  setCamera: any;
  children: React.ReactNode;
}) {
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  return (
    <div
      className="w-full h-full"
      onMouseDown={(e) => {
        dragging.current = true;
        last.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onMouseMove={(e) => {
        if (!dragging.current) return;

        const dx = e.clientX - last.current.x;
        const dy = e.clientY - last.current.y;

        last.current = { x: e.clientX, y: e.clientY };

        setCamera((c: any) => ({
          ...c,
          x: c.x + dx,
          y: c.y + dy,
        }));
      }}
      onWheel={(e) => {
        e.preventDefault();

        const zoomDelta = -e.deltaY * 0.001;

        setCamera((c: any) => {
          const next = Math.min(2, Math.max(0.2, c.zoom + zoomDelta));
          return { ...c, zoom: next };
        });
      }}
    >
      {children}
    </div>
  );
}
export function CopySceneButton() {
  const handleCopy = () => {
    const root = document.querySelector('#scene-root') as HTMLElement;
    const frames = dumpScene(root);
    navigator.clipboard.writeText(
      JSON.stringify(
        {
          id: 'snapshot',
          frames,
        },
        null,
        2,
      ),
    );
  };

  return (
    <button onClick={handleCopy} className="fixed bottom-4 right-4 bg-black text-white px-3 py-2">
      Copy Scene
    </button>
  );
}
export function FrameRenderer({ type }: { type: types.FrameType }) {
  switch (type) {
    case 'browserFrame':
      return <BrowserFrameBlock />;

    case 'ideFrame':
      return <IDEFrameBlock />;

    case 'sidebar':
      return <SidebarBlock />;

    case 'editor':
      return <EditorBlock />;

    case 'terminal':
      return <TerminalBlock />;

    case 'chart':
      return <ChartBlock />;

    case 'stats':
      return <StatsBlock />;

    case 'card':
      return <CardBlock />;

    case 'laptopFrame':
      return <LaptopFrameBlock />;

    case 'browserWindow':
      return <LaptopBrowserBlock />;

    default:
      return <div className="text-red-500 text-xs">Unknown block: {String(type)}</div>;
  }
}
export function Toolbar() {
  return (
    <div className="flex items-center gap-2 px-4 h-12 border-b border-white/5">
      <div className="w-3 h-3 rounded-full bg-red-400/40" />
      <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
      <div className="w-3 h-3 rounded-full bg-green-400/40" />
    </div>
  );
}
export function Content() {
  return (
    <motion.div
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="h-24 rounded-2xl bg-white/4 border border-white/5"
    ></motion.div>
  );
}
export function ShimmerSweep() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-white/3" />

      <motion.div
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/10 to-transparent blur-xl"
      />
    </div>
  );
}
export function Sidebar() {
  return <div>Hi</div>;
}
export function IDEFrameBlock() {
  return (
    <div className="w-full h-full rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col">
      {/* toolbar */}
      <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>

      {/* workspace */}
      <div className="flex flex-1">
        <div className="w-48 border-r border-white/5 bg-white/2" />
        <div className="flex-1" />
      </div>
    </div>
  );
}
export function BrowserFrameBlock() {
  return (
    <div className="w-full h-full rounded-[28px] border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden">
      {/* top bar */}
      <div className="h-10 flex items-center gap-2 px-4 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-400/40" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
        <div className="w-3 h-3 rounded-full bg-green-400/40" />
      </div>

      {/* fake URL bar */}
      <div className="h-10 px-4 flex items-center text-xs text-white/40 border-b border-white/5">
        https://app.example.com
      </div>

      <div className="p-4 text-white/40 text-sm">Browser preview content area</div>
    </div>
  );
}
export function EditorBlock() {
  return (
    <FrameWrapper>
      <Toolbar />

      <div className="grid grid-cols-[72px_1fr] h-full">
        <div className="border-r border-white/5 p-3 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
              }}
              className="h-2 rounded-full bg-white/10"
            />
          ))}
        </div>

        <div className="p-5 space-y-3">
          {[140, 180, 120, 220, 160].map((width, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
              }}
              className="h-3 rounded-full bg-white/10"
              style={{ width }}
            />
          ))}
        </div>
      </div>
    </FrameWrapper>
  );
}
export function TerminalBlock() {
  return (
    <FrameWrapper>
      <Toolbar />

      <div className="p-4 font-mono text-xs space-y-2">
        {['$ pnpm install', '✓ dependencies resolved', '✓ runtime initialized', '> watching filesystem...'].map(
          (line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              className="text-green-300/70"
            >
              {line}
            </motion.div>
          ),
        )}
      </div>
    </FrameWrapper>
  );
}
export function SidebarBlock() {
  return (
    <FrameWrapper>
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            whileHover={{
              x: 4,
            }}
            className={clsx('rounded-xl bg-white/[0.04] border border-white/5', i === 1 ? 'h-10' : 'h-8')}
          />
        ))}
      </div>
    </FrameWrapper>
  );
}
export function ChartBlock() {
  return (
    <FrameWrapper>
      <div className="flex items-end gap-3 h-full p-6">
        {[40, 90, 60, 130, 80, 160].map((height, i) => (
          <motion.div
            key={i}
            animate={{
              height: [height, height + 20, height],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              flex-1 rounded-t-2xl
              bg-gradient-to-t
              from-primary/40
              to-primary/10
              border border-white/5
            "
            style={{ height }}
          />
        ))}
      </div>
    </FrameWrapper>
  );
}
export function CardBlock() {
  return (
    <FrameWrapper>
      <div className="p-5 space-y-4">
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="h-6 w-1/2 rounded-full bg-white/10"
        />

        <div className="space-y-2">
          <div className="h-3 rounded-full bg-white/5 w-full" />
          <div className="h-3 rounded-full bg-white/5 w-4/5" />
          <div className="h-3 rounded-full bg-white/5 w-3/5" />
        </div>

        <div className="flex gap-2 pt-2">
          <div className="h-8 w-20 rounded-xl bg-primary/20 border border-white/5" />
          <div className="h-8 w-16 rounded-xl bg-white/5 border border-white/5" />
        </div>
      </div>
    </FrameWrapper>
  );
}
export function StatsBlock() {
  return (
    <FrameWrapper>
      <div className="grid grid-cols-2 gap-3 p-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
            }}
            className="rounded-2xl border border-white/5 bg-white/4 p-4"
          >
            <div className="h-3 w-12 rounded-full bg-white/10" />
            <div className="mt-4 h-8 w-20 rounded-full bg-white/20" />
            <div className="mt-3 h-2 w-full rounded-full bg-white/5" />
          </motion.div>
        ))}
      </div>
    </FrameWrapper>
  );
}
export function FrameWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full rounded-[28px] border border-white/10 bg-white/3 backdrop-blur-xl shadow-2xl overflow-hidden">
      <ShimmerSweep />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
export function LaptopFrameBlock1() {
  return (
    <div className="w-full h-full rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
      {/* top bar */}
      <div className="h-10 border-b border-white/10 flex items-center gap-2 px-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
      </div>

      {/* screen area */}
      <div className="relative w-full h-[calc(100%-40px)] overflow-hidden">
        {/* children will visually sit “inside” this */}
      </div>
    </div>
  );
}
export function LaptopFrameBlock2() {
  return (
    <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl pointer-events-none" />
  );
}
export function LaptopFrameBlock() {
  return (
    <div className="absolute inset-0 rounded-[28px] bg-black border border-white/10 shadow-2xl">
      {/* screen area */}
      <div className="absolute left-[5%] top-[7%] right-[5%] bottom-[8%] rounded-xl bg-neutral-900 overflow-hidden">
        {/* children will visually sit here via overlay positioning */}
      </div>
    </div>
  );
}
export function LaptopBrowserBlock({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Laptop shell */}
      <div className="relative w-[90%] h-[85%] rounded-[28px] border border-white/10 bg-black/50 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="h-10 border-b border-white/10 flex items-center gap-2 px-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
        </div>

        {/* Screen */}
        <div className="relative w-full h-[calc(100%-40px)] bg-black/30 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
export function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <Viewport className="w-[900px] h-[560px] rounded-[28px] border border-white/10  shadow-2xl ">
      {/* chrome */}
      <div className="h-10 border-b border-white/10 flex items-center gap-2 px-4">
        <div className="w-3 h-3 rounded-full bg-red-400/40" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
        <div className="w-3 h-3 rounded-full bg-green-400/40" />
      </div>

      {/* screen */}
      <div className="h-[calc(100%-40px)] relative overflow-hidden">{children}</div>
    </Viewport>
  );
}
export function AnimatedFrame({ frame }: { frame: types.Frame }) {
  const motionType = frame.motion;
  const variants =
    motionType && motionRegistry.enter[motionType]
      ? motionRegistry.enter[motionType]
      : {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
        };

  return (
    <motion.div
      exit="exit"
      initial="initial"
      animate="animate"
      variants={variants}
      data-frame="true"
      data-id={frame.id}
      data-type={frame.type}
      className={clsx('transform-gpu', frame.className)}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <FrameRenderer type={frame.type} />
    </motion.div>
  );
}
export function Viewport({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
}
