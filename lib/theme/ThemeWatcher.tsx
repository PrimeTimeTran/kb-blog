'use client';

import { useEffect } from 'react';
import { useTheme } from '@teispace/next-themes';
import { useThemeStore } from '@/hooks/useThemeStore';
import { applyMaterialTheme } from '@/lib/theme/palette';

// May need clear theme cache sometimes
// localStorage.clear()
// sessionStorage.clear()
// (function clearCache() {
//   localStorage.clear()
//   sessionStorage.clear()
// })()

// # useEffect
// - client-side only
// - after mount
// - after hydration
export function ThemeWatcher() {
  const { resolvedTheme } = useTheme();
  const seed = useThemeStore((state) => state.seed);
  useEffect(() => {
    if (!resolvedTheme) return;
    applyMaterialTheme(seed, resolvedTheme === 'dark');
  }, [seed, resolvedTheme]);

  return null;
}
