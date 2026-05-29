import { describe, expect, it, vi } from 'vitest';

import Page from '@/app/playground/[...slug]/page';
import { getVFSFromExhibit } from '@/lib/vfs-loader';

vi.mock('@/lib/vfs-loader', () => ({
  getVFSFromExhibit: vi.fn(),
}));

describe('Exhibit type NextJS start file resolution', () => {
  it('falls back to vanilla exhibit when entrypoint missing', async () => {
    vi.mocked(getVFSFromExhibit).mockReturnValue({});

    const result = await Page({
      params: Promise.resolve({
        slug: ['hello-world-missing-entrypoint'],
      }),
      searchParams: Promise.resolve({
        entry: 'client.tsx',
      }),
    });

    expect(result.props.manifest.hasApp).toBe(false);
    expect(result.props.manifest.hasPage).toBe(false);
    expect(result.props.manifest.projectType).toBe('vanilla');
  });
});
