'use client';
import { createContext, useContext } from 'react';

export const RegistryContext = createContext(null);

export const useRegistry = () => {
  const ctx = useContext(RegistryContext);
  if (!ctx) throw new Error('RegistryProvider missing');
  return ctx;
};
