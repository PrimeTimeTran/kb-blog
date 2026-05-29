import { vi } from 'vitest';

vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
    }),

    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
  };
});
