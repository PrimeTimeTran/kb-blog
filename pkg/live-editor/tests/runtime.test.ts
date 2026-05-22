import { describe, it, expect } from 'vitest';
import { createRuntime } from '../lib/modules/runtime';

describe('Runtime', () => {
  it('throws if run called before init', () => {
    const runtime = createRuntime();

    expect(() => runtime.run('/app/page.tsx')).toThrow();
  });

  it('executes after init', () => {
    const runtime = createRuntime();

    runtime.init({
      '/app/page.tsx': 'export default function App() {}',
    });

    const App = runtime.run('/app/page.tsx');

    expect(App).toBeDefined();
  });

  it('throws on missing entry', () => {
    const runtime = createRuntime();

    runtime.init({
      '/app/page.tsx': 'x',
    });

    expect(() => runtime.run('/missing.tsx')).toThrow();
  });
});
