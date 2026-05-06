import { defineConfig } from 'tsup'

```
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  // This forcefully injects React into the scope of every bundled file
  banner: {
    js: "import React from 'react';",
  },
  // Keep this as a backup
  esbuildOptions(options) {
    options.jsx = 'automatic'
  }
})
```

## Server

$ npm run build && npm pack && mv primetimetran-docksystem-1.0.0.tgz prime-1.0.0.tgz
rm -rf dist .turbo node_modules/.cache

$ rm prime-1.0.0.tgz && npm run build && npm pack && mv primetimetran-docksystem-1.0.0.tgz prime-1.0.0.tgz

## Client

$ ls node_modules/@primetimetran/docksystem/dist
$ ni ../../../l.blog/packages/docksystem/prime-1.0.0.tgz
$ npm uninstall @primetimetran/docksystem && ni ../../../l.blog/packages/docksystem/prime-1.0.0.tgz
