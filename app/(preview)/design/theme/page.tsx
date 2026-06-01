'use client';

import { DESIGN_SYSTEM_TABS } from './registry';
import ShowcasePage from './ShowcasePage';
import { TabGroupNavigator } from './TabGroupNavigator';
import { applyMaterialTheme } from '@/lib/theme/palette';
import { useEffect } from 'react';
import { useTheme } from '@teispace/next-themes';
import { useThemeStore } from '@/hooks/useThemeStore';

export default function ThemeShowcase() {
  const { seed, setSeed } = useThemeStore();
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    applyMaterialTheme(seed, isDark);
    // document.documentElement.classList.toggle('dark', isDark)
  }, [seed, isDark]);
  return <ShowcasePage />;
  return <TabGroupNavigator tabs={[...DESIGN_SYSTEM_TABS]} title="SHOWCASE" subtitle="v1.0.0" />;
}
