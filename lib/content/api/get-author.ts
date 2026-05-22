import { filesystemSource } from '../source/fs';
import { createPipelineContext } from '../pipeline/runtime';
import { buildRuntimePipeline } from '../pipeline/runtime/build-runtime-pipeline';

export async function getAuthor(id: string) {
  // 1. resolve author file as "source"
  const source = await filesystemSource.resolve({
    type: 'authors',
    slug: id,
  });

  if (!source) return null;

  // 2. read raw content
  const raw = await filesystemSource.read(source);

  // 3. build pipeline context (reuse your system)
  const ctx = createPipelineContext({
    request: {
      type: 'authors',
      slug: id,
    },
    source,
    raw,
  });

  // 4. run pipeline (authors can use lighter pipeline steps)
  const entity = await buildRuntimePipeline(ctx).run(raw);

  // 5. map to entity output
  return entity;
}
