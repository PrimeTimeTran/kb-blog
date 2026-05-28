import path from 'path';

export const ROOT = process.cwd();

export function getRootPath(...segments: string[]): string {
  return path.resolve(ROOT, ...segments);
}
