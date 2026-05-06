'use client'

import { JSX, ReactNode } from 'react'
import SystemLayout from './SystemLayout'
import DockSlip from './DockSlip'

// 1. Define strict type requirements for the component props
interface DockLayoutProps {
  /** Main view content or sub-page elements injected between the slots */
  children: ReactNode
}

export default function DockLayout({ children }: DockLayoutProps): JSX.Element {
  return (
    <SystemLayout left={<DockSlip name="left" />} right={<DockSlip name="right" />}>
      {children}
    </SystemLayout>
  )
}
