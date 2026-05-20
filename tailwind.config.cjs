const { callOutTheme } = require('./lib/theme/theme.cjs')
const { safeList } = require('./lib/theme/tailwind-class-generators.cjs')

const flattenThemeClasses = (themeObj) => {
  return Object.values(themeObj).flatMap((group) => Object.values(group).flat())
}

// Solution for styles going missing in embedded TW V3 pages
const safelist = Array.from(new Set([...safeList, ...flattenThemeClasses(callOutTheme)]))

module.exports = {
  darkMode: 'class',

  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './data/blog/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],

  safelist,
  // Note: V3 Legacy Syntax:
  // Is overwritten in V4 by @theme directive
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
