// store/useThemeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  seed: string
  setSeed: (newSeed: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // Default brand color (e.g., your OMNI UI blue)
      seed: '#3b82f6',

      setSeed: (newSeed: string) => set({ seed: newSeed }),
    }),
    {
      name: 'omni-ui-storage', // Key in localStorage
    }
  )
)
