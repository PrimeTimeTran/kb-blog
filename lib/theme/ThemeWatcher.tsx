'use client';

import { useEffect } from 'react';
import { useTheme } from '@teispace/next-themes';
import { useThemeStore } from '@/hooks/useThemeStore';
import { applyMaterialTheme, updateDynamicFavicon } from '@/lib/theme/palette';

// May need clear theme cache sometimes
// sessionStorage.clear()
// localStorage.clear()
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
  const hasUserSetSeed = useThemeStore((state) => state.hasUserSetSeed);
  useEffect(() => {
    if (resolvedTheme) {
      const getPrimaryColor = () => {
        return getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
      };
      // Use the seed from the store (or a fallback color from your base CSS)
      const currentSeed = getPrimaryColor() || '#3b82f6';
      updateDynamicFavicon(currentSeed, resolvedTheme === 'dark');
    }
  }, [resolvedTheme, seed]); // Runs when theme or seed changes
  useEffect(() => {
    // ONLY run if the user has manually interacted with the seed
    if (hasUserSetSeed && resolvedTheme) {
      applyMaterialTheme(seed, resolvedTheme === 'dark');
    }
  }, [seed, resolvedTheme, hasUserSetSeed]);

  return null;
}
