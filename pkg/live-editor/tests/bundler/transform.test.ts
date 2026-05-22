import { describe, it, expect } from 'vitest';
import { transform } from '../../lib/bundler/transform';

describe('transform', () => {
  it('converts export default', () => {
    const input = `export default function App() {}`;

    const out = transform(input);

    expect(out).toContain('module.exports.default');
    expect(out).not.toContain('export default');
  });

  it('strips import statements', () => {
    const input = `import x from "./x";\nconst a = 1;`;

    const out = transform(input);

    expect(out).not.toContain('import');
    expect(out).toContain('const a = 1;');
  });
});
