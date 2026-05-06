// 1. Server Components (MDX)
// 2. Client state injection (Dock)
// 3. React.lazy dynamic import
// Each one has its own boundary rules.

'use client'

import Layout from './Layout'
import DockSlip from './DockSlip'

export default function DockLayout({ children }) {
  return (
    <Layout left={<DockSlip name="left" />} right={<DockSlip name="right" />}>
      {children}
    </Layout>
  )
}
