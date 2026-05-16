// components/brand/DynamicLogo.tsx
'use client'
import chroma from 'chroma-js'

import { useThemeStore } from '@/hooks/useThemeStore'

export function DynamicLogo({ className = 'h-6 w-6' }: { className?: string }) {
  const seed = useThemeStore((state) => state.seed)

  const color = chroma(seed)
  const textColor = color.luminance() > 0.5 ? '#000000' : '#FFFFFF'

  return (
    <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill={seed} />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".35em"
        fill={textColor}
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="16"
      >
        LT
      </text>
    </svg>
  )
}
