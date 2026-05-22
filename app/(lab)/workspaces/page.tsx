'use client';
import clsx from 'clsx';
import { workspaces } from './data';
import { ViewportRail } from './Rail';
import { WorkspaceShell } from './components';
import { useLongPress, useViewport } from '@/hooks/useViewport';
import { WorkspaceProps, ViewportProps, ViewportControllerProps, RailState } from './types';
import { PanelTop, PanelBottom, PanelLeft, PanelRight } from 'lucide-react';

const Z = {
  base: 0,
  content: 10,
  rail: 20,
  overlay: 30,
  debug: 40,
} as const;

// Context Isolate. We want to isolate the workspaces from the rest of the site z-index wise.
// Isolate creates a new stacking context for z-index inside that element
// ! not remove it from normal document flow
// ! not prevent it from sitting above siblings
// ! not override parent layout stacking rules

// parent structure:
// <div className="flex flex-1 min-h-0 pt-16">
//   {children}
//   <ShowcasePage />
// </div>
export default function ShowcasePage() {
  const viewport = useViewport(workspaces[0].id);

  return (
    <div className="fixed inset-0 isolate pointer-events-auto">
      <div className="absolute inset-0 top-16">
        <ViewportController viewport={viewport} />

        <Workspace viewport={viewport} viewportRail={<ViewportRail items={workspaces} viewport={viewport} />}>
          <Viewport workspaces={workspaces} viewport={viewport} />
        </Workspace>
      </div>
    </div>
  );
}

// Viewport = system
// Workspace = data
// Rail = UI mechanism

export function Workspace({ children, viewport, viewportRail }: WorkspaceProps) {
  const { rail } = viewport;

  const anchorClass: Record<RailState['anchor'], string> = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  };

  const sizeClass = viewport.isVertical ? 'top-0 bottom-0 w-64' : 'left-0 right-0 h-32';

  return (
    <div className="relative h-full w-full">
      {/* RAIL */}
      <div
        className={clsx(
          'absolute z-10 pointer-events-auto',
          'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          anchorClass[rail.anchor],
          sizeClass,
          rail.open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
        )}
      >
        {viewportRail}
      </div>

      {/* CONTENT */}
      <div className="absolute inset-0 z-0 overflow-y-auto pointer-events-auto">{children}</div>
    </div>
  );
}
export function Viewport({ viewport, workspaces }: ViewportProps) {
  const { animateRef, previewId, isVertical } = viewport;
  const activeId = previewId ?? viewport.activeId;
  const displayIdx = workspaces.findIndex((w) => w.id === activeId);
  const animate = animateRef.current;
  const transform = isVertical ? `translateY(-${displayIdx * 100}%)` : `translateX(-${displayIdx * 100}%)`;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className={clsx(
          'flex h-full will-change-transform',
          animate && 'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        )}
        style={{
          transform,
          flexDirection: isVertical ? 'column' : 'row',
        }}
      >
        {workspaces.map((workspace) => {
          const Component = workspace.component;

          return (
            <div
              key={workspace.id}
              style={workspace.theme}
              className="relative h-full w-full shrink-0 overflow-hidden bg-background"
            >
              <WorkspaceShell>
                <Component workspaceId={workspace.id} />
              </WorkspaceShell>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function ViewportController({ viewport }: ViewportControllerProps) {
  const { interactRail, handleLongPress } = viewport;

  const tl = useLongPress(() => handleLongPress('tl'));
  const tr = useLongPress(() => handleLongPress('tr'));
  const bl = useLongPress(() => handleLongPress('bl'));
  const br = useLongPress(() => handleLongPress('br'));

  const bind = (anchor: RailState['anchor'], lp) => ({
    ...lp.handlers,
    onClick: () => {
      if (lp.consume()) return;
      interactRail(anchor);
    },
  });

  const iconClass = 'size-4 transition-transform duration-300 group-hover:scale-110 group-active:scale-95';

  const buttonClass = clsx(
    'group flex items-center justify-center h-10 w-10 rounded-full border border-[color:var(--primary)] bg-surface/80 text-on-surface backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:bg-surface active:scale-95 text-primary',
  );

  return (
    <div className="absolute inset-0 z-50 pointer-events-none">
      <button className={clsx(buttonClass, 'absolute top-4 left-4 pointer-events-auto')} {...bind('tl', tl)}>
        <PanelTop className={iconClass} />
      </button>

      <button className={clsx(buttonClass, 'absolute top-4 right-4 pointer-events-auto')} {...bind('tr', tr)}>
        <PanelRight className={iconClass} />
      </button>

      <button className={clsx(buttonClass, 'absolute bottom-4 left-4 pointer-events-auto')} {...bind('bl', bl)}>
        <PanelLeft className={iconClass} />
      </button>

      <button className={clsx(buttonClass, 'absolute bottom-4 right-4 pointer-events-auto')} {...bind('br', br)}>
        <PanelBottom className={iconClass} />
      </button>
    </div>
  );
}
