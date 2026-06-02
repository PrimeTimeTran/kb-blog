'use client';

import {
  EntrySource,
  ExhibitManifest,
  ResolvedEntry,
  TreeNode,
  VirtualFileSystem,
  VirtualFileSystemAPI,
} from '@/lib/types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { createTrace } from '@/lib/trace';
import { normalizePath } from '@/lib/fs/normalize-path';

export function useVFS({
  manifest,
  iframeRef,
}: {
  manifest: ExhibitManifest;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
}): VirtualFileSystemAPI {
  // -------------------------------------------------------------------------
  // INIT
  // -------------------------------------------------------------------------
  const trace = createTrace('exhibit:client:useVFS');
  trace.mark('INIT', {
    slug: manifest.slug,
    seedEntry: manifest.seeds?.entry,
    projectType: manifest.projectType,
    runtimeEntry: manifest.runtime?.entry,
  });

  const { slug, files: initialFiles, entries, runtime, seeds } = manifest;
  const [files, setFiles] = useState<VirtualFileSystem>(initialFiles);

  const getCanonicalPath = (path: string) => (path.startsWith('./') ? path : `./${path}`);

  const getShellContent = () => {
    if (!seeds?.entry || !seeds?.files) return null;
    const shellFile = seeds.files.find((f: { path: string }) => f.path === seeds.entry);
    return shellFile?.content || null;
  };

  const getEntryPath = () => {
    return 'page.tsx';
  };

  // -------------------------------------------------------------------------
  // ENTRY RESOLUTION
  // -------------------------------------------------------------------------
  const resolved = useMemo(() => {
    const result = resolveInitialEntry({
      runtimeEntry: runtime?.entry,
      seedEntry: seeds?.entry,
      entries,
      files: initialFiles,
    });

    trace.mark('ENTRY_RESOLVED', {
      path: result.path,
      source: result.source,
    });

    return result;
  }, [runtime?.entry, seeds?.entry, entries, initialFiles]);

  const [activePath, setActivePathState] = useState<string | null>(getEntryPath() || resolved.path);
  const [entrySource] = useState<EntrySource>(() => {
    trace.mark('ENTRY_SOURCE_LOCKED', {
      source: resolved.source,
    });

    return resolved.source;
  });

  // -------------------------------------------------------------------------
  // RESET ON PROJECT CHANGE
  // -------------------------------------------------------------------------
  useEffect(() => {
    trace.mark('PROJECT_RESET', {
      slug,
      fileCount: Object.keys(initialFiles).length,
      resolvedActivePath: resolved.path,
    });

    setFiles(initialFiles);
    setActivePathState(resolved.path);
  }, [slug, initialFiles, resolved.path]);

  const updateActiveFileContent = (newContent: string) => {
    if (!activePath) return;

    trace.mark('FILE_UPDATE', {
      activePath,
      size: newContent.length,
    });

    setFiles((prev) => ({
      ...prev,
      [activePath]: {
        ...prev[activePath],
        content: newContent,
      },
    }));
  };

  // -------------------------------------------------------------------------
  // FILE SWITCH
  // -------------------------------------------------------------------------
  const handleFileSelect = (node: TreeNode) => {
    const resolvedPath = normalizePath(node.path);
    if (!files[resolvedPath]) {
      console.warn('File not found', {
        node,
        resolvedPath,
      });
      return;
    }

    setActivePathState(resolvedPath);
  };

  const activeFile = useMemo(() => {
    const file = activePath ? files[activePath] || null : null;

    if (!file && activePath) {
      trace.mark('ACTIVE_FILE_MISSING', {
        activePath,
        available: Object.keys(files),
      });
    }

    return file;
  }, [activePath, files]);

  const syncFullProject = () => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'vfs:update',
        payload: {
          files: files,
          entryPoint: getEntryPath(),
        },
      },
      '*',
    );
  };

  const syncFilePatch = (path: string, content: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'vfs:sync',
        payload: { path, content },
      },
      '*',
    );
  };

  const createSnapshot = useCallback(() => {
    return {
      files,
      entry: getEntryPath(),
    };
  }, [files]);

  return {
    createSnapshot,
    files,
    activePath,
    activeFile,
    entrySource,
    handleFileSelect,
    updateActiveFileContent,
    syncFullProject,
    syncFilePatch,
    getShellContent,
    getEntryPath,
    setActivePath: (p: string) => {
      const resolved = getCanonicalPath(p);
      trace.mark('SET_ACTIVE_PATH_DIRECT', {
        to: resolved,
      });

      setActivePathState(resolved);
    },
  };
}
function resolveInitialEntry({
  runtimeEntry,
  seedEntry,
  entries,
  files,
}: {
  runtimeEntry?: string | null;
  seedEntry?: string | null;
  entries: string[];
  files: VirtualFileSystem;
}): ResolvedEntry {
  const normalize = (p?: string | null) => (p ? (p.startsWith('./') ? p : `./${p}`) : null);

  const exists = (p?: string | null) => {
    const np = normalize(p);
    return !!np && !!files[np];
  };

  // 1. runtime (strongest)
  if (exists(runtimeEntry)) {
    return { path: runtimeEntry!, source: 'runtime' };
  }

  // 2. seed (framework default)
  if (exists(seedEntry)) {
    return { path: seedEntry!, source: 'seed' };
  }

  // 3. framework conventions
  const convention =
    entries.find((p) => /page\.(tsx|ts|jsx|js)$/.test(p)) ||
    entries.find((p) => /app\.(tsx|ts|jsx|js)$/.test(p)) ||
    entries.find((p) => /main\.(tsx|ts|jsx|js)$/.test(p)) ||
    entries.find((p) => /index\.(tsx|ts|jsx|js|html)$/.test(p));

  if (convention && files[convention]) {
    return { path: convention, source: 'convention' };
  }

  // 4. deterministic heuristic fallback
  const fallback =
    entries.filter((p) => /\.(html|tsx|ts|jsx|js)$/.test(p)).sort((a, b) => a.localeCompare(b))[0] ?? null;
  return { path: fallback, source: 'heuristic' };
}
