import type {
  RawContent,
  ContentRequest,
  PipelineContext,
  ResolvedContentSource,
} from '../../core/types'

export function createPipelineContext(input: {
  request: ContentRequest
  source: ResolvedContentSource
  raw: RawContent
}): PipelineContext {
  return {
    request: input.request,
    source: input.source,
    raw: input.raw,

    frontMatter: {},

    analysis: {
      toc: [],
      backlinks: [],
    },

    transform: {
      ast: null,
    },

    compile: {},

    diagnostics: [],
    artifacts: {},
  }
}
