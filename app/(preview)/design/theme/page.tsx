'use client'
import { useTheme } from '@teispace/next-themes'
import React, { useEffect } from 'react'

import { applyMaterialTheme } from '@/lib/theme/palette'
import { useThemeStore } from '@/hooks/useThemeStore'
import { TabGroupNavigator } from './TabGroupNavigator'

import { DESIGN_SYSTEM_TABS } from './Material'

export default function ThemeShowcase() {
  const { seed, setSeed } = useThemeStore()
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    applyMaterialTheme(seed, isDark)
    // document.documentElement.classList.toggle('dark', isDark)
  }, [seed, isDark])
  return <TabGroupNavigator tabs={[...DESIGN_SYSTEM_TABS]} title="SHOWCASE" subtitle="v1.0.0" />
}
