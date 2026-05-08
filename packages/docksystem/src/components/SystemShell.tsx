'use client'

import { JSX, ReactNode } from 'react'
import { SysSlip } from './SysSlip'
import { DockShell } from './DockShell'
import { DockProvider } from '../context/DockProvider'
import { SysDebugPanel } from './SysDebugPanel'
import { SysOverlays } from './SysOverlays'

interface DockLayoutProps {
  isDebug: boolean
  children: ReactNode
}

export function SystemShell({ isDebug, children }: DockLayoutProps): JSX.Element {
  return (
    <DockProvider>
      <DockShell>
        {/* LEFT (if exists later) */}
        {/* <aside /> */}

        {/* MAIN LAYOUT AREA */}
        {/* <main className="flex-1 min-w-0 min-h-0 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6">{children}</div>
        </main> */}
        {children}

        {/* OVERLAY LAYER */}
        <div className="pointer-events-none absolute inset-0 z-[999999]">
          {isDebug && (
            <div className="pointer-events-auto absolute bottom-4 right-4">
              <SysDebugPanel />
            </div>
          )}
          <SysOverlays />
        </div>
      </DockShell>
    </DockProvider>
  )
}
