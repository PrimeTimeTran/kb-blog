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

const ANCHOR_BASE = {
  tl: 'top',
  tr: 'right',
  bl: 'left',
  br: 'bottom',
} as const
const LOCAL_CYCLES = {
  tl: ['top', 'right', 'bottom', 'left'],
  tr: ['right', 'bottom', 'left', 'top'],
  bl: ['left', 'top', 'right', 'bottom'],
  br: ['bottom', 'left', 'top', 'right'],
} as const

function nextPivotPosition(state: RailState): RailPosition {
  const cycle = LOCAL_CYCLES[state.anchor]
  const currentIndex = cycle.indexOf(state.position)
  if (currentIndex === -1) {
    return ANCHOR_BASE[state.anchor]
  }

  return cycle[(currentIndex + 1) % cycle.length]
}

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

  const closeRail = useCallback(() => {
    setRail((r) => ({
      ...r,
      open: false,
    }))
  }, [])

  const interactRail = useCallback((anchor: RailState['anchor']) => {
    setRail((current) => {
      console.log('🟡 INTERACT RAIL')
      console.log('incoming anchor:', anchor)
      console.log('current state:', current)

      const isSameAnchor = current.anchor === anchor
      console.log('isSameAnchor:', isSameAnchor)

      if (isSameAnchor) {
        const next = nextPivotPosition(current)

        console.log('pivoting within anchor')
        console.log('cycle:', LOCAL_CYCLES[current.anchor])
        console.log('current.position:', current.position)
        console.log('next.position:', next)

        const nextState = {
          ...current,
          position: next,
          open: true,
        }

        console.log('result state:', nextState)
        return nextState
      }

      const nextState = {
        anchor,
        position: ANCHOR_BASE[anchor],
        open: true,
      }

      console.log('rebase to anchor')
      console.log('result state:', nextState)

      return nextState
    })
  }, [])

  const handleRailLongPress = useCallback((anchor) => {
    setRail((current) => {
      if (current.anchor !== anchor) {
        return { ...current, anchor, open: false }
      }

      return {
        ...current,
        open: false,
      }
    })
  }, [])

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
