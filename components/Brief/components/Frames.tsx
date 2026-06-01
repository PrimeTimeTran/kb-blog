import * as types from '../types';

import Exhibit from '@/pkg/exhibit/Exhibit';
import { MorphFrame } from './MorphFrame';
import React from 'react';
import clsx from 'clsx';
import { manifest } from './data';
import { motion } from 'framer-motion';

function FloatScene({ nodes }: { nodes: any[] }) {
  return (
    <div className="relative w-full h-full">
      {nodes.map((frame) => (
        <FloatFrame key={frame.id} frame={frame} />
      ))}
    </div>
  );
}

function FloatSceneComposer({ scene }) {
  return (
    <div className="relative w-full h-full">
      <FloatScene nodes={scene} />
    </div>
  );
}

function FloatFrame({ frame }: { frame: any }) {
  return (
    <div className={`absolute ${frame.className ?? ''}`}>
      <FrameRenderer frame={frame} />
    </div>
  );
}

// export function LaptopFrame({ frame }) {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         width: frame.width,
//         height: frame.height,
//         background: 'black', // bezel
//         borderRadius: 20,
//       }}
//     >
//       {/* viewport (screen) */}
//       <div
//         style={{
//           position: 'absolute',
//           left: frame.viewport.x,
//           top: frame.viewport.y,
//           width: frame.viewport.width,
//           height: frame.viewport.height,
//           background: '#111',
//           overflow: 'hidden',
//         }}
//       >
//         {frame.children?.map((child) => (
//           <AnimatedFrame key={child.id} frame={child} time={0} />
//         ))}
//       </div>
//     </div>
//   );
// }

export function IDEFrameBlock() {
  return <Exhibit manifest={manifest} />;
  return (
    <div
      className="
      w-full h-full rounded-[28px]
      border border-black/10 dark:border-white/10
      bg-white/70 dark:bg-black/40
      backdrop-blur-xl
      overflow-hidden flex flex-col
    "
    >
      {/* TOP BAR */}
      <div
        className="
        h-10 border-b
        border-black/10 dark:border-white/5
        flex items-center px-4 gap-2
      "
      >
        <div className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-black/20 dark:bg-white/20" />

        <div className="ml-3 text-[11px] text-black/60 dark:text-white/50 font-mono">/app/editor.tsx</div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: FILE TREE */}
        <div
          className="
          w-56 border-r
          border-black/10 dark:border-white/5
          bg-black/5 dark:bg-white/5
          p-3 space-y-2 font-mono text-xs
        "
        >
          <div className="text-black/60 dark:text-white/60">📁 src</div>
          <div className="pl-3 space-y-1 text-black/50 dark:text-white/40">
            <div>📄 index.ts</div>
            <div>📄 scene.ts</div>
            <div>📄 frame.ts</div>
          </div>

          <div className="text-black/60 dark:text-white/60 mt-3">📁 components</div>
          <div className="pl-3 space-y-1 text-black/50 dark:text-white/40">
            <div>📄 IDEFrameBlock.tsx</div>
            <div>📄 SceneFrame.tsx</div>
          </div>
        </div>

        {/* CENTER: EDITOR */}
        <div
          className="
          flex-1 p-4 font-mono text-xs
          text-black/70 dark:text-white/70
          space-y-2
        "
        >
          <div className="text-black/40 dark:text-white/40">export function SceneFrame(props) {'{'}</div>

          <div className="pl-4">
            <div>const frame = resolveFrame(props.frame)</div>
            <div>const camera = useCamera()</div>
          </div>

          <div className="text-black/40 dark:text-white/40">{'}'}</div>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div
          className="
          w-72 border-l
          border-black/10 dark:border-white/5
          bg-black/5 dark:bg-white/5
          p-2
        "
        >
          <div className="h-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
            {/* this is your system preview hook */}
            <div className="w-full h-full bg-white/30 dark:bg-black/30 flex items-center justify-center text-xs text-black/40 dark:text-white/40">
              <span>Live Preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function EditorBlock() {
  return (
    <FrameChrome>
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
    </FrameChrome>
  );
}
export function TerminalBlock() {
  return (
    <FrameChrome>
      <Toolbar />

      <div className="p-4 font-mono text-xs space-y-2 bg-surface">
        {['$ pnpm install', '✓ dependencies resolved', '✓ runtime initialized', '> watching filesystem...'].map(
          (line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              className="
              text-surface-foreground/80
              dark:text-green-300/70
              text-black/70
            "
            >
              {line}
            </motion.div>
          ),
        )}
      </div>
    </FrameChrome>
  );
}
export function SidebarBlock() {
  return (
    <FrameChrome>
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
    </FrameChrome>
  );
}
export function ChartBlock() {
  return (
    <FrameChrome>
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
            className="flex-1 rounded-t-2xl bg-linear-to-t from-primary/40 to-primary/10 border border-white/5"
            style={{ height }}
          />
        ))}
      </div>
    </FrameChrome>
  );
}
export function CardBlock() {
  return (
    <FrameChrome>
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
    </FrameChrome>
  );
}
export function StatsBlock() {
  return (
    <FrameChrome>
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
    </FrameChrome>
  );
}
type ReactNodeProp = {
  children: React.ReactNode;
};

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
type LaptopFrameBlockProps = {
  children: React.ReactNode;
  blur?: boolean;
};

export function LaptopFrameBlock({ children, blur = false }: LaptopFrameBlockProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <div className="relative rounded-[36px] bg-surface-laptop-shell shadow-2xl p-6 border border-black/10 dark:border-white/10">
        <div className="absolute inset-6 rounded-[28px] bg-surface-laptop-bezel" />
        <div
          className={`absolute inset-4 rounded-[20px] overflow-hidden bg-surface-laptop-screen border border-black/10 dark:border-white/10
            ${blur ? 'backdrop-blur-xl' : ''}`}
        >
          {children}
        </div>
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
export function AbsoluteBox() {
  const name = `<AbsoluteBox />`;
  return (
    <div className="w-[320px] h-80 bg-red-500 text-white flex items-center justify-center border border-red-700">
      {name}
      <p>320×320</p>
    </div>
  );
}
export function RelativeBox() {
  const name = `<RelativeBox />`;
  return (
    <div className=" text-white bg-red-500 h-full w-full p-6 border border-green-700">
      <div className="font-bold">{name}</div>
      <div className="text-sm opacity-80">size depends on content + parent constraints</div>
    </div>
  );
}
export function BrowserFrame({ childProps }) {
  return (
    <div className="w-full h-full rounded-[28px] border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden">
      <div className="h-10 flex items-center gap-2 px-4 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-400/40" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/40" />
        <div className="w-3 h-3 rounded-full bg-green-400/40" />
      </div>

      <div className="h-10 px-4 flex items-center text-xs text-white/40 border-b border-white/5">
        {childProps?.url || 'https://www.loitran.com'}
      </div>

      <div className="p-4 text-white/40 text-sm">Browser preview content area</div>
    </div>
  );
}
export function FrameRenderer({ frame, children, style }: { frame: types.Frame; children?: any }) {
  switch (frame.type) {
    case 'containerFrame':
      return withDebug(frame, <ContainerFrame style={style}>{children}</ContainerFrame>);
    case 'browserFrame':
      return withDebug(
        frame,
        <BrowserFrame
          childProps={{
            ...frame,
            layout: frame.layoutResolved,
          }}
        />,
      );
    case 'laptopFrame':
      return withDebug(frame, <LaptopFrameBlock frame={frame} />);

    case 'browserWindow':
      return withDebug(frame, <LaptopBrowserBlock />);

    case 'relative':
      return withDebug(frame, <RelativeBox />);
    case 'absolute':
      return withDebug(frame, <AbsoluteBox />);
    case 'shape':
      return withDebug(frame, <MorphFrame frame={frame} style={style} />);

    case 'ideFrame':
      return withDebug(frame, <IDEFrameBlock />);

    case 'sidebar':
      return withDebug(frame, <SidebarBlock />);

    case 'editor':
      return withDebug(frame, <EditorBlock />);

    case 'terminal':
      return withDebug(frame, <TerminalBlock />);

    case 'chart':
      return withDebug(frame, <ChartBlock />);

    case 'stats':
      return withDebug(frame, <StatsBlock />);

    case 'card':
      return withDebug(frame, <CardBlock />);

    default:
      return <div className="text-red-500 text-xs">Unknown block: {String(frame.type)}</div>;
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

export function ContainerFrame({ children }) {
  return (
    <FrameShell>
      <FrameChrome>
        <div className="flex flex-col h-full">
          <div className="flex-1 relative">{children}</div>
        </div>
      </FrameChrome>
    </FrameShell>
  );
}

export function FrameEffects({ children }) {
  return (
    <>
      <ShimmerSweep />
      <div className="relative z-10 h-full">{children}</div>
    </>
  );
}

export function FrameShell({ className, children }) {
  return <div className={`relative overflow-hidden w-full h-full ${className}`}>{children}</div>;
}

export function FrameChrome({ children }: ReactNodeProp) {
  return (
    <div className="relative h-full w-full rounded-[28px] border border-white/10 bg-white/3 dark:bg-black/30 backdrop-blur-xl shadow-2xl overflow-hidden">
      {children}
    </div>
  );
}

export const DEBUG_SCENE = {
  showLabels: false,
  showBounds: false,
};

function DebugOverlay({ frame, children }: { frame: any; children: React.ReactNode }) {
  const enabled = DEBUG_SCENE.showLabels;

  return (
    <div className="relative w-full h-full">
      {children}

      {enabled && (
        <div className="absolute top-1 left-1 z-50 text-[10px] px-1 py-0.5 rounded bg-black/60 text-white font-mono pointer-events-none">
          {frame.type}
          <span className="opacity-50 ml-1">#{frame.id}</span>
        </div>
      )}
    </div>
  );
}

function withDebug(frame: any, node: React.ReactNode) {
  if (!DEBUG_SCENE.showLabels && !DEBUG_SCENE.showBounds) return node;

  return <DebugOverlay frame={frame}>{node}</DebugOverlay>;
}
