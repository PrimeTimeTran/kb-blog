'use client';

import React from 'react';
import { useScroll } from '@/providers';

export function BaseScroll({ children, className }: { children: React.ReactNode; className?: string }) {
  const { setScrollEl } = useScroll();
  return (
    <div
      ref={setScrollEl}
      data-scroll-root
      id="scroll-container"
      className={`flex-1 min-w-0 overflow-y-auto scroll-smooth no-scrollbar ${className ? className : ''}`}
      style={{ contain: 'layout paint' }}
    >
      {children}
    </div>
  );
}
