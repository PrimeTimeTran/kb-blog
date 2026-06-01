import { ExhibitManifest, VirtualFileSystemAPI } from '@/lib/types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type PreviewType = {
  manifest: ExhibitManifest;
  vfs: VirtualFileSystemAPI;
  codeState: string | undefined;
  className: string;
};

export const Previewer = ({ className, vfs }: PreviewType) => {
  const [blobUrl, setBlobUrl] = useState('');

  useEffect(() => {
    const files = vfs.files || {};
    const htmlEntry = Object.entries(files).find(([p]) => p.endsWith('.html'));

    const html = htmlEntry?.[1]?.content || '';

    if (!html) return;

    const resolve = (href: string) => {
      const clean = href.replace(/^\.\//, '');
      return files[clean]?.content ?? null;
    };

    let output = html;

    output = output.replace(/<link[^>]*href=["'](.*?)["'][^>]*>/gi, (match, href) => {
      const css = resolve(href);
      return css ? `<style>${css}</style>` : match;
    });

    output = output.replace(/<script[^>]*src=["'](.*?)["'][^>]*><\/script>/gi, (match, src) => {
      const js = resolve(src);
      return js ? `<script>${js}</script>` : match;
    });

    const blob = new Blob([output], { type: 'text/html' });
    const nextUrl = URL.createObjectURL(blob);

    setBlobUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return nextUrl;
    });

    return () => URL.revokeObjectURL(nextUrl);
  }, [vfs.files]);

  const { iframeRef: scrollRef } = useIframeScrollPreservation(blobUrl);

  if (!blobUrl) return null;

  return <iframe ref={scrollRef} className={className} src={blobUrl} />;
};

export default Previewer;

// CONTEXT:
// This code is cleaner but causes the iframe to have race conditions with main app
// export const Previewer2 = ({ className, vfs, manifest }: PreviewType) => {
//   const html = useMemo(() => buildPreviewHtml(vfs, manifest), [vfs, manifest]);

//   const blobUrl = useBlobUrl(html);
//   const { iframeRef } = useIframeScrollPreservation(blobUrl);

//   if (!blobUrl) return null;

//   return <iframe ref={iframeRef} className={className} src={blobUrl} />;
// };

// function buildPreviewHtml(vfs: any, manifest: any) {
//   const files = vfs.files || {};
//   const root = manifest.root;

//   const resolve = (path: string) => {
//     const clean = path.replace(/^\.\//, '');
//     const key = `./${root}/${clean}`;
//     return files[key]?.content;
//   };

//   const html = Object.entries(files).find(([p]) => p.endsWith('.html'))?.[1]?.content || '';

//   let output = html;

//   output = output.replace(/<link[^>]*href=["'](.*?)["'][^>]*>/gi, (match, href) => {
//     const css = resolve(href);
//     return css ? `<style>${css}</style>` : match;
//   });

//   output = output.replace(/<script[^>]*src=["'](.*?)["'][^>]*><\/script>/gi, (match, src) => {
//     const js = resolve(src);
//     return js ? `<script>${js}</script>` : match;
//   });

//   return output;
// }
// function useBlobUrl(html: string) {
//   // const [url, setUrl] = useState('');
//   // useEffect(() => {
//   //   if (!html) return;

//   //   const blob = new Blob([html], { type: 'text/html' });
//   //   const nextUrl = URL.createObjectURL(blob);

//   //   setUrl((prev) => {
//   //     if (prev) URL.revokeObjectURL(prev);
//   //     return nextUrl;
//   //   });

//   //   return () => URL.revokeObjectURL(nextUrl);
//   // }, [html]);

//   const urlRef = useRef<string>('');
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);

//   useEffect(() => {
//     if (!html) return;

//     const blob = new Blob([html], { type: 'text/html' });
//     const nextUrl = URL.createObjectURL(blob);

//     if (urlRef.current) {
//       URL.revokeObjectURL(urlRef.current);
//     }

//     urlRef.current = nextUrl;

//     if (iframeRef.current) {
//       iframeRef.current.src = nextUrl;
//     }

//     return () => {
//       URL.revokeObjectURL(nextUrl);
//     };
//   }, [html]);

//   return urlRef;
// }
function useIframeScrollPreservation(url: string) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const scrollRef = useRef(0);

  // save scroll BEFORE url change effect
  useLayoutEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      scrollRef.current = iframe.contentWindow?.scrollY ?? 0;
    } catch (err) {
      console.log('Error: ', err);
    }
  });

  // restore after load
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        iframe.contentWindow?.scrollTo(0, scrollRef.current);
      } catch (err) {
        console.log('Error: ', err);
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [url]);

  return { iframeRef };
}
