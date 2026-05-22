'use client';

import { createContext, useContext, useState } from 'react';
import { DEFAULT_LEFT, DEFAULT_RIGHT } from '../data/core-constants';
import { Graffiti } from '@/components/Graffiti';
import { AppNavbar } from '@/components/layout/AppNavbar';

const LayoutContext = createContext(null);

export function LayoutProvider({ children }) {
  const [layout, setLayout] = useState({
    left: DEFAULT_LEFT,
    right: DEFAULT_RIGHT,
  });
  return <LayoutContext.Provider value={{ layout, setLayout }}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider');
  return ctx;
}
