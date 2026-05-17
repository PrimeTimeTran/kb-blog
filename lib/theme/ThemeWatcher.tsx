// components/theme/ThemeWatcher.tsx
'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useThemeStore } from '@/hooks/useThemeStore'
import { applyMaterialTheme } from '@/lib/theme/palette'

// localStorage.clear()
// sessionStorage.clear()
export function ThemeWatcher() {
  const { resolvedTheme } = useTheme()
  const seed = useThemeStore((state) => state.seed)

  useEffect(() => {
    if (!resolvedTheme) return

    applyMaterialTheme(seed, resolvedTheme === 'dark')
  }, [seed, resolvedTheme])

  return null
}
