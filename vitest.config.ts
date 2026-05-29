import { defineConfig } from 'vitest/config';
import path from 'node:path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      {
        find: /^next\/navigation$/,
        replacement: path.resolve(__dirname, './test/mocks/next-navigation.ts'),
      },

      {
        find: '@',
        replacement: path.resolve(__dirname, './'),
      },
    ],
  },

  test: {
    environment: 'jsdom',

    setupFiles: ['./test/vitest.setup.tsx'],

    server: {
      deps: {
        inline: ['@teispace/next-themes'],
      },
    },
  },
});
