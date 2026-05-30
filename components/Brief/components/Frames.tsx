import * as types from '../types';

import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type ViewportProps = {
  className?: string;
  children: React.ReactNode;
};
export function FloatScene({ nodes }: { nodes: any[] }) {
  return (
    <div className="relative w-full h-full">
      {nodes.map((frame) => (
        <FloatFrame key={frame.id} frame={frame} />
      ))}
    </div>
  );
}

export function FloatSceneComposer({ scene }) {
  return (
    <div className="relative w-full h-full">
      <FloatScene nodes={scene} />
    </div>
  );
}

export function FloatFrame({ frame }: { frame: any }) {
  return (
    <div className={`absolute ${frame.className ?? ''}`}>
      <FrameRenderer frame={frame} />
    </div>
  );
}

export function Viewport({ className = '', children }: ViewportProps) {
  return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
}

export function SquareBoxAbsolute() {
  return (
    <div className="w-[320px] h-80 bg-red-500 text-white flex items-center justify-center border border-red-700">
      Absolute 320×320
    </div>
  );
}

export function SquareBoxRelativeDynamic({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="text-white bg-red-500 border border-green-700 p-6"
      style={{
        width: '100%',
        height: '100%',

        // 🔥 critical: allow morphing
        transition: 'all 600ms cubic-bezier(0.22,1,0.36,1)',

        ...style,
      }}
    >
      <div className="font-bold">Relative box</div>
      <div className="text-sm opacity-80">shape is timeline-driven</div>
    </div>
  );
}

export function SquareBoxRelative() {
  return (
    <div className=" text-white bg-red-500 h-full w-full p-6 border border-green-700">
      <div className="font-bold">Relative box</div>
      <div className="text-sm opacity-80">size depends on content + parent constraints</div>
    </div>
  );
}

export function LaptopFrame({ children }: ReactNodeProp) {
  return (
    <Viewport className="w-225 h-140 rounded-[28px] border border-white/10  shadow-2xl">
      <div className="w-full h-full rounded-[28px] bg-neutral-900 border border-white/10 overflow-hidden relative">
        {/* screen */}
        <div className="absolute left-[5%] top-[7%] right-[5%] bottom-[8%] rounded-xl bg-black overflow-hidden">
          {children}
        </div>
      </div>
    </Viewport>
  );
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
export function IDEFrameBlock() {
  return (
    <div className="w-full h-full rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col">
      <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>
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
      <div className="h-10 flex items-center gap-2 px-4 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-400/40" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
        <div className="w-3 h-3 rounded-full bg-green-400/40" />
      </div>

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
            className={clsx('rounded-xl bg-white/4 border border-white/5', i === 1 ? 'h-10' : 'h-8')}
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
type ReactNodeProp = {
  children: React.ReactNode;
};

export function FrameWrapper({ children }: ReactNodeProp) {
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
      <div className="h-10 border-b border-white/10 flex items-center gap-2 px-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
      </div>
      <div className="relative w-full h-[calc(100%-40px)] overflow-hidden"></div>
    </div>
  );
}
export function LaptopFrameBlock2() {
  return (
    <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl pointer-events-none" />
  );
}
export function LaptopFrameBlock({ frame, children }) {
  const width = frame.width;
  const height = frame.height;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div
        className="relative rounded-[36px] bg-surface-laptop-shell shadow-2xl p-6"
        style={{
          width,
          height,
        }}
      >
        <div className="absolute inset-6 rounded-[28px] bg-surface-laptop-bezel" />
        <div className="absolute inset-4 rounded-[20px] overflow-hidden bg-surface-laptop-screen">{children}</div>
      </div>
    </div>
  );
}
export function LaptopBrowserBlock({ children }: { children?: ReactNodeProp }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[90%] h-[85%] rounded-[28px] border border-white/10 bg-black/50 backdrop-blur-2xl shadow-2xl overflow-hidden">
        <div className="h-10 border-b border-white/10 flex items-center gap-2 px-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
        </div>
        <div className="relative w-full h-[calc(100%-40px)] bg-black/30 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function ShapeRenderer({ frame, style }: { frame: types.Frame; style?: any }) {
  const points = style?.points;

  if (!points) return null;

  const pointsString = points.map(([x, y]) => `${x * 100},${y * 100}`).join(' ');

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        display: 'block',
      }}
    >
      <polygon points={pointsString} fill="currentColor" />
    </svg>
  );
}

export function FrameRenderer({ frame, style }: { frame: types.Frame }) {
  switch (frame.type) {
    case 'shape':
      return <ShapeRenderer frame={frame} style={style} />;
    case 'container':
      return <SquareBoxRelativeDynamic />;
    case 'absolute':
      return <SquareBoxAbsolute />;
    case 'relative':
      return <SquareBoxRelative />;
    case 'laptopFrame':
      return <LaptopFrameBlock frame={frame} />; // NO children here
    case 'browserFrame':
      return <BrowserFrameBlock />;
    case 'browserWindow':
      return <LaptopBrowserBlock />;

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

    default:
      return <div className="text-red-500 text-xs">Unknown block: {String(frame.type)}</div>;
  }
}
