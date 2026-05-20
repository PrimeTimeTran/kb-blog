// components/theme/ThemeWatcher.tsx
'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@teispace/next-themes'
import { useThemeStore } from '@/hooks/useThemeStore'
import { applyMaterialTheme } from '@/lib/theme/palette'

// localStorage.clear()
// sessionStorage.clear()
// (function clearCache() {
//   localStorage.clear()
//   sessionStorage.clear()
// })()
// lib/theme/ThemeWatcher.tsx
export function ThemeWatcher() {
  const { resolvedTheme } = useTheme()
  const seed = useThemeStore((state) => state.seed)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !resolvedTheme) return

    applyMaterialTheme(seed, resolvedTheme === 'dark')
  }, [mounted, seed, resolvedTheme])

  return null
}
