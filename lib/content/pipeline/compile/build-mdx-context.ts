export function buildMDXContext(input: {
  slug: string
  index: Record<string, unknown> | undefined
}) {
  return {
    slug: input.slug,
    index: input.index,
  }
}
