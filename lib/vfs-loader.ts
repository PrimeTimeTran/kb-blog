// lib/vfs-loader.ts
export type VirtualFS = Record<string, { content: string; language: string }>;

export function loadExhibitSlots(): VirtualFS {
  const vfs: VirtualFS = {};

  try {
    // require.context(directory, useSubdirectories, regExp)
    // This tells Webpack/Next.js to scrape the files at build time
    const context = require.context('../exhibit', true, /\.(tsx|ts|jsx|js|css|html)$/);

    context.keys().forEach((key) => {
      // key looks like: "./page.tsx" or "./components/button.tsx"
      // Convert it to your expected canonical VFS path format
      const canonicalPath = `./exhibit/${key.replace('./', '')}`;

      // Fetch the raw text content of the file
      const content = context(key).default || context(key);

      // Deduce the language syntax format based on the extension
      const ext = key.split('.').pop() ?? 'js';
      const language = ext === 'tsx' || ext === 'jsx' ? 'jsx' : ext;

      vfs[canonicalPath] = {
        content: typeof content === 'string' ? content : '',
        language,
      };
    });
  } catch (error) {
    console.error('Failed to pre-compile local Exhibit Slots VFS directory:', error);
  }

  return vfs;
}
