import { describe, it, expect, vi } from 'vitest';
import { createIframeRuntime } from '../lib/modules/runtime';

vi.mock('../../lib/modules/injectReact', () => {
  return {
    injectReact: (App: any, id: number) => {
      return `RENDER:${id}:${App?.name ?? 'no-app'}`;
    },
  };
});

describe('createIframeRuntime', () => {
  it('increments renderId and updates iframe srcdoc', () => {
    const renderId = { current: 0 };

    const iframe = {
      current: { srcdoc: '' },
    };

    const runtime = createIframeRuntime(renderId as any, iframe as any);

    runtime(
      {
        '/app': 'export default function App() {}',
      },
      '/app',
    );

    expect(renderId.current).toBe(1);
    expect(iframe.current.srcdoc).toContain('RENDER:1');
  });

  it('calls runtime multiple times increments renderId', () => {
    const renderId = { current: 0 };

    const iframe = {
      current: { srcdoc: '' },
    };

    const runtime = createIframeRuntime(renderId as any, iframe as any);

    runtime({ '/a': 'code' }, '/a');
    runtime({ '/a': 'code2' }, '/a');

    expect(renderId.current).toBe(2);
  });
});
