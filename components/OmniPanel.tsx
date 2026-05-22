'use client';

import React, { useState, useMemo, useId, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@teispace/next-themes';

export function OmniPanel({
  header,
  footer,
  children,
  className = '',
  variant = 'none',
  elevation = 'low',
  hoverEffect = 'none',
  color = 'surface',
  headerClassName = '',
  isHoverable = true,
}: OmniPanelProps) {
  const { resolvedTheme, systemTheme } = useTheme();
  const theme = resolvedTheme ?? systemTheme;

  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Error: Calling setState synchronously within an effect can trigger cascading renders
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * 1. ALWAYS SAFE DERIVATIONS (NO EARLY RETURN BEFORE THIS)
   */
  const id = useId();
  const isDark = theme === 'dark';
  const isSemantic = color !== 'surface';

  const colorMap = useMemo(() => getColorMap(isDark), [isDark]);
  const surfaceMap = useMemo(() => getSurfaceMap(isDark), [isDark]);
  const shadowMap = useMemo(() => getShadowMap(isDark), [isDark]);

  const semantic = isSemantic ? colorMap[color] : null;

  const baseShadow = shadowMap[elevation];
  const hoverShadow = shadowMap[elevation === 'low' ? 'default' : 'high'];

  const bgStyle = isSemantic ? semantic?.container : surfaceMap[variant][elevation];

  const borderStyle = isSemantic ? (semantic?.border ?? 'border-outline-variant/30') : 'border-outline-variant/30';

  const traceColors = {
    start: `var(--${isSemantic ? color : 'primary'})`,
    middle: isDark ? `var(--tertiary)` : `var(--secondary)`,
    end: `var(--${isSemantic ? color : 'primary'})`,
    glow: `var(--${isSemantic ? color : 'primary'})`,
  };

  const motionVariants = useMemo(
    () => ({
      initial: { scale: 1, y: 0, boxShadow: baseShadow },
      pop: { scale: 1.015, y: -4, boxShadow: hoverShadow },
      lift: { y: -2, boxShadow: hoverShadow },
      none: { scale: 1, y: 0, boxShadow: baseShadow },
      shadow: {
        scale: 0.98,
        y: 0,
        boxShadow: hoverShadow,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      },
    }),
    [baseShadow, hoverShadow],
  );

  /**
   * 2. ONLY AFTER EVERYTHING: RENDER GUARD
   */
  if (!mounted || !theme) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-[28px] ${className}`}
      animate={isHoverable && isHovered ? motionVariants[hoverEffect] : motionVariants.initial}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {variant === 'trace' && isHoverable && (
        <svg
          className="absolute inset-[-2px] h-[calc(100%+4px)] w-[calc(100%+4px)] pointer-events-none"
          style={{ zIndex: 50, overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
              <motion.stop offset="0%" stopColor={traceColors.start} />
              <motion.stop offset="50%" stopColor={traceColors.middle} />
              <motion.stop offset="100%" stopColor={traceColors.end} />
            </linearGradient>
          </defs>
          <motion.rect
            x="2"
            y="2"
            rx="28"
            fill="none"
            strokeWidth="3"
            width="calc(100% - 4px)"
            height="calc(100% - 4px)"
            stroke={`url(#${id})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isHovered ? 1 : 0,
              pathOffset: isHovered ? 0 : 1,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              pathLength: { duration: isHovered ? 0.8 : 0.6, ease: 'easeOut' },
              opacity: { duration: 0.2 },
            }}
            style={{ filter: isHovered ? `drop-shadow(0 0 8px ${traceColors.glow})` : 'none' }}
          />
        </svg>
      )}

      <div
        className={`
        relative z-10 h-full w-full overflow-hidden rounded-[28px] border transition-all duration-500
        ${borderStyle} ${bgStyle}
        ${isHoverable && isHovered && hoverEffect === 'shadow' ? 'bg-primary/[0.04] ring-1 ring-inset ring-primary/10 shadow-inner' : ''}
      `}
      >
        {header && (
          <header
            className={`px-5 py-3 border-b border-outline-variant/10 backdrop-blur-sm ${isSemantic ? semantic.header : 'bg-surface-container-high'} ${headerClassName}`}
          >
            <span className={`font-bold tracking-tight ${isSemantic ? semantic.brandText : 'text-on-surface'}`}>
              {header}
            </span>
          </header>
        )}

        <main className="h-full w-full">
          {/* 
              CLEAN BREAK:
              Body text is forced to semantic.bodyText (on-surface).
              We pass the brand color as a CSS variable so children can use it for bullets.
          */}
          <div
            style={
              {
                '--accent-color': isSemantic ? semantic.brandHex : 'var(--primary)',
              } as React.CSSProperties
            }
            className={`${isSemantic ? semantic.bodyText : 'text-on-surface-variant'}`}
          >
            {children}
          </div>
        </main>

        {footer && (
          <footer className="px-5 py-3 border-t border-outline-variant/10 bg-surface-container-lowest/20 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold opacity-70">
            {footer}
          </footer>
        )}
      </div>
    </motion.div>
  );
}

type PanelColor = SemanticColor | 'surface';
type HoverEffect = 'none' | 'pop' | 'lift' | 'glow' | 'shadow';
type SemanticColor = 'primary' | 'secondary' | 'error' | 'tertiary';
type Color = 'primary' | 'secondary' | 'error' | 'tertiary' | 'surface';

interface OmniPanelProps {
  children: React.ReactNode;
  color?: PanelColor;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  variant?: 'pop' | 'trace' | 'none';
  elevation?: 'low' | 'default' | 'high';
  isHoverable?: boolean;
  hoverEffect?: HoverEffect;
}

// https://prismic.io/blog/css-hover-effects

const SHADOWS = {
  dark: {
    low: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.5)',
    default: '0 4px 6px rgba(0,0,0,0.3), 0 10px 15px rgba(0,0,0,0.5)',
    high: '0 20px 25px rgba(0,0,0,0.4), 0 10px 10px rgba(0,0,0,0.5)',
  },
  light: {
    low: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
    default: '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.1)',
    high: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
  },
};

const getShadowMap = (isDark) => {
  const mode = isDark ? 'dark' : 'light';
  return SHADOWS[mode]; // Returns { low: "...", default: "...", high: "..." }
};

const getSurfaceMap = (isDark) => {
  // Define the base colors once to ensure 100% consistency
  const baseSurfaces = {
    low: isDark ? 'bg-surface-container-low' : 'bg-surface-container-low',
    default: isDark ? 'bg-surface-container' : 'bg-surface-container',
    high: isDark ? 'bg-surface-container-high' : 'bg-surface-container-high',
  };

  return {
    // Both 'none' and 'trace' now use the exact same background tokens
    none: baseSurfaces,
    trace: baseSurfaces,
    // 'pop' remains distinct if you want it to stand out immediately
    pop: {
      low: isDark ? 'bg-surface-container-high' : 'bg-surface-container-high',
      default: isDark ? 'bg-surface-container-highest' : 'bg-white',
      high: isDark ? 'bg-surface-bright' : 'bg-white',
    },
    ghost: {
      low: 'bg-transparent border-outline/20',
      default: 'bg-transparent border-outline/40',
      high: 'bg-transparent border-outline/60',
    },
    glass: {
      low: isDark ? 'bg-white/5 backdrop-blur-md' : 'bg-black/5 backdrop-blur-md',
      default: isDark ? 'bg-white/10 backdrop-blur-lg' : 'bg-black/10 backdrop-blur-lg',
      high: isDark ? 'bg-white/20 backdrop-blur-xl' : 'bg-black/20 backdrop-blur-xl',
    },
    inset: {
      low: isDark ? 'bg-black/20 shadow-inner' : 'bg-surface-container-highest/50 shadow-inner',
      default: isDark ? 'bg-black/40 shadow-inner' : 'bg-surface-container-highest shadow-inner',
      high: isDark ? 'bg-black/60 shadow-inner' : 'bg-surface-container-highest shadow-inner',
    },
  };
};

const getColorMap = (isDark: boolean) => ({
  primary: {
    container: isDark ? 'bg-primary-container/10' : 'bg-primary-container/30',
    header: isDark ? 'bg-primary/20' : 'bg-primary/10',
    brandText: 'text-primary',
    // Danger/Error is special, but Primary/Secondary/Tertiary should follow Surface rules
    bodyText: isDark ? 'text-on-surface' : 'text-on-surface',
    border: 'border-primary/20',
    brandHex: 'var(--primary)',
  },
  secondary: {
    container: isDark ? 'bg-secondary-container/10' : 'bg-secondary-container/30',
    header: isDark ? 'bg-secondary/20' : 'bg-secondary/10',
    brandText: 'text-secondary',
    bodyText: isDark ? 'text-on-surface' : 'text-on-surface',
    border: 'border-secondary/20',
    brandHex: 'var(--secondary)',
  },
  tertiary: {
    container: isDark ? 'bg-tertiary-container/10' : 'bg-tertiary-container/30',
    header: isDark ? 'bg-tertiary/20' : 'bg-tertiary/10',
    brandText: 'text-tertiary',
    bodyText: isDark ? 'text-on-surface' : 'text-on-surface',
    border: 'border-tertiary/20',
    brandHex: 'var(--tertiary)',
  },
  error: {
    container: isDark ? 'bg-error-container/20' : 'bg-error-container/40',
    header: isDark ? 'bg-error/25' : 'bg-error/15',
    brandText: 'text-error',
    bodyText: isDark ? 'text-on-error-container' : 'text-on-error-container',
    border: 'border-error/30',
    brandHex: 'var(--error)',
  },
});
