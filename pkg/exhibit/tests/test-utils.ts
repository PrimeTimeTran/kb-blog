import { vi } from 'vitest';

export const createMockFS = (files: Record<string, string>) => ({
  existsSync: vi.fn().mockReturnValue(true),
  // Extract just the filenames from the keys provided
  readdirSync: vi.fn().mockImplementation((dir) => {
    return Object.keys(files)
      .filter((path) => path.startsWith(dir))
      .map((path) => path.split('/').pop()!);
  }),
  readFileSync: vi.fn().mockImplementation((path) => files[path]),
});
