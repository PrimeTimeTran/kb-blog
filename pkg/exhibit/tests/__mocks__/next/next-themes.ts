import { vi } from 'vitest';
export const useTheme = vi.fn(() => ({ theme: 'light', setTheme: vi.fn() }));
export const ThemeProvider = ({ children }: { children: any }) => children;
