import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { buildBacklinks } from '../backlinks.js'

import { TERMS_DIR } from '../core/constants.js'

function slugify(file) {
  return file.replace(/\.mdx?$/, '')
}

export function buildTermsRegistry() {
  const files = fs.readdirSync(TERMS_DIR)

  const registry = {}

  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue

    const raw = fs.readFileSync(path.join(TERMS_DIR, file), 'utf8')
    const { data } = matter(raw)

    const slug = data.slug || slugify(file)

    registry[slug.toLowerCase()] = {
      term: data.term,
      slug: `/terms/${slug}`,
      aliases: data.aliases || [],
      tags: data.tags || [],
      definition: data.definition || '',
    }
  }

  return registry
}

export function buildTermsGraph(files) {
  const terms = buildTermsRegistry()

  const backlinks = buildBacklinks(files, terms)

  return {
    terms,
    backlinks,
  }
}
