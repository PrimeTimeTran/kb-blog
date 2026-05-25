import { useTheme } from '@teispace/next-themes';
import { useEffect, useRef } from 'react';

export function useIframeController(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  { vfs, files, code, onSuccess, onError, targetOrigin = '*' }: any,
) {
  const { resolvedTheme } = useTheme();
  const isReadyRef = useRef(false);

  // Keep track of latest props to prevent stale closure issues in useEffects
  const stateRef = useRef({ activePath: vfs.activePath, files, code, resolvedTheme, onSuccess, onError, targetOrigin });
  stateRef.current = { activePath: vfs.activePath, files, code, resolvedTheme, onSuccess, onError, targetOrigin };

  // BROADCAST: Unified pipeline to sync files and theme in one go
  const broadcast = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    const { files, activePath, resolvedTheme, targetOrigin } = stateRef.current;

    // 1. Sync Theme
    iframe.contentWindow.postMessage({ type: 'theme', theme: resolvedTheme ?? 'light' }, targetOrigin);

    // 2. Sync VFS State
    iframe.contentWindow.postMessage({ type: 'vfs:sync', files: files }, targetOrigin);

    // 3. Robust Active File Sync
    // Ensure we have a valid path before sending
    if (activePath) {
      console.log('Parent sending path:', activePath); // Debug log
      iframe.contentWindow.postMessage(
        {
          type: 'vfs:active-file-change',
          path: activePath, // Ensure this is the variable holding the string
        },
        targetOrigin,
      );
    } else {
      console.warn('Broadcast skipped: activePath is missing/undefined');
    }
  };

  // EFFECT 1: Listener for Iframe ready and Feedback
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const iframe = iframeRef.current;
      if (!iframe || e.source !== iframe.contentWindow) return;

      const { type, payload } = e.data || {};

      if (type === 'iframe:ready') {
        isReadyRef.current = true;
        broadcast(); // Hydrate immediately on handshake
      }

      if (type === 'iframe:error') {
        stateRef.current.onError(payload);
      }

      if (type === 'iframe:success') {
        stateRef.current.onSuccess();
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [iframeRef]);

  // EFFECT 2: Sync engine (Triggers when files, theme, OR active file changes)
  useEffect(() => {
    if (!isReadyRef.current) return;
    broadcast();
  }, [files, resolvedTheme, vfs.activePath]);
}
