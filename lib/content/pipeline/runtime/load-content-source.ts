import { filesystemSource } from '../../source/fs'
import { createPipelineContext } from './create-pipeline-context'

export async function loadContentSource(input: { type: string; slug: string }) {
  const source = await filesystemSource.resolve(input)
  if (!source) return null

  const raw = await filesystemSource.read(source)

  return createPipelineContext({
    request: input,
    source,
    raw,
  })
}
