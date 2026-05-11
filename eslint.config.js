import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import next from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default [
  ...tseslint.configs.recommended,
  js.configs.recommended,
  next.configs.recommended,

  // -------------------------
  // APP (browser / react / next)
  // -------------------------
  {
    files: ['pages/**/*', 'components/**/*', 'app/**/*', 'lib/**/*', '**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
    },

    rules: {
      ...prettier.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },

  // -------------------------
  // SERVER / SCRIPTS (node)
  // -------------------------
  {
    files: ['scripts/**/*', 'lib/content/server/**/*', 'pages/api/**/*'],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      'no-undef': 'off',
    },
  },

  {
    files: ['scratchpads/**/*', 'data/**/*', 'next.config.js', 'pages/_app.js'],

    languageOptions: {
      globals: {
        console: true,
        setTimeout: true,
        fetch: true,
        URL: true,
        document: true, // if browser-like scripts
      },
    },

    rules: {
      'no-undef': 'off',
    },
  },

  // -------------------------
  // IGNORE GENERATED / BUILD / MDX OUTPUT
  // -------------------------
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**', 'coverage/**', '**/*.mdx.js'],
  },
]
