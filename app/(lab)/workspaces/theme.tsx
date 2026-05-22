import React from 'react'

type ThemeProviderProps = {
  theme?: React.CSSProperties
  children: React.ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <div style={theme} className="h-full w-full">
      {children}
    </div>
  )
}

export const themeLightSaaS = {
  '--background': '#ffffff',
  '--surface': '#f8fafc',
  '--surface-container': '#eef2f7',
  '--surface-2': '#f1f5f9',

  '--primary': '#2563eb', // blue
  '--secondary': '#0ea5e9', // sky
  '--tertiary': '#8b5cf6', // violet

  '--on-background': '#0f172a',
  '--on-surface': '#1e293b',

  '--muted': '#64748b',
  '--muted-foreground': '#94a3b8',

  '--border': 'rgba(15, 23, 42, 0.08)',
} as React.CSSProperties
export const themeOcean = {
  '--background': '#f0f9ff',
  '--surface': '#e0f2fe',
  '--surface-container': '#bae6fd',
  '--surface-2': '#7dd3fc',

  '--primary': '#06b6d4', // cyan
  '--secondary': '#0f766e', // deep teal
  '--tertiary': '#3b82f6', // blue accent

  '--on-background': '#082f49',
  '--on-surface': '#0f172a',

  '--muted': '#334155',
  '--muted-foreground': '#475569',

  '--border': 'rgba(2, 132, 199, 0.2)',
} as React.CSSProperties
export const themeNeonDark = {
  '--background': '#050b10',
  '--surface': '#0b1220',
  '--surface-container': '#111c2e',
  '--surface-2': '#0f172a',

  '--primary': '#22d3ee', // neon cyan
  '--secondary': '#a78bfa', // purple
  '--tertiary': '#fb7185', // pink/red

  '--on-background': '#e2e8f0',
  '--on-surface': '#cbd5e1',

  '--muted': '#94a3b8',
  '--muted-foreground': '#64748b',

  '--border': 'rgba(148, 163, 184, 0.12)',
} as React.CSSProperties
export const themeZen = {
  '--background': '#f7fee7',
  '--surface': '#ecfccb',
  '--surface-container': '#d9f99d',
  '--surface-2': '#bef264',

  '--primary': '#22c55e', // green
  '--secondary': '#84cc16', // lime
  '--tertiary': '#14b8a6', // teal

  '--on-background': '#1a2e05',
  '--on-surface': '#365314',

  '--muted': '#4d7c0f',
  '--muted-foreground': '#65a30d',

  '--border': 'rgba(132, 204, 22, 0.25)',
} as React.CSSProperties
export const themeEditorial = {
  '--background': '#faf5ff',
  '--surface': '#f3e8ff',
  '--surface-container': '#e9d5ff',
  '--surface-2': '#ddd6fe',

  '--primary': '#7c3aed', // violet
  '--secondary': '#ec4899', // pink
  '--tertiary': '#06b6d4', // cyan accent

  '--on-background': '#1e1b4b',
  '--on-surface': '#312e81',

  '--muted': '#6b21a8',
  '--muted-foreground': '#7e22ce',

  '--border': 'rgba(124, 58, 237, 0.15)',
} as React.CSSProperties

export const themes = { themeLightSaaS, themeOcean, themeNeonDark, themeZen, themeEditorial }
