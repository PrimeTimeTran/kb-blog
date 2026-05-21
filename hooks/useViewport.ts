import { useCallback, useRef, useState } from 'react'

import {
  WorkspaceId,
  WorkspaceNavigationMode,
  ViewportAPI,
  RailState,
  RailPosition,
  RailOrientation,
} from '@/app/(lab)/workspaces/types'

// =======================================================
// Long press
// =======================================================

export function useLongPress(onLongPress: () => void, delay = 500) {
  const timer = useRef<NodeJS.Timeout | null>(null)
  const suppressClick = useRef(false)
  const moved = useRef(false)

  const start = () => {
    suppressClick.current = false
    moved.current = false

    timer.current = setTimeout(() => {
      suppressClick.current = true
      onLongPress()
    }, delay)
  }

  const stop = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  const onMove = () => {
    // optional: cancel long press if user drags
    moved.current = true
  }

  const shouldSuppressClick = () => {
    const v = suppressClick.current
    suppressClick.current = false // IMPORTANT: reset after evaluation
    return v
  }

  return {
    shouldSuppressClick,
    handlers: {
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
      onMouseMove: onMove,
    },
  }
}

// =======================================================
// Pivot cycles
// =======================================================

const PIVOT_CYCLES = {
  tl: ['top', 'left', 'bottom', 'right'],
  tr: ['top', 'right', 'bottom', 'left'],
  bl: ['left', 'bottom', 'right', 'top'],
  br: ['right', 'bottom', 'left', 'top'],
} as const

function nextPivotPosition(state: RailState): RailPosition {
  const cycle = PIVOT_CYCLES[state.anchor]

  const currentIndex = cycle.indexOf(state.position)

  const nextIndex = (currentIndex + 1) % cycle.length

  return cycle[nextIndex]
}

// =======================================================
// Viewport
// =======================================================

export function useViewport(initialId: WorkspaceId): ViewportAPI {
  const [activeId, setActiveId] = useState<WorkspaceId>(initialId)

  const [previewId, setPreviewId] = useState<WorkspaceId | null>(null)

  const [rail, setRail] = useState<RailState>({
    anchor: 'tr',
    position: 'right',
    open: true,
  })

  const [navigationMode, setNavigationMode] = useState<WorkspaceNavigationMode>('idle')

  // =======================================================
  // Derived
  // =======================================================

  const railPosition = rail.position
  const railOpen = rail.open

  const orientation: RailOrientation =
    rail.position === 'left' || rail.position === 'right' ? 'vertical' : 'horizontal'

  const isPreviewing = previewId !== null
  const isVertical = orientation === 'vertical'
  const isHorizontal = orientation === 'horizontal'

  // =======================================================
  // Navigation
  // =======================================================

  const select = useCallback((id: WorkspaceId) => {
    setActiveId(id)
    setPreviewId(null)
    setNavigationMode('select')
  }, [])

  const preview = useCallback((id: WorkspaceId | null) => {
    setPreviewId(id)
    setNavigationMode(id ? 'preview' : 'idle')
  }, [])

  // =======================================================
  // Rail interactions
  // =======================================================

  const pivotRail = useCallback((anchor: RailState['anchor']) => {
    setRail((current) => {
      // same anchor = rotate around pivot
      if (current.anchor === anchor) {
        const isSamePosition = nextPivotPosition(current) === current.position

        return {
          ...current,
          position: nextPivotPosition(current),
          open: isSamePosition ? !current.open : true,
        }
      }

      // new anchor = move pivot immediately
      switch (anchor) {
        case 'tl':
          return {
            anchor,
            position: 'top',
            open: true,
          }

        case 'tr':
          return {
            anchor,
            position: 'right',
            open: true,
          }

        case 'bl':
          return {
            anchor,
            position: 'left',
            open: true,
          }

        case 'br':
          return {
            anchor,
            position: 'bottom',
            open: true,
          }
      }
    })
  }, [])

  const closeRail = useCallback(() => {
    setRail((r) => ({
      ...r,
      open: false,
    }))
  }, [])

  const interactRail = useCallback((anchor: RailState['anchor']) => {
    setRail((current) => {
      const isSameAnchor = current.anchor === anchor

      // LONG-TERM RULES:
      // 1. same anchor = cycle + toggle open occasionally
      // 2. different anchor = re-anchor + open

      if (isSameAnchor) {
        const next = nextPivotPosition(current)

        return {
          ...current,
          position: next,
          open: true, // keep simple: interaction always opens
        }
      }

      switch (anchor) {
        case 'tl':
          return { anchor, position: 'top', open: true }
        case 'tr':
          return { anchor, position: 'right', open: true }
        case 'bl':
          return { anchor, position: 'left', open: true }
        case 'br':
          return { anchor, position: 'bottom', open: true }
      }
    })
  }, [])

  const handleRailLongPress = useCallback((anchor: RailState['anchor']) => {
    setRail((current) => ({
      ...current,
      open: false,
    }))
  }, [])

  const handleCorner = useCallback(
    (anchor: RailState['anchor']) => {
      setRail(anchor)
    },
    [railPosition]
  )

  const longPressRail = useLongPress(closeRail)

  return {
    activeId,
    previewId,

    railPosition,
    orientation,
    navigationMode,

    select,
    preview,

    interactRail,
    handleRailLongPress,

    isPreviewing,
    isHorizontal,
    isVertical,

    railOpen,
    closeRail,

    rail,
  }
}
