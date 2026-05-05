// components/providers/ScrollSpyWrapper.jsx
'use client'

import { ScrollSpyProvider } from '@/components/providers/ScrollSpyProvider'

export default function ScrollSpyWrapper({ children }) {
  return <ScrollSpyProvider>{children}</ScrollSpyProvider>
}
