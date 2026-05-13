export function buildMDXContext(input: { slug: string }) {
  return {
    slug: input.slug,
  }
}
