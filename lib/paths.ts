import path from 'path';

export const PROJECT_ROOT = process.cwd();

// Define specific paths statically.
// Turbopack can trace these constants much more easily than a dynamic function.
export const CONTENT_DIR = path.join(PROJECT_ROOT, 'data');

export const KB_DIR = path.join(PROJECT_ROOT, 'kb');
export const BLOG_DIR = path.join(PROJECT_ROOT, 'blog');
export const AUTHORS_DIR = path.join(PROJECT_ROOT, 'authors');
export const TERMS_DIR = path.join(PROJECT_ROOT, 'terms');
export const EXHIBIT_DIR = path.join(PROJECT_ROOT, 'exhibit');
export const SEEDS_DIR   = path.join(PROJECT_ROOT, 'pkg', 'exhibit', 'seeds');

// Use this for anything truly dynamic, but note the explicit directory
export function getRootPath(...segments: string[]): string {
  // Adding the turbopackIgnore comment tells the bundler not to
  // attempt to trace or resolve this specific dynamic path.
  return path.resolve(/*turbopackIgnore: true*/ PROJECT_ROOT, ...segments);
}

export function getExhibitPath(folderPath: string) {
  const safePath = folderPath.replace(/^\/+/, '');
  return path.join(EXHIBIT_DIR, safePath);
}

export function assertInside(root: string, target: string) {
  const relative = path.relative(root, target);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`Path escapes root: ${target}`);
  }
  return relative;
}
