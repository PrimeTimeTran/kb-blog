'use client';

import { PanelBottom, PanelLeft, PanelRight, PanelTop } from 'lucide-react';
import { RailState, ViewportControllerProps, ViewportProps, WorkspaceProps } from './types';
import { useLongPress, useViewport } from '@/hooks/useViewport';

import { ViewportRail } from './Rail';
import { WorkspaceShell } from './components';
import { WorkspaceThemeProvider } from './theme';
import clsx from 'clsx';
import { workspaces } from './data';

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

  const sizeClass = viewport.isVertical ? 'top-0 bottom-0 w-64' : 'left-0 right-0 h-32';

  return (
    <div className="relative h-full w-full">
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
            <div key={workspace.id} className="relative h-full w-full shrink-0 overflow-hidden bg-background">
              <WorkspaceThemeProvider theme={workspace.theme}>
                <WorkspaceShell workspace={workspace} viewport={viewport}>
                  <Component workspaceId={workspace.id} />
                </WorkspaceShell>
              </WorkspaceThemeProvider>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ViewportController({ viewport }: ViewportControllerProps) {
  const { interactRail, handleLongPress, rail } = viewport;
  const tl = useLongPress(() => handleLongPress('tl'));
  const tr = useLongPress(() => handleLongPress('tr'));
  const bl = useLongPress(() => handleLongPress('bl'));
  const br = useLongPress(() => handleLongPress('br'));
  const lpMap = { tl, tr, bl, br } as const;

  return (
    <div className="group absolute inset-0 z-50 pointer-events-none">
      {RAILS.map(({ anchor, Icon, pos }) => {
        const isActive = rail.anchor === anchor;

        return (
          <button
            key={anchor}
            className={clsx(
              'absolute flex items-center justify-center h-10 w-10 rounded-full border border-(--primary)/20 bg-surface/80 text-on-surface backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:bg-surface pointer-events-auto hover:border-(--primary)/40 active:scale-95 text-primary',
              pos,
              isActive && 'animate-pulse-subtle',
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            )}
            onClick={() => {
              if (lpMap[anchor].consume()) return;
              interactRail(anchor);
            }}
            {...lpMap[anchor].handlers}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
}

const Z = {
  base: 0,
  content: 10,
  rail: 20,
  overlay: 30,
  debug: 40,
} as const;

const RAILS = [
  { anchor: 'tl', Icon: PanelTop, pos: 'top-4 left-4' },
  { anchor: 'tr', Icon: PanelRight, pos: 'top-4 right-4' },
  { anchor: 'bl', Icon: PanelLeft, pos: 'bottom-4 left-4' },
  { anchor: 'br', Icon: PanelBottom, pos: 'bottom-4 right-4' },
] as const;

const anchorClass: Record<RailState['anchor'], string> = {
  tl: 'top-0 left-0',
  tr: 'top-0 right-0',
  bl: 'bottom-0 left-0',
  br: 'bottom-0 right-0',
};
