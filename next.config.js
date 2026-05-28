import createMDX from '@next/mdx';

// import path from 'path'
// import { fileURLToPath } from 'url'
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// ----------------------------------------------
// RUNTIME GRAPH: Source vs Dist Resolution Rules
// - “Where does @primetimetran/beeline point before bundling even starts?”
// ----------------------------------------------

// | Mode | Meaning        |                                       |
// | ---- | -------------- | ------------------------------------- |
// | dev  | src graph      | src live system (engineering truth)   |
// | dist | compiled graph | dist packaged system (consumer truth) |

// Case 1: - DEV (source graph)
// BEELINE_MODE=dev pnpm --filter loi-tran-blog dev

// Means:
// - Next resolves `@primetimetran/beeline → src/`
// - package is NOT built
// - everything is live source

// Behavior:
// - fastest iteration loop
// - full HMR across app + package
// - changes reflect immediately
// - not representative of npm install output

// ---

// Case 2: - DIST (packaged graph)
// pnpm --filter @primetimetran/beeline build && BEELINE_MODE=dist pnpm --filter loi-tran-blog dev

// Means:
// - Next resolves `@primetimetran/beeline → dist/`
// - app uses compiled package output
// - still running in Next dev runtime (HMR still exists)

// Behavior:
// - simulates “installed package behavior”
// - validates build output correctness
// - no TypeScript/source-level coupling
// - changes require rebuild of package to reflect
// const MODE = process.env.BEELINE_MODE ?? 'dev'

// const resolveBeelinePath = () => {
//   switch (MODE) {
//     case 'dev':
//       return path.resolve(__dirname, '../../pkg/beeline/src')

//     case 'dist':
//       return path.resolve(__dirname, '../../pkg/beeline/dist')

//     default:
//       return path.resolve(__dirname, '../../pkg/beeline/src')
//   }
// }

// ----------------------------------------------
// RELEASE SIMULATION (package distribution truth)
// ----------------------------------------------
//
// Purpose:
// This block is NOT about development speed or HMR.
// It is about simulating what a real consumer gets after install.
//
// In other words:
// - dev/dist modes answer: "does my code work while I build it?"
// - release simulation answers: "does my code work after I ship it?"
//
// ----------------------------------------------
//
// Core idea:
// You are no longer testing code execution.
// You are testing *artifact consumption*.
//
// That means:
// - no src/
// - no aliases to local folders
// - no workspace symlinks or TS path alias resolution
// - only what would exist after `npm install`

// ----------------------------------------------
// SIMULATION FLOW
// ----------------------------------------------

// 1. Build package
//    pnpm --filter @primetimetran/beeline build

// 2. Pack it as if published
//    pnpm --filter @primetimetran/beeline pack

// 3. Install it like a consumer would
//    pnpm add ./primetimetran-beeline-1.0.1.tgz

// OR simulate versioned install:
//    "@primetimetran/beeline": "1.0.1"

// ----------------------------------------------
// WHAT THIS VALIDATES
// ----------------------------------------------

// ✔ correct "exports" field resolution
// ✔ dist/ is complete (no missing files)
// ✔ types resolve correctly from published entrypoints
// ✔ no reliance on TS path aliases (@core, workspace tricks)
// ✔ no accidental src imports leaking into bundle
// ✔ consumer import surface is stable

// ----------------------------------------------
// WHAT BREAKS HERE (AND IS GOOD)
// ----------------------------------------------

// ✖ importing from src/
// ✖ relying on monorepo symlinks
// ✖ unresolved internal dev-only utilities
// ✖ build artifacts missing from dist/
// ✖ incorrect package.json exports mapping

// If something breaks here, it is NOT a runtime bug.
// It is a packaging contract violation.

// ----------------------------------------------
// NEXT.JS CONFIG NOTE (IMPORTANT)
// ----------------------------------------------

// In this mode, Next must behave like a consumer app.

// That means:
// - resolveBeelinePath MUST point to dist OR installed package
// - no aliasing to src/
// - no workspace fallback

// You are testing:
// "does this work after npm install?"

// NOT:
// "does this work in my monorepo?"

// ----------------------------------------------
// WHEN TO RUN THIS MODE
// ----------------------------------------------

// Use this ONLY after:
// - feature is stable in dev
// - API surface is mostly locked
// - package build succeeds without warnings
// - you are preparing release notes or version bump

// ----------------------------------------------
// WHY THIS EXISTS
// ----------------------------------------------

// Because dev mode lies in 3 ways:
// - 1. It resolves files that won't exist in production
// - 2. It hides packaging mistakes behind HMR
// - 3. It allows accidental coupling to workspace structure

// ----------------------------------------------
// STEPS:
// ----------------------------------------------
// pnpm --filter @primetimetran/beeline build
// pnpm --filter @primetimetran/beeline pack
// pnpm add ./primetimetran-beeline-1.0.1.tgz

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  experimental: {
    turbo: undefined,
    esmExternals: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: false,
  reactStrictMode: true,
  // Note: Fixes vercel deploy --prebuilt
  // output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
};

// Note:
// ./mdx-components.tsx strategy worked while this one didn't.
// https://nextjs.org/docs/pages/guides/mdx
const withMdx = createMDX({
  options: {},
  extension: /\.(md|mdx)$/,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
});
export default withMdx(nextConfig);
