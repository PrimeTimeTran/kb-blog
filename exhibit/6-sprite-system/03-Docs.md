# SVG Sprite Performance Optimization: Technical Reference

### Overview

This project utilizes an SVG Sprite system to aggregate icon assets. This implementation resolves Vercel deployment timeouts (caused by inode exhaustion from 1,500+ individual files) by consolidating them into a single, optimized XML resource.

### Performance Metrics

- **Deployment Time:** Reduced from 25m (failure) to < 1m (success).
- **Efficiency Gain:** ~1,250% faster deployment throughput.
- **File Count:** Reduced from 1,500+ individual files to 1 master sprite.

### Asset Pipeline: Two Architectural Approaches

We support two workflows for sprite management depending on project requirements:

#### 1. The Build-Time (Automated) Strategy

_Best for: Active projects where the icon set changes frequently._

- **Implementation:** The script `scripts/bundle-icons.ts` is triggered during the `prebuild` phase in `package.json`.
- **Workflow:**
  1. Place source SVGs in `/public/vscode-icons`.
  2. The build pipeline scans the directory, runs `svg-sprite`, and generates the sprite dynamically.
- **Note:** Requires an `fs.existsSync` check in the script to prevent `ENOENT` build errors if the source directory is empty or missing.

#### 2. The Once-Off (Static) Strategy

_Best for: Stable icon sets where performance and build simplicity are prioritized._

- **Implementation:** Run the bundling script manually on a local machine to generate `public/vscode-sprite.svg`.
- **Workflow:**
  1. Generate the sprite locally.
  2. Commit the `vscode-sprite.svg` to the repository.
  3. Remove the source `/vscode-icons` directory and delete the `prebuild` script entry.
- **Note:** This creates the most robust, dependency-free build pipeline by eliminating the need for `svg-sprite` during deployment.

### Component Implementation

Do not use `next/image` for these icons, as it is optimized for raster images. Use the native browser `<use>` element to reference the sprite ID directly:

```tsx
// Standard usage pattern for the Icon component
function TreeIcon({ name }: { name: string }) {
  // Strip extension to match the ID inside the sprite
  const iconId = name.replace('.svg', '');

  return (
    <svg width={16} height={16}>
      <use href={`/vscode-sprite.svg#${iconId}`} />
    </svg>
  );
}
```

### Maintenance & Troubleshooting

- **Missing Icons:** If an icon fails to render, verify that the `id` of the `<symbol>` inside `vscode-sprite.svg` matches your `href` string exactly.
- **Build Failures:** If using the **Automated** strategy, ensure the deployment agent has read access to the source folder. If using the **Once-Off** strategy, verify that the sprite file is not being ignored by `.gitignore`.
