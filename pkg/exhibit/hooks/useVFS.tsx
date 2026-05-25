'use client';
import { useEffect, useMemo, useState } from 'react';
import { VirtualFS } from '@/pkg/exhibit/types';
import { createTrace } from '@/lib/trace';

type EntrySource = 'runtime' | 'seed' | 'convention' | 'heuristic';

type ResolvedEntry = {
  path: string | null;
  source: EntrySource;
};

function resolveInitialEntry({
  runtimeEntry,
  seedEntry,
  entries,
  files,
}: {
  runtimeEntry?: string | null;
  seedEntry?: string | null;
  entries: string[];
  files: VirtualFS;
}): ResolvedEntry {
  const exists = (p?: string | null) => !!p && !!files[p];

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

export function useVFS({ iframeRef, manifest }): {
  files: VirtualFS;
  activePath: string | null;
  activeFile: any;
  entrySource: EntrySource;
  handleFileSelect: (path: string) => void;
  updateActiveFileContent: (content: string) => void;
  setActivePath: (path: string) => void;
} {
  const trace = createTrace('exhibit:client:useVFS');

  // -------------------------------------------------------------------------
  // INIT
  // -------------------------------------------------------------------------
  trace.mark('INIT', {
    slug: manifest.slug,
    projectType: manifest.projectType,
    runtimeEntry: manifest.runtime?.entry,
    seedEntry: manifest.seeds?.entry,
  });

  const { slug, files: initialFiles, entries, runtime, seeds } = manifest;

  const [files, setFiles] = useState<VirtualFS>(initialFiles);

  const getShellContent = () => {
    if (!seeds?.entry || !seeds?.files) return null;
    const shellFile = seeds.files.find((f) => f.path === seeds.entry);
    return shellFile?.content || null;
  };

  // Find the specific entrypoint for the React App
  const getEntryPath = () => {
    return runtime?.entry || seeds?.entry || './page.tsx';
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

  const getCanonicalPath = (path: string) => (path.startsWith('./') ? path : `./${path}`);

  // -------------------------------------------------------------------------
  // FILE UPDATE
  // -------------------------------------------------------------------------
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
  const handleFileSelect = (path: string) => {
    const resolvedPath = getCanonicalPath(path);

    trace.mark('FILE_SELECT', {
      from: activePath,
      to: resolvedPath,
    });

    setActivePathState(resolvedPath);
  };

  // -------------------------------------------------------------------------
  // ACTIVE FILE DERIVATION
  // -------------------------------------------------------------------------
  const activeFile = useMemo(() => {
    const file = activePath ? files[activePath] || null : null;

    if (!file && activePath) {
      trace.mark('ACTIVE_FILE_MISSING', {
        activePath,
        available: Object.keys(files),
      });
    }

    return file;
  }, [files, activePath]);

  // 1. Structural change (Add/Delete/Rename) -> Full Refresh
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

  // 2. Typing change -> Patch Only
  const syncFilePatch = (path, content) => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: 'vfs:sync', // The "Patch" we defined earlier
        payload: { path, content },
      },
      '*',
    );
  };
  return {
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
