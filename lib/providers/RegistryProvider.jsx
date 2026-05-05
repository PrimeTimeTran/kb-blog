'use client'

import { createContext, useContext } from 'react'

export const RegistryContext = createContext({})

export const useRegistry = () => useContext(RegistryContext)

export function RegistryProvider({ registry, children }) {
  return <RegistryContext.Provider value={registry}>{children}</RegistryContext.Provider>
}
