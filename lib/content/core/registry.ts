import path from 'path'

import { createTrace } from '@/lib/debug'

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

function createCollection(type: string, source: ContentSource): ContentCollection {
  return {
    async list() {
      return source.list(type)
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
    includeDrafts: true, // default safe value

    filter: config?.filters?.list,
  }
}

export const registry: ContentRegistry = {
  get(type) {
    if (!['blog', 'kb', 'terms'].includes(type)) return null

    return createCollection(type, filesystemSource)
  },
}

// export const registry: ContentRegistry = {
//   get(type) {
//     const entry = lookup[type]
//     if (!entry) return null

//     return resolveCollection(entry.source, type)
//   },
// }

export function createContentClient(registry: ContentRegistry, config?: ContentClientConfig) {
  return {
    get: async (args) => {
      const collection = registry.get(args.type)
      if (!collection) throw new Error(`Unknown content type: ${args.type}`)

      const result = await getContent({ ...args, collection }, registry)
      return result ?? null
    },

    list: async (args) => {
      const collection = registry.get(args.type)
      if (!collection) throw new Error(`Unknown content type: ${args.type}`)

      return listContent(
        {
          registry,
          collection,
          config: mapClientToListConfig(config),
        },
        args
      )
    },
  }
}
