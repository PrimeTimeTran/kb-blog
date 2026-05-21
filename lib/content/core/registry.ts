import path from 'path'

import {
  ContentSource,
  ContentRegistry,
  ContentCollection,
  ContentClientConfig,
  ContentListConfig,
} from './types'

import { createFilesystemSource } from '../server/source/filesystem'
import { getContent, listContent } from '../api'

const filesystemSource = createFilesystemSource({
  rootDir: path.join(process.cwd(), 'data'),
})

/**
 * Collection = safe abstraction over raw source
 */
function createCollection(type: string, source: ContentSource): ContentCollection {
  return {
    id: source.id,

    // IMPORTANT: only deal with string[] here
    async list() {
      const entries = await source.list(type)

      // enforce safety: must be string[]
      return Array.isArray(entries) ? entries.filter((e): e is string => typeof e === 'string') : []
    },

    async read(slug: string) {
      const resolved = await source.resolve({ type, slug })
      if (!resolved) return null
      return source.read(resolved)
    },
  }
}

function mapClientToListConfig(config?: ContentClientConfig): ContentListConfig {
  return {
    includeDrafts: false,
    requireTitle: true,
    requireSummary: true,
    filter: config?.filters?.list,
  }
}

export const registry: ContentRegistry = {
  get(type) {
    console.log('registry')
    if (!['blog', 'kb', 'terms', 'authors'].includes(type)) return null
    return createCollection(type, filesystemSource)
  },
}

/**
 * Client API layer (NO recursion into registry/listContent)
 */
export function createContentClient(registry: ContentRegistry, config?: ContentClientConfig) {
  return {
    get: async (query: { type: string }) => {
      const collection = registry.get(query.type)

      if (!collection) {
        throw new Error(`Unknown content type: ${query.type}`)
      }

      return getContent(
        {
          collection,
          config,
        },
        query
      )
    },

    list: async (args: { type: string } & Record<string, unknown>) => {
      const collection = registry.get(args.type)

      if (!collection) {
        throw new Error(`Unknown content type: ${args.type}`)
      }

      return listContent(
        {
          collection,
          config: mapClientToListConfig(config),
        },
        args // 🔥 IMPORTANT: DO NOT STRIP THIS
      )
    },
  }
}
