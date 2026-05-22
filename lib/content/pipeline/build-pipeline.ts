import { buildTermsGraph, buildTermsRegistry } from '../api/build-terms-registry.js';

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
