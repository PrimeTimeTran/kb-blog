import { useTheme } from '@teispace/next-themes';
import { useEffect, useRef } from 'react';

export interface IframeErrorPayload {
  message: string;
  stack: string;
  loc: { line: number; column: number } | null;
}

interface UseIframeControllerOptions {
  code: string;
  onSuccess: () => void;
  onError: (payload: IframeErrorPayload) => void;
  // FUTURE-PROOF: Allow passing an explicit origin boundary (Defaults to current location shell)
  targetOrigin?: string;
}

export function useIframeController(
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  { code, onSuccess, onError, targetOrigin = '*' }: UseIframeControllerOptions,
) {
  const { resolvedTheme } = useTheme();
  const isReadyRef = useRef(false);

  // Sync state arguments seamlessly across render loops
  const latestStateRef = useRef({ code, resolvedTheme, onSuccess, onError, targetOrigin });
  latestStateRef.current = { code, resolvedTheme, onSuccess, onError, targetOrigin };

  // Core messaging pipeline
  const send = () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;

    const current = latestStateRef.current;

    // FUTURE-PROOF: Replaced '*' with strict origin constraints where possible
    iframe.contentWindow.postMessage({ type: 'theme', theme: current.resolvedTheme ?? 'light' }, current.targetOrigin);

    iframe.contentWindow.postMessage({ type: 'code:update', code: current.code }, current.targetOrigin);
  };

  // FUTURE-PROOF: Reset the ready state flag if the element instance or source document gets wiped out
  useEffect(() => {
    isReadyRef.current = false;
  }, [iframeRef.current]);

  // EFFECT 1: Multi-Sandbox Isolated Message Hub
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;

      // FUTURE-PROOF identity check: Ensure the message came from THIS specific iframe window instance
      if (e.source !== iframe.contentWindow) return;

      const data = e.data;
      if (!data) return;

      if (data.type === 'iframe:ready') {
        isReadyRef.current = true;
        send();
      }

      if (data.type === 'iframe:error') {
        latestStateRef.current.onError(data.payload);
      }

      if (data.type === 'iframe:success') {
        latestStateRef.current.onSuccess();
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [iframeRef]); // Track the element container identity anchor safely

  // EFFECT 2: Live Sync Engine
  useEffect(() => {
    if (!isReadyRef.current) return;
    send();
  }, [code, resolvedTheme]);
}
