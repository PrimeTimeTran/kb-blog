import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';

export default [
  // =========================================================
  // 1. GLOBAL IGNORES (always first)
  // =========================================================
  {
    ignores: [
      '**/.next',
      '**/node_modules',
      '**/dist',
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'coverage/**',
      '**/*.mdx.js',
      'public/**',
    ],
  },

  // =========================================================
  // 2. BASE LANGUAGE LAYER (JS + TS + NEXT)
  // =========================================================
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next.configs.recommended,

  // IMPORTANT GLOBAL FIX (TS + Next already handle undefined checks)
  {
    rules: {
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.cjs', '**/*.js', 'scripts/**/*', '**/*.ts', '**/*.tsx'],

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          ignoreUsingDeclarations: false,
          reportUsedIgnorePattern: false,
        },
      ],
    },
  },

  // =========================================================
  // 3. APP LAYER (React / Next UI CODE)
  // =========================================================
  {
    files: [
      'pages/**/*.{js,jsx,ts,tsx}',
      'components/**/*.{js,jsx,ts,tsx}',
      'app/**/*.{js,jsx,ts,tsx}',
      'lib/**/*.{js,jsx,ts,tsx}',
    ],

    settings: {
      react: {
        version: 'detect',
      },
    },

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
    },

    rules: {
      // hooks (keep)
      ...reactHooks.configs.recommended.rules,

      // React 17+ JSX runtime fixes
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // general React noise reduction
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'warn',

      // TS ergonomics
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },

  // =========================================================
  // 4. SERVER / NODE CONTEXT (scripts, APIs, server code)
  // =========================================================
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

  // =========================================================
  // 5. SPECIAL CASE FILES (mixed-runtime / tooling / scratch)
  // =========================================================
  {
    files: ['scratchpads/**/*', 'data/**/*', 'next.config.js', 'pages/_app.js'],

    languageOptions: {
      globals: {
        URL: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        process: 'readonly',
      },
    },

    rules: {
      'no-undef': 'off',
    },
  },
];
