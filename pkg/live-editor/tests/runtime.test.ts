import { describe, it, expect } from 'vitest';
import { createRuntime } from '../lib/modules/runtime';

function mockVMFactory() {
  return (files: Record<string, string>) => {
    return {
      execute: (entry: string) => {
        if (entry === '/ok') return function App() {};
        if (entry === '/undefined') return undefined;
        throw new Error('missing module');
      },
    };
  };
}

describe('Runtime', () => {
  it('throws if run called before init', () => {
    const runtime = createRuntime(mockVMFactory());

    expect(() => runtime.run('/app/page.tsx')).toThrow();
  });

  it('executes after init', () => {
    const runtime = createRuntime(mockVMFactory());

    runtime.init({
      '/app/page.tsx': 'export default function App() {}',
    });

    const App = runtime.run('/app/page.tsx');

    expect(App).toBeDefined();
  });

  it('throws on missing entry', () => {
    const runtime = createRuntime(mockVMFactory());

    runtime.init({
      '/app/page.tsx': 'x',
    });

    expect(() => runtime.run('/missing.tsx')).toThrow();
  });
});

describe('createRuntime', () => {
  it('throws if run called before init', () => {
    const rt = createRuntime(mockVMFactory());

    expect(() => rt.run('/ok')).toThrow('[RUNTIME] not initialized');
  });

  it('throws if entry is missing', () => {
    const rt = createRuntime(mockVMFactory());

    rt.init({ '/ok': 'code' });

    expect(() => rt.run('')).toThrow('[RUNTIME] missing entry');
  });

  it('throws if VM returns undefined', () => {
    const rt = createRuntime(mockVMFactory());

    // inject fake vm
    rt.init({ '/undefined': 'code' });

    expect(() => rt.run('/undefined')).toThrow('[RUNTIME] execution returned undefined');
  });

  it('executes valid entry', () => {
    const rt = createRuntime(mockVMFactory());

    rt.init({ '/ok': 'code' });

    const App = rt.run('/ok');

    expect(typeof App).toBe('function');
  });
  it('preserves vm instance across init and run', () => {
    let capturedVm: any = null;

    const rt = createRuntime((files) => {
      const vm = {
        execute: () => function App() {},
      };

      capturedVm = vm;
      return vm;
    });

    rt.init({ '/ok': 'code' });

    rt.run('/ok');

    expect(capturedVm).not.toBeNull();
  });
});
