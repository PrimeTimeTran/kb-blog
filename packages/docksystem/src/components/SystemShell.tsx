'use client'

import { JSX, ReactNode } from 'react'
import { DockSlip } from './DockSlip'
import { DockShell } from './DockShell'
import { DockProvider } from '../context/DockProvider'
import { SystemDebug } from './SystemDebug'

interface DockLayoutProps {
  children: ReactNode
}

export function SystemShell({ children }: DockLayoutProps): JSX.Element {
  return (
    <DockProvider>
      <DockShell left={<DockSlip name="left" />} right={<DockSlip name="right" />}>
        {children}
        <SystemDebug />
      </DockShell>
    </DockProvider>
  )
}
