import { useEffect, useState } from 'react';

export function useStarterCode() {
  const [shell, setShell] = useState<string | null>(null);
  const [starterCode, setStarterCode] = useState<string | null>(null);

  useEffect(() => {
    fetch('/starters/live-editor-shell.html')
      .then((r) => r.text())
      .then(setShell);

    fetch('/starters/1.tsx')
      .then((r) => r.text())
      .then(setStarterCode);
  }, []);

  return { shell, starterCode };
}
