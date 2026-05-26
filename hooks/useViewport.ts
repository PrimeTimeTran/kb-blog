import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import {
  WorkspaceId,
  WorkspaceNavigationMode,
  ViewportAPI,
  RailState,
  RailPosition,
} from '@/app/(lab)/workspaces/types';

export function useLongPress(onLongPress: () => void, delay = 500) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const triggered = useRef(false);

  const start = () => {
    triggered.current = false;

    timer.current = setTimeout(() => {
      triggered.current = true;
      onLongPress();
    }, delay);
  };

  const stop = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const wasLongPress = () => triggered.current;

  const consume = () => {
    const v = triggered.current;
    triggered.current = false;
    return v;
  };

  return {
    wasLongPress,
    consume,
    handlers: {
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
    },
  };
}
export function useViewport(initialId: WorkspaceId): ViewportAPI {
  const animateRef = useRef(true);
  const [activeId, setActiveId] = useState<WorkspaceId>(initialId);
  const [previewId, setPreviewId] = useState<WorkspaceId | null>(null);
  const [navigationMode, setNavigationMode] = useState<WorkspaceNavigationMode>('idle');

  const [rail, setRail] = useState<RailState>({
    open: true,
    anchor: 'tr',
    position: 'right',
  });
  // =======================================================
  // Derived
  // =======================================================
  const orientation = useMemo(() => {
    return rail.position === 'left' || rail.position === 'right' ? 'vertical' : 'horizontal';
  }, [rail.position]);

  const isHorizontal = orientation == 'horizontal';
  const isVertical = orientation == 'vertical';

  // =======================================================
  // Navigation
  // =======================================================

  const select = useCallback((id: WorkspaceId) => {
    setActiveId(id);
    setPreviewId(null);
    setNavigationMode('select');
  }, []);

  const preview = useCallback((id: WorkspaceId | null) => {
    setPreviewId(id);
    setNavigationMode(id ? 'preview' : 'idle');
  }, []);

  const interactRail = useCallback((anchor: RailState['anchor']) => {
    setRail((current) => {
      animateRef.current = false;

      const isSameAnchor = current.anchor === anchor;

      // 🔴 CLOSED → OPEN AT BASE
      if (!current.open) {
        return {
          ...current,
          open: true,
          anchor,
          position: ANCHOR_BASE[anchor],
        };
      }

      // 🔵 SAME ANCHOR → PIVOT (cycle)
      if (isSameAnchor) {
        const next = nextPivotPosition(current);

        return {
          ...current,
          position: next,
          open: true,
        };
      }

      // 🟢 DIFFERENT ANCHOR → REBASE (RESET PIVOT CHAIN)
      return {
        ...current,
        anchor,
        position: ANCHOR_BASE[anchor],
        open: true,
      };
    });
  }, []);

  useLayoutEffect(() => {
    if (!animateRef.current) {
      requestAnimationFrame(() => {
        animateRef.current = true;
      });
    }
  }, [rail.anchor, rail.position, rail.open]);

  const handleLongPress = useCallback(() => {
    setRail((r) => ({
      ...r,
      open: false,
    }));
  }, []);

  return {
    activeId,
    previewId,

    orientation,
    navigationMode,

    select,
    preview,

    interactRail,
    handleLongPress,
    animateRef,

    isHorizontal,
    isVertical,

    rail,
  };
}
const ANCHOR_BASE = {
  tl: 'top',
  tr: 'right',
  bl: 'left',
  br: 'bottom',
} as const;
const LOCAL_CYCLES = {
  tl: ['top', 'right', 'bottom', 'left'],
  tr: ['right', 'bottom', 'left', 'top'],
  bl: ['left', 'top', 'right', 'bottom'],
  br: ['bottom', 'left', 'top', 'right'],
} as const;

function nextPivotPosition(state: RailState): RailPosition {
  const cycle = LOCAL_CYCLES[state.anchor];
  const currentIndex = cycle.indexOf(state.position);
  if (currentIndex === -1) {
    return ANCHOR_BASE[state.anchor];
  }

  return cycle[(currentIndex + 1) % cycle.length];
}
