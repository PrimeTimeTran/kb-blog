import { buildTermsGraph, buildTermsRegistry } from '@/lib/content';

export async function buildPipeline(source) {
  const registry = buildTermsRegistry();

  const files = await source.enumerate();

  const { terms, backlinks } = buildTermsGraph(files);

  return {
    registry,
    terms,
    backlinks,
  };
}
