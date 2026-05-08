'use client'

import { useReducer, useCallback, useRef, useEffect } from 'react'

import { type OverlayInstance } from '../system.types'

// 1. Define strict state structures
interface RegionConfig {
  mode: 'dock' | 'overlay'
  open: boolean
  width?: number
  height?: number
}
export type LayersMap = Record<string, OverlayInstance>
interface UIConfig {
  overlay: {
    active: string | null
  }
  toast: {
    items: any[] // Update this if you have a specific Toast shape later
  }
}

export interface DockSystemState {
  layers: LayersMap
  overlays: LayersMap
  layer: {
    toggle: (id: string, name: string) => void
  }
  regions: {
    left: RegionConfig & { width: number }
    right: RegionConfig & { width: number }
    leftOverlay: RegionConfig & { width: number }
    rightOverlay: RegionConfig & { width: number }
    bottom: RegionConfig & { height: number }
    [key: string]: any
  }
  ui: UIConfig
}

// 2. Define strict Reducer Actions using a Discriminated Union
type DockSystemAction =
  | { type: 'TOGGLE_REGION'; name: string }
  | { type: 'SET_SIZE'; name: string; key: 'width' | 'height'; value: number }
  | { type: 'SET_OVERLAY'; active: string | null }
  | { type: 'UPSERT_OVERLAY'; active: string | null }
  | { type: 'TOGGLE_LAYER'; active: string | null }

const initialState: DockSystemState = {
  regions: {
    left: { mode: 'dock', open: true, width: 280 },
    right: { mode: 'dock', open: true, width: 320 },
    leftOverlay: { mode: 'overlay', open: false, width: 280 },
    rightOverlay: { mode: 'overlay', open: false, width: 320 },
    bottom: { mode: 'dock', open: false, height: 240 },
  },
  ui: {
    overlay: { active: null },
    toast: { items: [] },
  },
}

export function createInitialState(): DockSystemState {
  return {
    regions: {
      left: { mode: 'dock', open: true, width: 280 },
      right: { mode: 'dock', open: true, width: 320 },
      leftOverlay: { mode: 'overlay', open: false, width: 280 },
      rightOverlay: { mode: 'overlay', open: false, width: 320 },
      bottom: { mode: 'dock', open: false, height: 240 },
    },
    layers: {},
    ui: {
      overlay: { active: null },
      toast: { items: [] },
    },
  }
}

function reducer(state: DockSystemState, action: DockSystemAction): DockSystemState {
  console.log({ type: action.type })
  console.log({ type: action.id })
  switch (action.type) {
    case 'UPSERT_OVERLAY': {
      const overlay = action.overlay

      const prev = state.layers[overlay.id]

      // identity guard (prevents loops)
      if (prev === overlay) return state

      return {
        ...state,
        layers: {
          ...state.layers,
          [overlay.id]: {
            ...prev,
            ...overlay,
          },
        },
      }
    }
    // case 'UPSERT_OVERLAY': {
    //   const overlay = action.overlay

    //   return {
    //     ...state,
    //     layers: {
    //       ...state.layers,
    //       [overlay.id]: {
    //         ...state.layers[overlay.id], // preserve existing state if any
    //         ...overlay, // overwrite with latest data
    //       },
    //     },
    //   }
    // }
    case 'TOGGLE_LAYER': {
      const id = action.id
      const existing = state.layers[id]

      if (!existing) {
        console.log('not existing')
        return {
          ...state,
          layers: {
            ...state.layers,
            [id]: {
              id,
              open: true,
              ...action.overlay,
            },
          },
        }
      }

      console.log('Toggling')

      return {
        ...state,
        layers: {
          ...state.layers,
          [id]: {
            ...existing,
            open: !existing.open,
          },
        },
      }
    }
    case 'TOGGLE_REGION': {
      const { name } = action
      if (!state.regions[name]) return state

      console.log(name)
      console.log('prevOpen', state.regions[name].open)
      console.log('newOpen', !state.regions[name].open)

      return {
        ...state,
        regions: {
          ...state.regions,
          [name]: {
            ...state.regions[name],
            open: !state.regions[name].open,
          },
        },
      }
    }

    case 'SET_SIZE': {
      const { name, key, value } = action
      if (!state.regions[name]) return state

      return {
        ...state,
        regions: {
          ...state.regions,
          [name]: {
            ...state.regions[name],
            [key]: value,
          },
        },
      }
    }

    case 'SET_OVERLAY': {
      return {
        ...state,
        ui: {
          ...state.ui,
          overlay: {
            ...state.ui.overlay,
            active: action.active,
          },
        },
      }
    }

    default:
      return state
  }
}

interface ResizeArgs {
  name: string
  key: 'width' | 'height'
}

export function useSys() {
  console.log('useDockSystem')
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState)

  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  const register = (overlay: OverlayInstance) => {
    dispatch({
      type: 'UPSERT_OVERLAY',
      overlay: {
        ...overlay,
        behavior: overlay.behavior ?? 'singleton',
      },
    })
  }
  const toggle = (id: string) => {
    dispatch({
      id,
      type: 'TOGGLE_LAYER',
    })
  }
  const startResize = useCallback(
    ({ name, key }: ResizeArgs) =>
      (e: React.MouseEvent | MouseEvent) => {
        e.preventDefault()

        const isHeight = key === 'height'
        const startPos = isHeight ? e.clientY : e.clientX

        // Always read the freshest value from the ref to avoid stale rendering boundaries
        const startValue = (stateRef.current.regions[name]?.[key] as number) || 0

        const onMove = (moveEvent: MouseEvent) => {
          const currentPos = isHeight ? moveEvent.clientY : moveEvent.clientX
          const delta = currentPos - startPos

          // Invert the delta calculation if tracking the right sidebar resizing inward
          const directionMultiplier = name === 'right' || name === 'rightOverlay' ? -1 : 1
          const next = Math.max(120, startValue + delta * directionMultiplier)

          dispatch({
            type: 'SET_SIZE',
            name,
            key,
            value: next,
          })
        }

        const onUp = () => {
          window.removeEventListener('mousemove', onMove)
          window.removeEventListener('mouseup', onUp)
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
      },
    [dispatch] // Stable dependency array means startResize won't toggle identities
  )

  return {
    state,
    register,
    startResize,
    toggleLayer: toggle,
    toggle: useCallback((name: string) => {
      dispatch({ type: 'TOGGLE_REGION', name })
    }, []),

    setOverlay: useCallback((active: string | null) => {
      dispatch({ type: 'SET_OVERLAY', active })
    }, []),
  }
}
