'use client'

import { useReducer, useCallback } from 'react'

const initialState = {
  regions: {
    left: { mode: 'dock', open: true, width: 280 },
    right: { mode: 'dock', open: true, width: 320 },
    leftOverlay: { mode: 'overlay', open: false, width: 280 },
    rightOverlay: { mode: 'overlay', open: false, width: 320 },
    bottom: {
      mode: 'dock',
      open: false,
      height: 240,
    },
  },

  ui: {
    overlay: {
      active: null,
    },

    toast: {
      items: [],
    },
  },
}

function reducer(state, action) {
  switch (action.type) {
    // generic toggle for any region
    case 'TOGGLE_REGION': {
      const { name } = action

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

    // generic set width/height
    case 'SET_SIZE': {
      const { name, key, value } = action

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

    // overlay system becomes a single "active" slot
    case 'SET_OVERLAY': {
      return {
        ...state,
        regions: {
          ...state.regions,
          overlay: {
            ...state.regions.overlay,
            active: action.active, // string or null
          },
        },
      }
    }

    default:
      return state
  }
}
export function useDockSystem() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const startResize = useCallback(
    ({ name, key }) =>
      (e) => {
        e.preventDefault()

        const startX = e.clientX
        const startValue = state.regions[name][key]

        const onMove = (e) => {
          const delta = e.clientX - startX
          const next = Math.max(120, startValue + delta)

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
    [state.regions, dispatch]
  )

  return {
    state,
    startResize,
    toggle: useCallback((name) => {
      dispatch({ type: 'TOGGLE_REGION', name })
    }, []),

    setOverlay: useCallback((active) => {
      dispatch({ type: 'SET_OVERLAY', active })
    }, []),
  }
}
