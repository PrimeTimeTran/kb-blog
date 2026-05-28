# Technical Log: Resolving Deployment Stability and Asset Optimization

## Situation Analysis

Our project deployment on Vercel had become increasingly unreliable, consistently hanging at the "Deploying outputs..." phase. Initial investigation into the logs and build environment suggested that our application code was building correctly locally. However, the deployment pipeline was failing to finalize the transition from a successful build to a live production state.

Further file-system analysis revealed that the `public/vscode-icons` directory contained over 1,500 individual SVG files. While the total size was modest (~7.8MB), the sheer number of inodes—the file system objects used to track metadata for each file—was overwhelming the Vercel deployment agent’s ability to generate a deployment manifest and perform the atomic upload required to push the build to the edge.

---

## Technical Remediation

To resolve this, we shifted from a "collection of files" approach to a "bundled resource" architecture using an **SVG Sprite**. This strategy consolidates multiple vector assets into a single XML document, leveraging native browser capabilities to reference individual symbols.

### Implementation Steps

1. **Normalization of Assets:** We introduced a bundling step to aggregate the 1,500 individual SVG files into a single `vscode-sprite.svg`. This file defines each icon within a `<symbol>` block, preserving the vector data while significantly reducing file-system overhead.
2. **Refactoring the Rendering Component:** We deprecated the `next/image` component for icon rendering. Since `next/image` is intended for raster image optimization, it was inappropriate for an SVG sprite. We replaced it with a native SVG implementation using the `<use>` element.

- _Component logic:_ The component now takes the icon name, cleans the filename string, and performs an inline reference to the sprite's ID: `<use href="/vscode-sprite.svg#icon-name" />`.

3. **Pipeline Optimization:** We evaluated two paths for sprite generation:

- **Automated (Build-time):** Executing the bundler during the `prebuild` phase.
- **Static (Once-off):** Generating the sprite locally once, committing the result, and removing the source directory.

---

## Results and Conclusion

By opting for the **Static (Once-off)** strategy, we achieved three primary objectives:

- **Deployment Reliability:** By reducing the asset count by 1,499 files, we eliminated the bottleneck in the Vercel manifest generation process.
- **Performance Gains:** We reduced the network waterfall effect; the browser now requests one consolidated file rather than hundreds of individual assets.
- **Pipeline Stability:** By removing the `prebuild` dependency and the large source directory, we simplified our deployment environment, eliminating the risk of `ENOENT` errors caused by missing file paths during build-time execution.

This structural change has restored the integrity of our CI/CD pipeline, ensuring that deployments are predictable, lightweight, and performant.

---

# Optimizing Vercel Deployments: The SVG Sprite Pattern

We recently solved an issue where a Vercel deployment was hanging during the "Deploying outputs" phase. The root cause was an excessive number of small files (1,500+ icons) in the `public/` directory, which overwhelmed the deployment agent's ability to hash and manifest the assets.

---

## The Problem: File Count Overhead

Vercel needs to scan every file in your `public/` folder to generate a deployment manifest. When you have thousands of tiny SVG files, this process slows down significantly or times out, causing the build to hang.

### Before: Individual Files

- **Asset Load:** 1,500+ separate HTTP requests.
- **Build Time:** High overhead for Vercel to index files.
- **Maintenance:** Harder to manage individually.

---

## The Solution: SVG Sprite System

We moved from individual files to a **single SVG Sprite**. This bundles all icons into one file, reducing the file count by over 99%.

### Step 1: The Bundling Script

We created a Node.js script using `svg-sprite` that runs during your build process. It iterates through your icons and compiles them into a single `<svg>` document containing `<symbol>` definitions.

### Step 2: Component Refactor

We updated the `TreeIcon` component to use the native browser `<use>` element. Instead of `next/image`, which is optimized for raster images, we now reference the sprite ID directly.

```tsx
function TreeIcon(props: IconProps) {
  const iconName = props.resolve(props.name || '').replace('.svg', '');

  return (
    <svg width={16} height={16}>
      <use href={`/vscode-sprite.svg#${iconName}`} />
    </svg>
  );
}
```

```sh
$ pnpm --filter @primetimetran/blog -D add svg-sprite
```

```jsx
function TreeIcon(props: IconProps) {
  // Assuming resolve returns just the filename, e.g., "file.svg"
  // We need to strip the extension to match the ID in the sprite
  const iconName = props.resolve(props.name || '').replace('.svg', '');

  return (
    <svg width={16} height={16} style={{ display: 'inline-block' }}>
      <use href={`/vscode-sprite.svg#${iconName}`} />
    </svg>
  );
}
```

### Path 1: The Build-Time "Automation" Strategy

In this approach, you treat your icons as **source code**. Your `public/vscode-icons` folder stays in your repository, and the sprite is generated automatically every time you deploy.

- **How it works:** You include the `bundle-icons.mjs` script in your `prebuild` step in `package.json`. Every time Vercel builds your site, it looks at your folder, runs the script, and creates a fresh `vscode-sprite.svg`.
- **Best for:** Projects where you add, remove, or update icons frequently.
- **Pros:**
- You only need to manage the source SVGs.
- The "source of truth" is the icon folder.

- **Cons:**
- Requires the `svg-sprite` dependency in your project.
- Adds a tiny amount of time to the build step (though usually negligible).

- **The Vercel Fix:** You must ensure your build script checks if the directory exists (as we discussed with the `ENOENT` error) so the build doesn't crash if the folder structure changes.

---

### Path 2: The "Once-Off" (Static Asset) Strategy

In this approach, you treat your icons as **static assets**. You run the script _once_ on your local machine to generate the sprite file, then commit that single file to your repository and delete the source folder.

- **How it works:** You run the script locally. You get `vscode-sprite.svg`. You put this file in your `public/` directory, commit it to Git, and remove the 1,500 individual files from your repository entirely.
- **Best for:** Projects where the icon set is "stable" (you don't change your VS Code icons every week).
- **Pros:**
- **Maximum Performance:** No build-time script to run; the sprite is just another static file like a `.png` or `.css` file.
- **Zero Dependencies:** You can uninstall `svg-sprite` after you run the script once.
- **Simplest Build:** No risk of build-time `ENOENT` errors or build-environment pathing issues.

- **Cons:**
- If you need to add a new icon, you have to remember to re-run the script manually and update the sprite file in your repo.

---

### Comparison Summary

| Feature             | Path 1: Build-Time (Automated)         | Path 2: Once-Off (Static)           |
| ------------------- | -------------------------------------- | ----------------------------------- |
| **Workflow**        | Always keep source SVGs in repo        | Run once, delete source SVGs        |
| **Build Stability** | Requires logic to handle missing paths | Extremely stable (it's just a file) |
| **Maintenance**     | Auto-updates when you add icons        | Manual update required              |
| **Dependency**      | Needs `svg-sprite` in `package.json`   | None (delete after running)         |

**My Recommendation:**
If you are currently struggling with Vercel deployment hangs and want the **most robust, "it-just-works" solution**, go with **Path 2 (Once-Off)**.

1. Run the script locally to generate the sprite.
2. Commit `public/vscode-sprite.svg` to your repo.
3. `rm -rf public/vscode-icons`.
4. Remove the `node scripts/bundle-icons.mjs` command from your `package.json`.

This eliminates the `ENOENT` build error entirely because there is no script running during the build—it's just a simple file upload.

Does that help you decide which path fits your current development style better?
