// lib/ui/buttonVariants.js

export function buttonVariants({ active = false, tone = 'default', size = 'xs' } = {}) {
  const base = 'px-2 py-1 text-xs rounded transition-all font-medium border'

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  }

  const variants = {
    // primary nav / sort active
    primary: active
      ? `
    bg-primary-600 text-white
    border-primary-600
    shadow-sm
    ring-2 ring-primary-200
    dark:bg-primary-500 dark:ring-primary-400
  `
      : `
    bg-white text-gray-700
    border-gray-200
    hover:bg-gray-100
    dark:bg-gray-800 dark:text-gray-300
    dark:border-gray-700 dark:hover:bg-gray-700
  `,

    // difficulty buttons
    difficulty: {
      active: `
    bg-green-600 text-white
    border-green-600
    shadow-sm
    ring-2 ring-green-300
    dark:bg-green-500 dark:ring-green-400
  `,
      inactive: `
    bg-white text-gray-700
    border-gray-200
    hover:bg-gray-100
    dark:bg-gray-800 dark:text-gray-300
    dark:border-gray-700 dark:hover:bg-gray-700
  `,
    },

    action:
      'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700',
    list: {
      active: `
    bg-primary-600 text-white
    border-primary-600
    shadow-sm
    ring-2 ring-primary-200
    dark:bg-primary-500 dark:border-primary-500 dark:ring-primary-400
  `,
      inactive: `
    bg-white text-gray-700
    border border-gray-200
    hover:bg-gray-100
    dark:bg-gray-800 dark:text-gray-300
    dark:border-gray-700 dark:hover:bg-gray-700
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

  const resolved = v

  return [base, sizes[size], resolved].join(' ')
}
