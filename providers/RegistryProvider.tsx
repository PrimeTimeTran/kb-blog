'use client';

import React, { createContext, useContext } from 'react';

export const RegistryContext = createContext({});

export const useRegistry = () => useContext(RegistryContext);

export function RegistryProvider({ registry, children }: { children: React.ReactNode }) {
  return <RegistryContext.Provider value={registry}>{children}</RegistryContext.Provider>;
}
