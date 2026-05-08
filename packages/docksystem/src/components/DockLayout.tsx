'use client'

import { JSX, ReactNode } from 'react'
import { DockSlip } from './DockSlip'
import { DockShell } from './DockShell'

interface DockLayoutProps {
  children: ReactNode
}

export function DockLayout({ children }: DockLayoutProps): JSX.Element {
  return (
    <DockShell left={<DockSlip name="left" />} right={<DockSlip name="right" />}>
      {children}
    </DockShell>
  )
}
