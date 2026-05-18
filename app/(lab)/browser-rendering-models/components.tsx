'use client'
import React from 'react'

type ListProps = {
  items: string[]
  variant?: 'question' | 'statement' | 'explanation'
  className?: string
}
export function List({ items, variant = 'statement', className = '' }: ListProps) {
  return (
    <ul className={`mt-6 max-w-2xl space-y-3 pl-6 text-left text-lg list-disc ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={
            variant === 'question'
              ? 'text-yellow-200'
              : variant === 'explanation'
                ? 'text-white/90 leading-relaxed'
                : 'text-white/70'
          }
        >
          {variant === 'question' ? `? ${item}` : item}
        </li>
      ))}
    </ul>
  )
}

export function ContextLabel({ children }: React.PropsWithChildren) {
  return <h3 className="fixed text-3xl">{children}</h3>
}
