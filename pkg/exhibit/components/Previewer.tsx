import { ExhibitManifest, vfsAPI } from '../types';
import { useEffect, useRef, useState } from 'react';

type PreviewType = { manifest: ExhibitManifest; vfs: vfsAPI; codeState: string | undefined; className: string };

export const Previewer = ({ className, vfs, manifest }: PreviewType) => {
  const [blobUrl, setBlobUrl] = useState('');
  const htmlCacheRef = useRef(new Map());
  const blobUrlRef = useRef(null);

  const getPreviewHtml = () => {
    const cache = htmlCacheRef.current;

    return cache.get('./index.html') || cache.values().next().value || '';
  };

  useEffect(() => {
    const files = vfs.files || {};

    const cache = new Map();

    for (const [path, file] of Object.entries(files)) {
      if (isHtml(path)) {
        cache.set(path, file.content);
      }
    }

    htmlCacheRef.current = cache;
  }, [vfs.files]);

  useEffect(() => {
    const html = getPreviewHtml();
    if (!html) return;

    const files = vfs.files || {};
    const root = manifest.root;

    const resolve = (path: string) => {
      const clean = normalizePath(path);
      const key = `./${root}/${clean}`;
      return files[key]?.content;
    };

    let output = html;

    // Inject CSS
    output = output.replace(/<link[^>]*href=["'](.*?)["'][^>]*>/gi, (match, href) => {
      const css = resolve(href);
      return css ? `<style>${css}</style>` : match;
    });

    // Inject JS
    output = output.replace(/<script[^>]*src=["'](.*?)["'][^>]*><\/script>/gi, (match, src) => {
      const js = resolve(src);

      if (js) {
        console.log(`[Preview] injected: ${src}`);
        return `<script>${js}</script>`;
      }

      return match;
    });

    // 3. Blob lifecycle (safe replace)
    const blob = new Blob([output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    setBlobUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    blobUrlRef.current = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [vfs.files, manifest.root]);

  if (!blobUrl) return null;

  return <iframe className={className} src={blobUrl} />;
};

export default Previewer;

const isHtml = (path?: string) => path?.endsWith('.html');

const normalizePath = (path = '') => path.replace(/^\.\//, '');
