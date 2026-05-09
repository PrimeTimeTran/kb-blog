import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ROOT } from '../../../lib/content/core/constants'
import { isPublished } from '../../../lib/content/core/is-published'
import { loadContent } from '../../../lib/content/core/load-content'
import getAllFilesRecursively from '../../../lib/content/server/files'

import { log } from '../../../lib/debug/logger'

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  let files = []

  for (const entry of entries) {
    const full = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      files = files.concat(walk(full))
    } else if (entry.isFile() && /\.(mdx?|md)$/.test(entry.name)) {
      files.push(full)
    }
  }

  return files
}
export function getAllSlugs(type) {
  const base = path.join(process.cwd(), 'data', type)

  return (
    (walk(base) ?? []).map((filePath) => {
      return filePath
        .replace(base, '')
        .replace(/\.mdx?$/, '')
        .replace(/\\/g, '/')
        .replace(/^\/+/, '')
    }) ??
    [] ??
    []
  )
    ?.filter((slug) => {
      return typeof slug === 'string' && slug.length > 1 && !slug.startsWith('.')
    })
    ?.filter(isPublished)
}

export async function getFiles(type) {
  const slugs = getAllSlugs(type)

  return Promise.all((slugs ?? []).map((slug) => loadContent(type, slug)))
}

export async function getAllFrontMatter(type) {
  const base = path.join(process.cwd(), 'data', type)

  const files = walk(base)

  return (files ?? [])
    .map((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(source)

      return {
        ...data,
        filePath,
        slug: filePath
          .replace(base, '')
          .replace(/\.mdx?$/, '')
          .replace(/\\/g, '/')
          .replace(/^\/|\/$/g, ''),
      }
    })
    ?.filter(isPublished)
}

export async function getAllBlogPosts() {
  const basePath = path.join(ROOT, 'data/blog')
  log.bundle('2. Get All Blog Posts from: ', basePath)
  const files = await getAllFilesRecursively(basePath)

  return (files ?? [])
    .map((filePath) => {
      const source = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(source)

      const slug = filePath
        .replace(/\\/g, '/')
        .replace(/^.*data\/blog\//, '')
        .replace(/\.(md|mdx)$/, '')

      return {
        slug,
        filePath,
        title: data.title || '',
        summary: data.summary || '',
        tags: data.tags || [],
        date: data.date ? new Date(data.date).toISOString() : null,
        isDev: data.isDev ?? false,
        frontMatter: {
          isDev: data.isDev ?? false,
          draft: data.draft === true,
        },
      }
    })
    ?.filter(isPublished)
}
