import { useTheme } from '@teispace/next-themes';
import { useEffect, useRef } from 'react';

export function useIframeController(iframeRef: React.RefObject<HTMLIFrameElement>, code: string) {
  const { resolvedTheme } = useTheme();
  const isReadyRef = useRef(false);

  const send = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    iframe.contentWindow.postMessage(
      {
        type: 'theme',
        theme: resolvedTheme ?? 'light',
      },
      '*',
    );

    iframe.contentWindow.postMessage(
      {
        type: 'code:update',
        code,
      },
      '*',
    );
  };

  // listen for iframe ready ONCE
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'iframe:ready') {
        isReadyRef.current = true;
        send(); // flush immediately
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [code, resolvedTheme]);

  // push updates whenever code changes (only after ready)
  useEffect(() => {
    if (!isReadyRef.current) return;
    send();
  }, [code, resolvedTheme]);
}
