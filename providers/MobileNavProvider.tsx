'use client';

import React, { createContext, useContext, useState } from 'react';

const MobileNavContext = createContext(null);

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return <MobileNavContext.Provider value={{ open, setOpen }}>{children}</MobileNavContext.Provider>;
}

export function useMobileNav() {
  const ctx = useContext(MobileNavContext);
  if (!ctx) throw new Error('useMobileNav must be used inside MobileNavProvider');
  return ctx;
}
