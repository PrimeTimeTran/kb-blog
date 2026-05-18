function normalizeBoolean(v: unknown) {
  return v === true || v === 'true'
}

export function isPublished(entity: {
  frontMatter?: {
    draft?: boolean | string
    isDev?: boolean | string
  }
}) {
  const fm = entity?.frontMatter ?? {}

  const isDraft = normalizeBoolean(fm.draft)
  const isDev = normalizeBoolean(fm.isDev)

  // DEV-ONLY CONTENT
  //
  // Visible only in development.
  // Can override draft:true locally.
  if (isDev) {
    return process.env.NODE_ENV === 'development'
  }

  // EXPLICIT DRAFT
  if (isDraft) {
    return false
  }

  // STRICT PUBLISH RULE:
  // only explicitly draft:false publishes
  return fm.draft === false || fm.draft === 'false'
}
