import React from 'react'
import { RichTooltip } from '@/components/ToolTipRich'

interface StyledButtonProps {
  onClick: () => void
  isActive: boolean
  text?: string
  count?: number | string // Support for the (n) count
  tone?: 'success' | 'warning' | 'error' | 'default'
  icon?: React.ReactNode
  tooltipTitle?: string
  tooltipDescription?: string
  tooltipActions?: Array<{ label: string; icon: string; onClick: () => void }>
  onTooltipAction?: () => void
  className?: string
}

export function StyledButton({
  onClick,
  text,
  count,
  isActive,
  tone = 'default',
  icon,
  className = '',
  // Tooltip Props
  tooltipTitle,
  tooltipDescription,
  tooltipActions,
  onTooltipAction,
  ...props
}: StyledButtonProps) {
  const themeMap = {
    success: {
      color: 'var(--success)',
      container: 'var(--success-container)',
      on: 'var(--on-success-container)',
    },
    warning: {
      color: 'var(--warning)',
      container: 'var(--warning-container)',
      on: 'var(--on-warning-container)',
    },
    error: {
      color: 'var(--error)',
      container: 'var(--error-container)',
      on: 'var(--on-error-container)',
    },
    default: {
      color: 'var(--primary)',
      container: 'var(--primary-container)',
      on: 'var(--on-primary-container)',
    },
  }

  const theme = themeMap[tone] || themeMap.default

  // Define the Button JSX as a constant to keep the return clean
  const ButtonContent = (
    <button
      type="button"
      onClick={onClick}
      style={
        {
          backgroundColor: isActive ? theme.container : 'transparent',
          color: isActive ? theme.on : `color-mix(in srgb, ${theme.color}, transparent 30%)`,
          borderColor: isActive
            ? 'transparent'
            : `color-mix(in srgb, ${theme.color}, transparent 70%)`,
        } as React.CSSProperties
      }
      className={`
        flex items-center justify-center gap-2 
        px-4 py-2 text-[10px] font-black uppercase tracking-widest
        rounded-xl border transition-all duration-300 
        hover:scale-105 active:scale-95
        ${isActive ? 'shadow-lg shadow-black/5' : 'hover:bg-surface-container-low'}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="text-sm shrink-0">{icon}</span>}
      <span className="whitespace-nowrap">{text}</span>

      {count !== undefined && (
        <span className="ml-1 px-1.5 py-0.5 rounded-full text-[8px] font-black bg-current/10 border border-current/10">
          {count}
        </span>
      )}
    </button>
  )

  // Return with Tooltip wrap if data exists
  if (tooltipTitle || tooltipDescription) {
    return (
      <RichTooltip
        title={tooltipTitle || (typeof text === 'string' ? text : '')}
        description={tooltipDescription}
        actions={tooltipActions}
        onAction={onTooltipAction}
      >
        {ButtonContent}
      </RichTooltip>
    )
  }

  return ButtonContent
}
