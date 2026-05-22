import type { RawContent, ContentRequest, PipelineContext, ResolvedContentSource } from '../../core/types';

export function createPipelineContext(input: {
  request: ContentRequest;
  source: ResolvedContentSource;
  raw: RawContent;
  index?: Record<string, unknown>;
  analysis?: Record<string, unknown>;
}): PipelineContext {
  return {
    request: input.request,
    source: input.source,
    raw: input.raw,

    index: input.index ?? {},
    analysis: input.analysis ?? {},

    transform: {
      ast: null,
    },

    compile: {},

    diagnostics: [],
    artifacts: {},
  };
}
