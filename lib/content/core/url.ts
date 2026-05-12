export function buildContentUrl(type, slug) {
  const normalized = Array.isArray(slug) ? slug.join('/') : slug

  const cleaned = normalized.replace(/^blog\//, '') // 👈 key fix

  return `/${type}/${cleaned}`
}
