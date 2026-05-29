'use client';

import { DEFAULT_LEFT, DEFAULT_RIGHT } from '../data/core-constants';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

import React from 'react';

const LayoutContext = createContext(null);

type Layout = {
  layout: {
    left: number;
    right: number;
  };
  setLayout: Dispatch<
    SetStateAction<{
      left: number;
      right: number;
    }>
  >;
};
export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState({
    left: DEFAULT_LEFT,
    right: DEFAULT_RIGHT,
  });
  const value: Layout = { layout, setLayout };
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayout must be used inside LayoutProvider');
  return ctx;
}
