// components/brand/DynamicLogo.tsx
'use client';
import chroma from 'chroma-js';

import { useThemeStore } from '@/hooks/useThemeStore';

export function DynamicLogo({ className = 'h-6 w-6' }: { className?: string }) {
  const seed = useThemeStore((state) => state.seed);

  const color = chroma(seed);
  const textColor = color.luminance() > 0.5 ? '#000000' : '#FFFFFF';

  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="auroraGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa">
            <animate
              attributeName="stop-color"
              values="#60a5fa;#a78bfa;#f472b6;#60a5fa"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>

          <stop offset="50%" stopColor="#a78bfa">
            <animate
              attributeName="stop-color"
              values="#a78bfa;#f472b6;#60a5fa;#a78bfa"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>

          <stop offset="100%" stopColor="#f472b6">
            <animate
              attributeName="stop-color"
              values="#f472b6;#60a5fa;#a78bfa;#f472b6"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      {/* background */}
      <rect width="32" height="32" rx="6" fill="url(#auroraGradient)" />

      {/* optional soft glow layer */}
      <rect width="32" height="32" rx="6" fill="url(#auroraGradient)" opacity="0.4" />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".35em"
        fill="white"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="16"
      >
        LT
      </text>
    </svg>
  );
}
