'use client'

import { RegisterSysOverlays } from './RegisterSysOverlays'

export default function AppWrappeer({ children }) {
  return (
    <>
      <RegisterSysOverlays />
      {children}
    </>
  )
}
