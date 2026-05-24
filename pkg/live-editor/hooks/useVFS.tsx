// hooks/useVFS.ts
import { useState, useEffect, useMemo } from 'react';

export type VirtualFS = Record<string, { content: string; language: string }>;

export function useVFS({
  entryPoint,
  slug,
  initialFiles,
}: {
  entryPoint: string;
  slug: string;
  initialFiles: VirtualFS;
}) {
  const [files, setFiles] = useState<VirtualFS>(initialFiles);

  // 1. Normalize the entry path format to match the keys in 'initialFiles'
  // We assume initialFiles keys are always consistent (e.g., all have or don't have './')
  const getCanonicalPath = (path: string) => {
    const clean = path.replace(/^\.\//, ''); // Strip existing './'
    return `./${clean}`; // Force it to have './'
  };

  const [activePath, setActivePath] = useState<string>(getCanonicalPath(`${slug}/page.tsx`));

  useEffect(() => {
    setFiles(initialFiles);
    setActivePath(getCanonicalPath(`${slug}/page.tsx`));
  }, [slug, initialFiles]);

  const updateActiveFileContent = (newContent: string) => {
    setFiles((prev) => ({
      ...prev,
      [activePath]: {
        ...(prev[activePath] || {}),
        content: newContent,
      },
    }));
  };

  const handleFileSelect = (path: string) => {
    // Ensure the path passed from the sidebar is normalized
    setActivePath(getCanonicalPath(path));
  };

  const activeFile = useMemo(() => {
    return files[activePath] || null;
  }, [files, activePath]);

  useEffect(() => {
    if (!activeFile) {
      console.warn(`[VFS] Active file not found: ${activePath}. Available:`, Object.keys(files));
    }
  }, [activeFile, activePath, files]);

  return {
    files,
    activePath,
    activeFile,
    handleFileSelect,
    updateActiveFileContent,
    setActivePath: (path: string) => setActivePath(getCanonicalPath(path)),
  };
}
