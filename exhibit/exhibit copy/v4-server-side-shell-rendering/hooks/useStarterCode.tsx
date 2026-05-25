import { useEffect, useState } from 'react';

type VirtualFiles = Record<string, string>;

export function useStarterCode(slug: string[], entryPoint: string) {
  const [shell, setShell] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/starters/live-editor-shell.html');
        if (!res.ok) throw new Error('Failed to load shell template');
        const shellHtml = await res.text();
        if (cancelled) return;
        setShell(shellHtml);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug, entryPoint]); // Added entryPoint to dependency array

  return { shell, loading, error };
}

export function useStarterCode2(slug: string[]) {
  const [entry, setEntry] = useState<string | null>(null);
  const [shell, setShell] = useState<string | null>(null);
  const [files, setFiles] = useState<VirtualFiles | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false; // Note: 'let' instead of 'const'

    async function load() {
      try {
        setLoading(true);

        // 1. Fetch shell and data in parallel to be faster
        const [shellRes, dataRes] = await Promise.all([
          fetch('/starters/live-editor-shell.html'),
          fetch(`/api/exhibit/${slug.join('/')}`),
        ]);

        if (cancelled) return;
        if (!shellRes.ok || !dataRes.ok) throw new Error('Failed to load assets');

        const shellHtml = await shellRes.text();
        const data = await dataRes.json();

        // 2. Define the path
        const entryPath = `./${slug.join('/')}/page.tsx`;
        setEntry(entryPath);

        // 3. Perform the injection using a proper placeholder
        // Ensure your shell has: shellHtml = shellHtml.replace('', entryPath);

        setShell(shellHtml);
        setFiles(data.files);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    // Fix: Cleanup function
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { entry, shell, files, loading, error };
}
