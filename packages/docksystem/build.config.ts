import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  declaration: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    esbuild: {
      jsx: 'automatic',
    },
    // 💡 FIX: This forces 'use client' to stay at the very top of the compiled bundles
    output: {
      banner: "'use client';",
    },
  },
  externals: ['react', 'react-dom', 'react/jsx-runtime', 'next', 'next/navigation'],
})
