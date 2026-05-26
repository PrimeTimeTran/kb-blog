// store/useThemeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  seed: string;
  setSeed: (newSeed: string) => void;
  hasUserSetSeed: boolean;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      seed: '#3b82f6',
      hasUserSetSeed: false, // New flag
      setSeed: (newSeed: string) => set({ seed: newSeed, hasUserSetSeed: true }),
    }),
    {
      name: 'omni-ui-storage',
    },
  ),
);
