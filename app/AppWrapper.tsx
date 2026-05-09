'use client'

import { ClientRegister } from './ClientRegister'

export default function AppWrappeer({ children }) {
  return (
    <>
      <ClientRegister />
      {children}
    </>
  )
}
