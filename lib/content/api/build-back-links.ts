import fs from 'fs'
import matter from 'gray-matter'
import { getContent } from './get-content.js'
import { buildTermsRegistry } from './build-terms-registry.js'

function canonicalSlug(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\.md$/, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function normalizeTerm(T) {
  const term = typeof T === 'string' ? T : T.term || T.slug

  return {
    term,
    slug: canonicalSlug(T.slug || term),
    aliases: T.aliases || [],
  }
}

function countMatches(text, term) {
  const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`\\b${safe}\\b`, 'g')
  return (text.match(regex) || []).length
}

export function buildBacklinks(files, terms) {
  const links = {}

  for (const f of files) {
    const filePath = typeof f === 'string' ? f : f.file
    const type = typeof f === 'string' ? 'unknown' : f.type

    const raw = fs.readFileSync(filePath, 'utf8')
    const { content, data } = matter(raw)

    const text = content.toLowerCase()
    const isDraft = Boolean(data.draft)

    // FIX: iterate values, not entries
    for (const T of Object.values(terms)) {
      const term = normalizeTerm(T)

      const slug = term.slug
      if (!slug) continue

      if (!links[slug]) {
        links[slug] = []
      }

      const variants = [term.term, ...(term.aliases || [])]
        .filter(Boolean)
        .map((v) => v.toLowerCase())

      let count = 0

      for (const v of variants) {
        count += countMatches(text, v)
      }

      if (count > 0) {
        links[slug].push({
          file: filePath,
          type,
          count,
          draft: isDraft,
        })
      }
    }
  }

  // rank results
  for (const slug in links) {
    links[slug].sort((a, b) => b.count - a.count)
  }

  return links
}

export function getBacklinks() {
  const terms = buildTermsRegistry()
  const files = getContent()
  return buildBacklinks(files, terms)
}
