// components/theme/ThemeWatcher.tsx
'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useThemeStore } from '@/hooks/useThemeStore'
import { applyMaterialTheme } from '@/lib/theme/palette'

// localStorage.clear()
// sessionStorage.clear()
export function ThemeWatcher() {
  //   const { resolvedTheme } = useTheme()
  //   const seed = useThemeStore((state) => state.seed)
  //   useEffect(() => {
  //     // 1. Wait for next-themes to resolve (prevents flash of wrong theme)
  //     if (!resolvedTheme) return
  //     // 2. Call your comprehensive engine from lib/theme/palette.ts
  //     applyMaterialTheme(seed, resolvedTheme === 'dark')
  //     // 3. Sync the 'dark' class for Tailwind
  //     if (resolvedTheme === 'dark') {
  //       document.documentElement.classList.add('dark')
  //     } else {
  //       document.documentElement.classList.remove('dark')
  //     }
  //   }, [seed, resolvedTheme])
  //   return null
}
