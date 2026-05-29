import { buildTermsGraph } from '@/lib/content/api/build-terms-registry';
import { buildTermsRegistry } from '@/lib/content/api/build-terms-registry';

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
