'use client'

import React from 'react'
import { ReactNode } from 'react'
import { useLayout } from '../../providers/LayoutProvider'
import { useResize } from '../../hooks/useResize'

function Resizer({ onMouseDown }) {
  return (
    <div onMouseDown={onMouseDown} className="w-2 cursor-col-resize relative group">
      <div className="absolute inset-y-0 left-1/2 w-px bg-transparent group-hover:bg-zinc-300 group-active:bg-zinc-400" />
    </div>
  )
}

type ResizableColumnProps = {
  side: 'left' | 'right'
  children: ReactNode
}

export function ResizableColumn({ side, children }: ResizableColumnProps) {
  const { layout } = useLayout()
  const resize = useResize(side)
  const isLeft = side === 'left'

  return (
    <div
      className={`
        flex h-full shrink-0
        ${isLeft ? ' overflow-hidden left-sidebar' : 'right-sidebar'}
      `}
      style={{
        width: layout[side],
        flexShrink: 0,
      }}
    >
      {!isLeft && <Resizer onMouseDown={resize} />}

      <div className="flex-1 min-w-0 h-full overflow-hidden">{children}</div>

      {isLeft && <Resizer onMouseDown={resize} />}
    </div>
  )
}
