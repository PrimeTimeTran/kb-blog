import { vi, describe, it, expect } from 'vitest';
import Page from '@/app/playground/[...slug]/page';

const testFSProvider = {
  existsSync: (path: string) => true,
  readdirSync: (path: string) => ['page.tsx'],
  readFileSync: (path: string, encoding: string) => 'export function App() { return <div /> }',
};

vi.mock('@/lib/vfs-loader', () => ({
  getVFSFromExhibit: vi.fn(),
}));

describe('Exhibit type NextJS start file resolution', () => {
  it('errors if entrypoint page.tsx missing', async () => {
    // Setup: Mock an empty VFS (no files)
    vi.mocked(vfsLoader.getVFSFromExhibit).mockReturnValue({});

    await expect(async () =>
      Page({
        params: Promise.resolve({ slug: ['hello-world-missing-entrypoint'] }),
        searchParams: Promise.resolve({ entry: 'client.tsx' }),
      }),
    ).rejects.toThrow('File not found');
  });
});

describe('Exhibit type Vanilla HTML', () => {});
