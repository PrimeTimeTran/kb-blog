'use client'

import { JSX } from 'react'
import { useDock } from '../context/DockProvider'

// 1. Define strict type requirements for the props
interface SysSlipProps {
  /** The unique identifier matching a previously registered SysSlot name */
  name: 'left' | 'right' | 'leftOverlay' | 'rightOverlay' | string
}

export function SysSlip({ name }: SysSlipProps): JSX.Element | null {
  // No more 'as any' bypass needed — the hook types are fully resolved!
  const dock = useDock()

  // Grab the node out of our context registry safely.
  // If the slot hasn't been mounted yet, fall back cleanly to null.
  const slottedContent = dock.getSlot(name)

  return (slottedContent as JSX.Element) ?? null
}
