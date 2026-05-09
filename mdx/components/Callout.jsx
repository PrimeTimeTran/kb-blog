'use client'
import React, { useState } from 'react'
import { CgDanger } from 'react-icons/cg'
import { AiOutlineBug } from 'react-icons/ai'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'

import { callOutTheme } from '../../lib/theme/theme.cjs'

// 💡 Reference: Icons
// https://react-icons.github.io/react-icons/icons/ai/
import {
  FiCode,
  FiInfo,
  FiXCircle,
  FiBookOpen,
  FiFileText,
  FiHelpCircle,
  FiCheckCircle,
  FiAlertTriangle,
  FiMessageSquare,
} from 'react-icons/fi'

const calloutIcons = {
  info: FiInfo,
  note: FiFileText,
  danger: CgDanger,
  bug: AiOutlineBug,
  success: FiCheckCircle,
  quote: FiMessageSquare,
  warning: FiAlertTriangle,
  tip: MdOutlineTipsAndUpdates,

  error: FiXCircle,
  failure: FiXCircle,
  question: FiHelpCircle,

  example: FiCode,
  abstract: FiBookOpen,
}

export function CallOut({
  type = 'note',
  title,
  collapsible,
  collapsed: initialCollapsed,
  children,
  hasEmbed,
}) {
  const [open, setOpen] = useState(!initialCollapsed)

  const Icon = calloutIcons[type]
  const theme = callOutTheme[type] ?? callOutTheme.note
  function handleContentClick(e) {
    const target = e.target

    // ignore interactive elements
    const interactive = target.closest('a, button, input, textarea, select, [data-no-close]')

    if (interactive) return

    if (collapsible) {
      setOpen(false)
    }
  }

  return (
    <div className={`w-full my-2 rounded-lg border-l-4 ${theme.border} ${theme.bg}`}>
      <div
        className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-2 hover:bg-black/5 dark:hover:bg-white/5"
        onClick={() => collapsible && setOpen((v) => !v)}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          {Icon && <Icon className="h-4 w-4 opacity-80" />}
          <span className={theme.text}>{title || type}</span>
        </div>

        {collapsible && (
          <span
            className={`text-lg transition-transform duration-200 ${open ? 'rotate-0' : '-rotate-90'
              }`}
          >
            ▾
          </span>
        )}
      </div>

      {/* Animated container */}
      <div
        onClick={handleContentClick}
        className={`
        border-t border-slate-200 dark:border-slate-800 text-sm leading-relaxed
        overflow-hidden transition-all duration-300 ease-in-out
        ${open ? 'max-h-[600px] opacity-100 p-2' : 'max-h-0 opacity-0 p-0 pointer-events-none'}
      `}
      >
        {children}
      </div>
    </div>
  )
}
