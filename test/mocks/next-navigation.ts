// test/mocks/next-navigation.ts

export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  refresh: () => {},
  back: () => {},
  forward: () => {},
  prefetch: async () => {},
});

export const usePathname = () => '/';

export const useSearchParams = () => new URLSearchParams();

export const useServerInsertedHTML = () => {};
