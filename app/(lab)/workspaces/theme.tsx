import React from 'react';

type ThemeProviderProps = {
  theme?: React.CSSProperties;
  children: React.ReactNode;
};

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <div style={theme} className="h-full w-full">
      {children}
    </div>
  );
}

export const themeLightSaaS = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#ffffff',
  '--surface': '#f8fafc',
  '--surface-container': '#eef2f7',
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

export const themeOcean = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#f0f9ff',
  '--surface': '#e0f2fe',
  '--surface-container': '#bae6fd',
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

export const themeNeonDark = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#050b10',
  '--surface': '#0b1220',
  '--surface-container': '#111c2e',
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

export const themeZen = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#f7fee7',
  '--surface': '#ecfccb',
  '--surface-container': '#d9f99d',
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

export const themeEditorial = {
  // ======================================================
  // CORE SURFACES
  // ======================================================

  '--background': '#faf5ff',
  '--surface': '#f3e8ff',
  '--surface-container': '#e9d5ff',
  '--surface-2': '#ddd6fe',

  // ======================================================
  // BRAND COLORS
  // ======================================================

  '--primary': '#7c3aed',
  '--secondary': '#ec4899',
  '--tertiary': '#06b6d4',

  // ======================================================
  // TEXT
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
  // SPECIAL/BRAND FX
  // ======================================================

  '--gradient-primary': 'linear-gradient(135deg,#7c3aed 0%,#ec4899 100%)',

  '--glass': 'rgba(255,255,255,0.55)',
} as React.CSSProperties;

export const themes = {
  themeLightSaaS,
  themeOcean,
  themeNeonDark,
  themeZen,
  themeEditorial,
};
