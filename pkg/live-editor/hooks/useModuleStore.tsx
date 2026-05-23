import { useState } from 'react';

export function useModuleStore(initial: Record<string, string>) {
  const [files, setFiles] = useState<Record<string, string>>(initial);

  function updateFile(path: string, code: string) {
    setFiles((prev) => ({
      ...prev,
      [path]: code,
    }));
  }

  function getFile(path: string) {
    return files[path];
  }

  return {
    files,
    updateFile,
    getFile,
  };
}
