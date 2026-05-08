const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const { callOutTheme } = require('./lib/theme/theme.cjs')
const { safeList } = require('./lib/theme/tailwind-class-generators.cjs')

const flatten = (obj) => Object.values(obj).flatMap((v) => Object.values(v).flat())

// Solution for styles going missing in embedded TW V3 pages
const safelist = [...safeList, ...flatten(callOutTheme)]

module.exports = {
  darkMode: 'class',

  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './layouts/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
    './data/**/*.{mdx,md}',
    './packages/**/*.{js,ts,jsx,tsx}',
  ],

  safelist,

  theme: {
    extend: {
      spacing: {
        '9/16': '56.25%',
      },

      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },

      fontFamily: {
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        text: {
          DEFAULT: colors.neutral[700],
          muted: colors.neutral[500],
        },
        link: {
          DEFAULT: colors.blue[600],
          hover: colors.blue[700],
        },
        meta: {
          DEFAULT: colors.neutral[500],
          hover: colors.neutral[700],
        },
        primary: colors.blue,
        // semantic surface system
        background: colors.neutral[50],
        surface: colors.neutral[100],
        elevated: colors.neutral[200],
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.700'),

            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },

            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.neutral.900'),
            },

            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.neutral.900'),
            },

            h3: {
              fontWeight: '600',
              color: theme('colors.neutral.900'),
            },

            'h4,h5,h6': {
              color: theme('colors.neutral.900'),
            },

            pre: {
              backgroundColor: theme('colors.neutral.900'),
            },

            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.neutral.100'),
              borderRadius: '0.25rem',
              padding: '2px 4px',
            },

            'code::before': {
              content: 'none',
            },

            'code::after': {
              content: 'none',
            },

            hr: {
              borderColor: theme('colors.neutral.200'),
            },

            strong: {
              color: theme('colors.neutral.900'),
            },

            blockquote: {
              color: theme('colors.neutral.700'),
              borderLeftColor: theme('colors.neutral.300'),
            },
          },
        },

        dark: {
          css: {
            color: theme('colors.neutral.200'),

            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },

            h1: {
              color: theme('colors.neutral.100'),
              fontWeight: '700',
            },

            h2: {
              color: theme('colors.neutral.100'),
              fontWeight: '700',
            },

            h3: {
              color: theme('colors.neutral.100'),
              fontWeight: '600',
            },

            'h4,h5,h6': {
              color: theme('colors.neutral.100'),
            },

            pre: {
              backgroundColor: theme('colors.neutral.900'),
            },

            code: {
              backgroundColor: theme('colors.neutral.800'),
            },

            hr: {
              borderColor: theme('colors.neutral.700'),
            },

            strong: {
              color: theme('colors.neutral.100'),
            },

            blockquote: {
              color: theme('colors.neutral.300'),
              borderLeftColor: theme('colors.neutral.700'),
            },
          },
        },
      }),
    },
  },

  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
