'use client'

import { JSX, ReactNode } from 'react'
import DockSlot from './DockSlot'

// 1. Define explicit types for the component props
interface DockProps {
  /** The unique name of the region where this content should be rendered */
  name: 'left' | 'right' | 'leftOverlay' | 'rightOverlay' | string
  /** The structural markup or text content to pass down to the layout slot */
  children: ReactNode
}

export default function Dock({ name, children }: DockProps): JSX.Element {
  return <DockSlot name={name}>{children}</DockSlot>
}
