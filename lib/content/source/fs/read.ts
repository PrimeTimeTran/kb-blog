import fs from 'fs/promises';
import type { ResolvedContentSource, RawContent } from '../../core/types';

export async function read(source: ResolvedContentSource): Promise<RawContent> {
  const raw = await fs.readFile(source.filePath, 'utf8');

  let stats: RawContent['stats'] = undefined;

  try {
    const fileStats = await fs.stat(source.filePath);

    stats = {
      size: fileStats.size,
      modifiedAt: fileStats.mtime,
    };
  } catch {
    // optional stats failure should not break pipeline
  }

  return {
    source,
    raw,
    stats,
  };
}
