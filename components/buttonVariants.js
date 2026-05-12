export function buttonVariants({ active = false, tone = 'default', size = 'xs' } = {}) {
  const base = 'px-2 py-1 rounded transition-all font-medium border focus:outline-none'

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  }

  const variants = {
    primary: active
      ? `
        bg-[var(--primary)] text-[var(--on-primary)]
        border-[var(--primary)]
        shadow-sm
        ring-2 ring-[var(--primary-container)]
      `
      : `
        bg-[var(--surface)] text-[var(--on-surface)]
        border-[var(--outline-variant)]
        hover:bg-[var(--surface-variant)]
      `,

    difficulty: {
      active: `
        bg-[var(--success)] text-[var(--on-success)]
        border-[var(--success)]
        shadow-sm
        ring-2 ring-[var(--success-container)]
      `,
      inactive: `
        bg-[var(--surface)] text-[var(--on-surface)]
        border-[var(--outline-variant)]
        hover:bg-[var(--surface-variant)]
      `,
    },

    action: `
      bg-[var(--surface)] text-[var(--on-surface)]
      border-[var(--outline-variant)]
      hover:bg-[var(--surface-variant)]
    `,

    list: {
      active: `
        bg-[var(--primary)] text-[var(--on-primary)]
        border-[var(--primary)]
        shadow-sm
        ring-2 ring-[var(--primary-container)]
      `,
      inactive: `
        bg-[var(--surface)] text-[var(--on-surface)]
        border-[var(--outline-variant)]
        hover:bg-[var(--surface-variant)]
      `,
    },
  }

  const v =
    tone === 'difficulty'
      ? active
        ? variants.difficulty.active
        : variants.difficulty.inactive
      : tone === 'list'
        ? active
          ? variants.list.active
          : variants.list.inactive
        : variants[tone] || variants.primary

  return [base, sizes[size], v].join(' ')
}
