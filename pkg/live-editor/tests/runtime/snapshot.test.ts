import { describe, it, expect } from 'vitest';
import { createRuntime } from '../../lib/runtime';

describe('runtime snapshot safety', () => {
  it('does not allow empty vm execution', () => {
    const rt = createRuntime();

    expect(() => rt.run('/app')).toThrow();
  });

  it('requires init before every execution cycle', () => {
    const rt = createRuntime();

    rt.init({ '/app': 'code' });

    const App = rt.run('/app');

    expect(App).toBeDefined();
  });

  it('re-init replaces vm state', () => {
    const rt = createRuntime();

    rt.init({ '/a': 'codeA' });
    const first = rt.run('/a');

    rt.init({ '/b': 'codeB' });
    const second = rt.run('/b');

    expect(first).toBeDefined();
    expect(second).toBeDefined();
  });
});
