'use client';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@teispace/next-themes';

import { createTrace } from '@/lib/trace';
import { vfsAPI } from '@/pkg/exhibit/types';

type IframeControllerProps = {
  vfs: vfsAPI;
  code: string;
  onSuccess: () => void;
  onError: () => void;
  targetOrigin: string;
};

export function useIframeController(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  { vfs, code, onSuccess, onError, targetOrigin = '*' }: IframeControllerProps,
) {
  const traceRef = useRef(createTrace('exhibit:client:useIframeController'));
  const trace = traceRef.current;
  const [status, setStatus] = useState<'idle' | 'ready' | 'booted'>('idle');

  const { resolvedTheme } = useTheme();

  // -------------------------------------------------------------------------
  // THEME UPDATE: Leave this separated to [PROVE] you handle life cycles correctly.
  // -------------------------------------------------------------------------
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
      { type: 'theme:change', payload: { theme: resolvedTheme ?? 'light' } },
      targetOrigin,
    );
  }, [status, resolvedTheme]);

  // -------------------------------------------------------------------------
  // IFRAME INITIALIZE
  // -------------------------------------------------------------------------
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type !== 'iframe:ready') return;

      console.log('[IFRAME] ready received');

      setStatus('ready');
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // -------------------------------------------------------------------------
  // BOOT: Runtime setup. Module registry etc.
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (status !== 'ready') return;
    if (!iframeRef.current?.contentWindow) return;
    console.log('[BOOT] executing');

    iframeRef.current.contentWindow.postMessage({
      type: 'runtime:boot',
      payload: vfs.createSnapshot(),
    });

    setStatus('booted');
  }, [status, vfs.files, vfs.activePath]);

  // -------------------------------------------------------------------------
  // RUN
  // -------------------------------------------------------------------------
  // No handler...  leave until confident not needed.
  // useEffect(() => {
  //   if (status !== 'booted') return;
  //   if (!iframeRef.current?.contentWindow) return;
  //   if (!vfs.activePath) return;

  //   iframeRef.current.contentWindow.postMessage({
  //     type: 'runtime:run',
  //     entry: vfs.activePath,
  //   });
  // }, [vfs.activePath, status]);
  // -------------------------------------------------------------------------
  // MESSAGE HANDLER
  // -------------------------------------------------------------------------
  useEffect(() => {
    trace.mark('LISTENER_MOUNT');
    const onMessage = (e: MessageEvent) => {
      const { type, payload } = e.data || {};
      // iframe ready
      if (type === 'iframe:ready') {
        trace.mark('IFRAME_READY_RECEIVED');
        trace.mark('READY_HANDLED');
      }

      if (type === 'iframe:success') {
        trace.mark('IFRAME_SUCCESS');
        onSuccess?.();
      }

      if (type === 'iframe:error') {
        trace.mark('IFRAME_ERROR', { payload });
        onError?.(payload);
      }
    };

    window.addEventListener('message', onMessage);

    return () => {
      trace.mark('LISTENER_UNMOUNT');
      window.removeEventListener('message', onMessage);
    };
  }, [onSuccess, onError]);

  // -------------------------------------------------------------------------
  // INITIAL RUN
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!iframeRef.current) return;
    trace.mark('FILE EDIT', {
      activePath: vfs.activePath,
    });
    vfs.syncFilePatch(vfs.activePath, code);
  }, [code, vfs.activePath]);
}
