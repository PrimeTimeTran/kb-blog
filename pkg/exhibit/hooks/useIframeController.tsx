'use client';
import { useTheme } from '@teispace/next-themes';
import { useCallback, useEffect, useRef } from 'react';
import { createTrace } from '@/lib/trace';

export function useIframeController(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  { vfs, code, onSuccess, onError, targetOrigin = '*' }: any,
) {
  const trace = createTrace('exhibit:client:useIframeController');

  const { resolvedTheme } = useTheme();

  const isReadyRef = useRef(false);
  const bootedRef = useRef(false);

  // -------------------------------------------------------------------------
  // BOOT
  // -------------------------------------------------------------------------
  const boot = useCallback(() => {
    const iframe = iframeRef.current;

    trace.mark('BOOT_ATTEMPT', {
      hasShell: !!vfs.seeds?.shell,
      hasIframe: !!iframe,
    });

    if (!iframe?.contentWindow) {
      trace.mark('BOOT_ABORT_NO_IFRAME');
      return;
    }

    if (!vfs.seeds?.shell) {
      trace.mark('BOOT_ABORT_NO_SHELL');
      return;
    }

    trace.mark('BOOT_SEND', {
      shellLength: vfs.seeds.shell.length,
    });

    // iframe.contentWindow.postMessage(
    //   {
    //     type: 'runtime:boot',
    //     shell: vfs.seeds.shell,
    //     theme: resolvedTheme ?? 'light',
    //   },
    //   targetOrigin,
    // );

    bootedRef.current = true;

    trace.mark('BOOT_SENT');
  }, [iframeRef, vfs.seeds?.shell, resolvedTheme, targetOrigin]);

  // -------------------------------------------------------------------------
  // RUN
  // -------------------------------------------------------------------------
  const run = useCallback(() => {
    const iframe = iframeRef.current;

    trace.mark('RUN_ATTEMPT', {
      activePath: vfs.activePath,
      hasIframe: !!iframe,
      ready: isReadyRef.current,
      booted: bootedRef.current,
    });

    if (!iframe?.contentWindow) {
      trace.mark('RUN_ABORT_NO_IFRAME');
      return;
    }

    if (!vfs.activePath) {
      trace.mark('RUN_ABORT_NO_ACTIVE_PATH');
      return;
    }

    if (!isReadyRef.current || !bootedRef.current) {
      trace.mark('RUN_ABORT_NOT_READY');
      return;
    }

    trace.mark('RUN_SEND', {
      entry: vfs.activePath,
    });

    iframe.contentWindow.postMessage(
      {
        type: 'runtime:run',
        entry: vfs.activePath,
        code,
      },
      targetOrigin,
    );
  }, [code, iframeRef, vfs.activePath, targetOrigin]);

  // keep stable refs
  const bootRef = useRef(boot);
  const runRef = useRef(run);

  useEffect(() => {
    bootRef.current = boot;
    runRef.current = run;
  }, [boot, run, code]);

  // -------------------------------------------------------------------------
  // MESSAGE HANDLER
  // -------------------------------------------------------------------------
  useEffect(() => {
    trace.mark('LISTENER_MOUNT');

    const onMessage = (e: MessageEvent) => {
      const iframe = iframeRef.current;
      if (!iframe || e.source !== iframe.contentWindow) return;

      const { type, payload } = e.data || {};

      // iframe ready
      if (type === 'iframe:ready') {
        trace.mark('IFRAME_READY_RECEIVED');

        isReadyRef.current = true;

        // IMPORTANT: only boot once
        if (!bootedRef.current) {
          bootRef.current();
        }

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
    trace.mark('RUN_EFFECT_TICK', {
      ready: isReadyRef.current,
      booted: bootedRef.current,
      activePath: vfs.activePath,
    });

    if (!isReadyRef.current) return;
    if (!bootedRef.current) return;

    runRef.current();
  }, [vfs.activePath]);

  // Inside useIframeController.ts
  useEffect(() => {
    // Add a guard: do not attempt to sync if the iframe hasn't finished the boot
    if (!iframeRef.current || !iframeRef.current) return;

    // Only perform partial syncs (vfs:sync) here
    vfs.syncFilePatch(vfs.activePath, code);
  }, [code, vfs.activePath]); // Only reactive to content changes

  // -------------------------------------------------------------------------
  // THEME UPDATE
  // -------------------------------------------------------------------------
  // Change your ready check to a state that resets when srcdoc changes
  useEffect(() => {
    const iframe = iframeRef.current;
    console.log({ iframeContentWindow: iframe?.contentWindow });
    if (!iframe?.contentWindow) return;

    // If the iframe isn't "Ready" (listening for messages),
    // do not send the theme update.
    // if (!isIframeReady) return;

    iframe.contentWindow.postMessage(
      { type: 'theme:change', payload: { theme: resolvedTheme ?? 'light' } },
      targetOrigin,
    );
  }, [resolvedTheme, targetOrigin, isReadyRef.current]); // Added isIframeReady dependency
}
