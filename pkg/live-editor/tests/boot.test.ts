import { describe, it, expect } from 'vitest';

import { useBootOrchestrator } from '../hooks/useBootOrchestrator';
import { nextSpec } from '../specs';

describe('Boot Orchestrator', () => {
  it('builds snapshot with entry + files', async () => {
    const boot = useBootOrchestrator();

    await boot.boot('next-basic');

    expect(boot.snapshot).not.toBeNull();
    expect(boot.snapshot?.files).toBeDefined();
    expect(boot.snapshot?.entry).toBe('/app/page.tsx');
  });

  it('ensures entry exists in VFS', async () => {
    const boot = useBootOrchestrator();

    await boot.boot('next-basic');

    const { files, entry } = boot.snapshot!;

    expect(files[entry]).toBeDefined();
  });
});
