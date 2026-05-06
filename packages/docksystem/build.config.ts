'use client'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  declaration: true,
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
  externals: ['react', 'react-dom', 'react/jsx-runtime'],
})
