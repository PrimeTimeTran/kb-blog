import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: false,
  format: ['esm', 'cjs'],
  external: ['react'],
  clean: true,
})
