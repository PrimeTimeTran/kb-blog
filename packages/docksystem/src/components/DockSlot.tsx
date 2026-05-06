'use client'

import { useEffect, JSX, ReactNode } from 'react'
import { useDock } from '../context/DockProvider'

// 1. Define explicit types for the component props
interface DockSlotProps {
  /** The target region name where this component should register itself */
  name?: 'left' | 'right' | 'leftOverlay' | 'rightOverlay' | string
  /** The React nodes to be rendered dynamically inside the designated slot */
  children: ReactNode
}

export default function DockSlot({ name = 'right', children }: DockSlotProps): JSX.Element | null {
  const dock = useDock()

  useEffect(() => {
    // Register the layout fragment into the context provider registry
    dock.setSlot(name, children)

    // Unregister cleanly when the component unmounts to prevent stale memory leaks
    return () => {
      dock.clearSlot(name)
    }
  }, [name, children, dock])

  // This is a utility management component that pipes UI layouts
  // upstream; it renders nothing directly to the native DOM tree here.
  return null
}
