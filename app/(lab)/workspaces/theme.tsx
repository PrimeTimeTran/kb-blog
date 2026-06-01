'use client';

import React from 'react';
import { WorkspaceThemeProviderProps } from './types';
import { useTheme } from '@teispace/next-themes';

export function WorkspaceThemeProvider({ theme, children }: WorkspaceThemeProviderProps) {
  const { resolvedTheme } = useTheme();

  const mode = resolvedTheme === 'dark' ? 'dark' : 'light';

  const resolvedStyles = themes[theme]?.[mode];

  return (
    <div
      style={resolvedStyles}
      data-theme={theme}
      data-theme-mode={mode}
      className="h-full w-full bg-background text-on-background"
    >
      {children}
    </div>
  );
}
export const themeSassLight = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#ffffff',
  '--surface': '#f8fafc',
  '--level': '#eef2f7',
  '--surface-2': '#f1f5f9',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#2563eb',
  '--secondary': '#0ea5e9',
  '--tertiary': '#8b5cf6',

  // ======================================================
  // TEXT
  // ======================================================

  '--on-background': '#0f172a',
  '--on-surface': '#1e293b',

  '--muted': '#64748b',
  '--muted-foreground': '#94a3b8',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(15,23,42,0.08)',
  '--border-strong': 'rgba(15,23,42,0.14)',

  '--ring': 'rgba(37,99,235,0.28)',
  '--overlay': 'rgba(255,255,255,0.72)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(15,23,42,0.04)',

  '--shadow-md': '0 10px 30px rgba(15,23,42,0.08)',

  '--shadow-lg': '0 24px 80px rgba(15,23,42,0.12)',

  // ======================================================
  // RADII
  // ======================================================

  // polished SaaS feel
  '--radius-sm': '12px',
  '--radius-md': '18px',
  '--radius-lg': '28px',

  // ======================================================
  // TYPOGRAPHY
  // ======================================================

  // clean / product-focused
  '--font-sans': 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter',

  '--font-display': 'ui-sans-serif, system-ui, Inter',

  '--font-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '700',

  '--tracking-tight': '-0.03em',
  '--tracking-wide': '0.03em',

  // ======================================================
  // MOTION
  // ======================================================

  // balanced + professional
  '--ease-standard': 'cubic-bezier(0.22,1,0.36,1)',
  '--ease-snappy': 'cubic-bezier(0.34,1.2,0.64,1)',

  '--duration-fast': '120ms',
  '--duration-normal': '260ms',
  '--duration-slow': '600ms',

  // ======================================================
  // SPECIAL / BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#2563eb 0%,#0ea5e9 50%,#8b5cf6 100%)',

  '--glass': 'rgba(255,255,255,0.58)',

  '--glow-primary': '0 0 24px rgba(37,99,235,0.12)',

  '--glow-secondary': '0 0 32px rgba(139,92,246,0.10)',
} as React.CSSProperties;
export const themeSassDark: React.CSSProperties = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#0b1220',
  '--surface': '#0f172a',
  '--level': '#111c33',
  '--surface-2': '#16213a',

  // ======================================================
  // BRAND COLORS (lifted for dark contrast)
  // ======================================================

  '--primary': '#3b82f6',
  '--secondary': '#38bdf8',
  '--tertiary': '#a78bfa',

  // ======================================================
  // TEXT
  // ======================================================

  '--on-background': '#f1f5f9',
  '--on-surface': '#e2e8f0',

  '--muted': '#94a3b8',
  '--muted-foreground': '#64748b',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(241,245,249,0.08)',
  '--border-strong': 'rgba(241,245,249,0.14)',

  '--ring': 'rgba(59,130,246,0.35)',
  '--overlay': 'rgba(0,0,0,0.55)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(0,0,0,0.4)',
  '--shadow-md': '0 10px 30px rgba(0,0,0,0.55)',
  '--shadow-lg': '0 24px 80px rgba(0,0,0,0.7)',

  // ======================================================
  // RADII (keep consistent)
  // ======================================================

  '--radius-sm': '12px',
  '--radius-md': '18px',
  '--radius-lg': '28px',

  // ======================================================
  // TYPOGRAPHY (same system, higher contrast)
  // ======================================================

  '--font-sans': 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter',
  '--font-display': 'ui-sans-serif, system-ui, Inter',
  '--font-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '700',

  '--tracking-tight': '-0.03em',
  '--tracking-wide': '0.03em',

  // ======================================================
  // MOTION (same feel, slightly softer in dark)
  // ======================================================

  '--ease-standard': 'cubic-bezier(0.22,1,0.36,1)',
  '--ease-snappy': 'cubic-bezier(0.34,1.2,0.64,1)',

  '--duration-fast': '120ms',
  '--duration-normal': '260ms',
  '--duration-slow': '600ms',

  // ======================================================
  // SPECIAL / BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#3b82f6 0%,#38bdf8 50%,#a78bfa 100%)',

  '--glass': 'rgba(255,255,255,0.06)',

  '--glow-primary': '0 0 28px rgba(59,130,246,0.18)',

  '--glow-secondary': '0 0 40px rgba(167,139,250,0.14)',
} as React.CSSProperties;

export const themeOceanLight = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#f0f9ff',
  '--surface': '#e0f2fe',
  '--level': '#bae6fd',
  '--surface-2': '#7dd3fc',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#06b6d4',
  '--secondary': '#0f766e',
  '--tertiary': '#3b82f6',

  // ======================================================
  // TEXT
  // ======================================================

  '--on-background': '#082f49',
  '--on-surface': '#0f172a',

  '--muted': '#334155',
  '--muted-foreground': '#475569',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(2,132,199,0.2)',
  '--border-strong': 'rgba(3,105,161,0.32)',

  '--ring': 'rgba(6,182,212,0.35)',
  '--overlay': 'rgba(240,249,255,0.72)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(2,132,199,0.05)',

  '--shadow-md': '0 10px 30px rgba(14,165,233,0.10)',

  '--shadow-lg': '0 24px 80px rgba(6,182,212,0.18)',

  // ======================================================
  // RADII
  // ======================================================

  // smooth + fluid
  '--radius-sm': '14px',
  '--radius-md': '22px',
  '--radius-lg': '34px',

  // ======================================================
  // TYPOGRAPHY
  // ======================================================

  // airy / modern / clean
  '--font-sans': 'ui-sans-serif, system-ui, Inter, "SF Pro Display"',

  '--font-display': 'ui-sans-serif, system-ui, Inter',

  '--font-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '700',

  '--tracking-tight': '-0.025em',
  '--tracking-wide': '0.04em',

  // ======================================================
  // MOTION
  // ======================================================

  // fluid / wave-like
  '--ease-standard': 'cubic-bezier(0.16,1,0.3,1)',
  '--ease-snappy': 'cubic-bezier(0.34,1.3,0.64,1)',

  '--duration-fast': '140ms',
  '--duration-normal': '320ms',
  '--duration-slow': '720ms',

  // ======================================================
  // SPECIAL / BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#06b6d4 0%,#3b82f6 50%,#0f766e 100%)',

  '--glass': 'rgba(224,242,254,0.58)',

  '--glow-primary': '0 0 24px rgba(6,182,212,0.22)',

  '--glow-secondary': '0 0 32px rgba(59,130,246,0.18)',
} as React.CSSProperties;
export const themeOceanDark: React.CSSProperties = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#06121a',
  '--surface': '#0a1b26',
  '--level': '#0d2533',
  '--surface-2': '#103246',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#22d3ee',
  '--secondary': '#14b8a6',
  '--tertiary': '#60a5fa',

  // ======================================================
  // TEXT
  // ======================================================

  '--on-background': '#e6f6ff',
  '--on-surface': '#d6f1ff',

  '--muted': '#7aa6b8',
  '--muted-foreground': '#5c7f93',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(34,211,238,0.14)',
  '--border-strong': 'rgba(34,211,238,0.26)',

  '--ring': 'rgba(34,211,238,0.38)',
  '--overlay': 'rgba(0,0,0,0.6)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(0,0,0,0.45)',
  '--shadow-md': '0 10px 30px rgba(0,0,0,0.55)',
  '--shadow-lg': '0 24px 80px rgba(0,0,0,0.7)',

  // ======================================================
  // RADII
  // ======================================================

  '--radius-sm': '14px',
  '--radius-md': '22px',
  '--radius-lg': '34px',

  // ======================================================
  // TYPOGRAPHY
  // ======================================================

  '--font-sans': 'ui-sans-serif, system-ui, Inter, "SF Pro Display"',
  '--font-display': 'ui-sans-serif, system-ui, Inter',
  '--font-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '700',

  '--tracking-tight': '-0.025em',
  '--tracking-wide': '0.04em',

  // ======================================================
  // MOTION
  // ======================================================

  '--ease-standard': 'cubic-bezier(0.16,1,0.3,1)',
  '--ease-snappy': 'cubic-bezier(0.34,1.3,0.64,1)',

  '--duration-fast': '140ms',
  '--duration-normal': '320ms',
  '--duration-slow': '720ms',

  // ======================================================
  // SPECIAL / BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#22d3ee 0%,#60a5fa 50%,#14b8a6 100%)',

  '--glass': 'rgba(255,255,255,0.06)',

  '--glow-primary': '0 0 28px rgba(34,211,238,0.18)',

  '--glow-secondary': '0 0 40px rgba(96,165,250,0.14)',
};

export const themeNeonLight = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#f4fbff',
  '--surface': '#ffffff',
  '--level': '#ecfeff',
  '--surface-2': '#dbeafe',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#06b6d4',
  '--secondary': '#8b5cf6',
  '--tertiary': '#f43f5e',

  // ======================================================
  // TEXT
  // ======================================================

  '--on-background': '#0f172a',
  '--on-surface': '#1e293b',

  '--muted': '#64748b',
  '--muted-foreground': '#94a3b8',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(15,23,42,0.08)',
  '--border-strong': 'rgba(6,182,212,0.24)',

  '--ring': 'rgba(6,182,212,0.28)',
  '--overlay': 'rgba(255,255,255,0.72)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(15,23,42,0.04)',

  '--shadow-md': '0 0 0 1px rgba(6,182,212,0.06), 0 12px 40px rgba(6,182,212,0.08)',

  '--shadow-lg': '0 0 0 1px rgba(139,92,246,0.08), 0 24px 80px rgba(6,182,212,0.14)',

  // ======================================================
  // RADII
  // ======================================================

  // still futuristic, but softer in light mode
  '--radius-sm': '10px',
  '--radius-md': '16px',
  '--radius-lg': '24px',

  // ======================================================
  // TYPOGRAPHY
  // ======================================================

  '--font-sans': 'Inter, ui-sans-serif, system-ui',

  '--font-display': 'Space Grotesk, Inter, system-ui',

  '--font-mono': 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '700',

  '--tracking-tight': '-0.03em',
  '--tracking-wide': '0.08em',

  // ======================================================
  // MOTION
  // ======================================================

  '--ease-standard': 'cubic-bezier(0.22,1,0.36,1)',

  '--ease-snappy': 'cubic-bezier(0.34,1.56,0.64,1)',

  '--duration-fast': '100ms',
  '--duration-normal': '220ms',
  '--duration-slow': '500ms',

  // ======================================================
  // SPECIAL / BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#06b6d4 0%,#8b5cf6 50%,#f43f5e 100%)',

  '--glass': 'rgba(255,255,255,0.62)',

  // softer glow behavior for bright surfaces
  '--glow-primary': '0 0 24px rgba(6,182,212,0.18)',

  '--glow-secondary': '0 0 32px rgba(139,92,246,0.16)',
} as React.CSSProperties;
export const themeNeonDark = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#050b10',
  '--surface': '#0b1220',
  '--level': '#111c2e',
  '--surface-2': '#0f172a',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#22d3ee',
  '--secondary': '#a78bfa',
  '--tertiary': '#fb7185',

  // ======================================================
  // TEXT
  // ======================================================

  '--on-background': '#e2e8f0',
  '--on-surface': '#cbd5e1',

  '--muted': '#94a3b8',
  '--muted-foreground': '#64748b',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(148,163,184,0.12)',
  '--border-strong': 'rgba(34,211,238,0.32)',

  '--ring': 'rgba(34,211,238,0.45)',
  '--overlay': 'rgba(2,6,23,0.72)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(0,0,0,0.25)',

  '--shadow-md': '0 0 0 1px rgba(34,211,238,0.08), 0 12px 40px rgba(34,211,238,0.12)',

  '--shadow-lg': '0 0 0 1px rgba(167,139,250,0.12), 0 24px 80px rgba(34,211,238,0.22)',

  // ======================================================
  // RADII
  // ======================================================

  // sharper / futuristic
  '--radius-sm': '10px',
  '--radius-md': '16px',
  '--radius-lg': '24px',

  // ======================================================
  // TYPOGRAPHY
  // ======================================================

  // “tech / terminal / cyberpunk”
  '--font-sans': 'Inter, ui-sans-serif, system-ui',
  '--font-display': 'Space Grotesk, Inter, system-ui',
  '--font-mono': 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '700',

  '--tracking-tight': '-0.03em',
  '--tracking-wide': '0.08em',

  // ======================================================
  // MOTION
  // ======================================================

  // snappier / more energetic
  '--ease-standard': 'cubic-bezier(0.22,1,0.36,1)',
  '--ease-snappy': 'cubic-bezier(0.34,1.56,0.64,1)',

  '--duration-fast': '100ms',
  '--duration-normal': '220ms',
  '--duration-slow': '500ms',

  // ======================================================
  // SPECIAL / BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#22d3ee 0%,#a78bfa 50%,#fb7185 100%)',

  '--glass': 'rgba(15,23,42,0.55)',

  // neon glow helpers
  '--glow-primary': '0 0 24px rgba(34,211,238,0.45)',

  '--glow-secondary': '0 0 32px rgba(167,139,250,0.35)',
} as React.CSSProperties;

export const themeZenLight = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#f7fee7',
  '--surface': '#ecfccb',
  '--level': '#d9f99d',
  '--surface-2': '#bef264',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#22c55e',
  '--secondary': '#84cc16',
  '--tertiary': '#14b8a6',

  // ======================================================
  // TEXT
  // ======================================================

  '--on-background': '#1a2e05',
  '--on-surface': '#365314',

  '--muted': '#4d7c0f',
  '--muted-foreground': '#65a30d',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(132, 204, 22, 0.25)',
  '--border-strong': 'rgba(101, 163, 13, 0.4)',

  '--ring': 'rgba(34, 197, 94, 0.35)',
  '--overlay': 'rgba(247,254,231,0.72)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(20,83,45,0.04)',
  '--shadow-md': '0 8px 30px rgba(101,163,13,0.08)',
  '--shadow-lg': '0 20px 60px rgba(34,197,94,0.14)',

  // ======================================================
  // RADII
  // ======================================================

  '--radius-sm': '14px',
  '--radius-md': '24px',
  '--radius-lg': '36px',

  // ======================================================
  // TYPOGRAPHY
  // ======================================================

  // calm + neutral
  '--font-sans': 'ui-sans-serif, system-ui, "SF Pro Text", Inter',
  '--font-display': 'ui-sans-serif, system-ui, Inter',
  '--font-mono': 'ui-monospace, SFMono-Regular, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '650',

  '--tracking-tight': '-0.02em',
  '--tracking-wide': '0.04em',

  // ======================================================
  // MOTION
  // ======================================================

  // softer/slower easing
  '--ease-standard': 'cubic-bezier(0.16,1,0.3,1)',
  '--ease-snappy': 'cubic-bezier(0.34,1.2,0.64,1)',

  '--duration-fast': '160ms',
  '--duration-normal': '420ms',
  '--duration-slow': '900ms',

  // ======================================================
  // SPECIAL / BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#84cc16 0%,#22c55e 50%,#14b8a6 100%)',

  '--glass': 'rgba(236,252,203,0.58)',
} as React.CSSProperties;
export const themeZenDark = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#0b1208',
  '--surface': '#11190f',
  '--level': '#172114',
  '--surface-2': '#1f2d19',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#4ade80',
  '--secondary': '#a3e635',
  '--tertiary': '#2dd4bf',

  // ======================================================
  // TEXT
  // ======================================================

  '--on-background': '#ecfccb',
  '--on-surface': '#d9f99d',

  '--muted': '#a3a3a3',
  '--muted-foreground': '#84cc16',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(163,230,53,0.12)',
  '--border-strong': 'rgba(74,222,128,0.24)',

  '--ring': 'rgba(74,222,128,0.32)',
  '--overlay': 'rgba(11,18,8,0.72)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(0,0,0,0.24)',

  '--shadow-md': '0 10px 30px rgba(74,222,128,0.08)',

  '--shadow-lg': '0 24px 80px rgba(34,197,94,0.16)',

  // ======================================================
  // RADII
  // ======================================================

  '--radius-sm': '14px',
  '--radius-md': '24px',
  '--radius-lg': '36px',

  // ======================================================
  // TYPOGRAPHY
  // ======================================================

  // calm + grounded
  '--font-sans': 'ui-sans-serif, system-ui, "SF Pro Text", Inter',

  '--font-display': 'ui-sans-serif, system-ui, Inter',

  '--font-mono': 'ui-monospace, SFMono-Regular, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '650',

  '--tracking-tight': '-0.02em',
  '--tracking-wide': '0.04em',

  // ======================================================
  // MOTION
  // ======================================================

  // soft / organic / meditative
  '--ease-standard': 'cubic-bezier(0.16,1,0.3,1)',

  '--ease-snappy': 'cubic-bezier(0.34,1.2,0.64,1)',

  '--duration-fast': '160ms',
  '--duration-normal': '420ms',
  '--duration-slow': '900ms',

  // ======================================================
  // SPECIAL / BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#a3e635 0%,#4ade80 50%,#2dd4bf 100%)',

  '--glass': 'rgba(23,33,20,0.58)',

  '--glow-primary': '0 0 24px rgba(74,222,128,0.14)',

  '--glow-secondary': '0 0 32px rgba(45,212,191,0.10)',
} as React.CSSProperties;

export const themeEditorialLight: React.CSSProperties = {
  // ======================================================
  // CORE SURFACES (LIGHT)
  // ======================================================

  '--background': '#faf5ff',
  '--surface': '#ffffff',
  '--level': '#f3e8ff',
  '--surface-2': '#ede9fe',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#7c3aed',
  '--secondary': '#ec4899',
  '--tertiary': '#06b6d4',

  // ======================================================
  // TEXT (LIGHT CONTRAST MODEL)
  // ======================================================

  '--on-background': '#1e1b4b',
  '--on-surface': '#312e81',

  '--muted': '#6b21a8',
  '--muted-foreground': '#7e22ce',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(124, 58, 237, 0.15)',
  '--border-strong': 'rgba(124, 58, 237, 0.3)',

  '--ring': 'rgba(124, 58, 237, 0.45)',
  '--overlay': 'rgba(255,255,255,0.65)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(0,0,0,0.04)',
  '--shadow-md': '0 8px 24px rgba(124,58,237,0.08)',
  '--shadow-lg': '0 24px 80px rgba(124,58,237,0.18)',

  // ======================================================
  // RADII
  // ======================================================

  '--radius-sm': '10px',
  '--radius-md': '18px',
  '--radius-lg': '28px',

  // ======================================================
  // TYPOGRAPHY
  // ======================================================

  '--font-sans': 'Inter, ui-sans-serif, system-ui',
  '--font-display': 'Playfair Display, Georgia, serif',
  '--font-mono': 'ui-monospace, SFMono-Regular, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '700',

  '--tracking-tight': '-0.04em',
  '--tracking-wide': '0.08em',

  // ======================================================
  // MOTION
  // ======================================================

  '--ease-standard': 'cubic-bezier(0.22,1,0.36,1)',
  '--ease-snappy': 'cubic-bezier(0.34,1.56,0.64,1)',

  '--duration-fast': '120ms',
  '--duration-normal': '300ms',
  '--duration-slow': '700ms',

  // ======================================================
  // SPECIAL
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#7c3aed 0%,#ec4899 100%)',

  '--glass': 'rgba(255,255,255,0.55)',
};
export const themeEditorialDark: React.CSSProperties = {
  // ======================================================
  // CORE SURFACES (DARK)
  // ======================================================

  '--background': '#0b0b14',
  '--surface': '#111122',
  '--level': '#16162a',
  '--surface-2': '#1d1d36',

  // ======================================================
  // BRAND COLORS (same hue, slightly lifted)
  // ======================================================

  '--primary': '#a78bfa',
  '--secondary': '#f472b6',
  '--tertiary': '#22d3ee',

  // ======================================================
  // TEXT (DARK CONTRAST MODEL)
  // ======================================================

  '--on-background': '#f5f5ff',
  '--on-surface': '#e4e4ff',

  '--muted': '#a78bfa',
  '--muted-foreground': '#c4b5fd',

  // ======================================================
  // UI STRUCTURE
  // ======================================================

  '--border': 'rgba(167, 139, 250, 0.18)',
  '--border-strong': 'rgba(167, 139, 250, 0.35)',

  '--ring': 'rgba(167, 139, 250, 0.5)',
  '--overlay': 'rgba(0,0,0,0.6)',

  // ======================================================
  // DEPTH
  // ======================================================

  '--shadow-sm': '0 1px 2px rgba(0,0,0,0.4)',
  '--shadow-md': '0 10px 30px rgba(0,0,0,0.5)',
  '--shadow-lg': '0 30px 80px rgba(0,0,0,0.65)',

  // ======================================================
  // RADII (unchanged)
  // ======================================================

  '--radius-sm': '10px',
  '--radius-md': '18px',
  '--radius-lg': '28px',

  // ======================================================
  // TYPOGRAPHY (unchanged)
  // ======================================================

  '--font-sans': 'Inter, ui-sans-serif, system-ui',
  '--font-display': 'Playfair Display, Georgia, serif',
  '--font-mono': 'ui-monospace, SFMono-Regular, monospace',

  '--font-weight-normal': '400',
  '--font-weight-medium': '500',
  '--font-weight-bold': '700',

  '--tracking-tight': '-0.04em',
  '--tracking-wide': '0.08em',

  // ======================================================
  // MOTION
  // ======================================================

  '--ease-standard': 'cubic-bezier(0.22,1,0.36,1)',
  '--ease-snappy': 'cubic-bezier(0.34,1.56,0.64,1)',

  '--duration-fast': '120ms',
  '--duration-normal': '300ms',
  '--duration-slow': '700ms',

  // ======================================================
  // SPECIAL
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#a78bfa 0%,#f472b6 100%)',

  '--glass': 'rgba(255,255,255,0.06)',
};

export const themes = {
  sass: {
    light: themeSassLight,
    dark: themeSassDark,
  },
  ocean: {
    light: themeOceanLight,
    dark: themeOceanDark,
  },
  editorial: {
    light: themeEditorialLight,
    dark: themeEditorialDark,
  },
  neon: {
    light: themeNeonLight,
    dark: themeNeonDark,
  },
  zen: {
    light: themeZenLight,
    dark: themeZenDark,
  },
};
