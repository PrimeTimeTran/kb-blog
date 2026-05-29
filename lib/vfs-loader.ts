export type VFS = Record<string, string>;

export function getVFSFromExhibit(slug: string): VFS {
  throw new Error('VFS loader not implemented: expected to load exhibit filesystem');
}
