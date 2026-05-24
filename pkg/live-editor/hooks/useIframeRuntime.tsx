import { useTheme } from '@teispace/next-themes';
import React, { useEffect } from 'react';

export function useIframeRuntime(iframeRef: React.RefObject<HTMLIFrameElement>, code: string) {
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const send = () => {
      iframe.contentWindow?.postMessage({
        type: 'code:update',
        code,
      });
    };

    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'iframe:ready') {
        send();
      }
    };

    window.addEventListener('message', onMessage);

    return () => window.removeEventListener('message', onMessage);
  }, [code]);

  const { resolvedTheme } = useTheme();

  const sendTheme = React.useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'theme',
      theme: resolvedTheme,
    });
  }, [resolvedTheme]);

  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'iframe:ready') {
        sendTheme();
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [sendTheme]);

  React.useEffect(() => {
    sendTheme();
  }, [sendTheme]);

  return {
    sendTheme,
  };
}
