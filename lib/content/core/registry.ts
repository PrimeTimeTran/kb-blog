import { ContentClientConfig, ContentCollection, ContentListConfig, ContentRegistry, ContentSource } from '../types';
import { getContent, listContent } from '../api';

import { CONTENT_DIR } from '@/lib/paths';
import { createFilesystemSource } from '../server/source/filesystem';

const filesystemSource = createFilesystemSource({
  rootDir: CONTENT_DIR,
});

function createCollection(type: string, source: ContentSource): ContentCollection {
  return {
    id: source.id,
    async list() {
      const entries = await source.list(type);
      return Array.isArray(entries) ? entries.filter((e): e is string => typeof e === 'string') : [];
    },

    async read(slug: string) {
      const resolved = await source.resolve({ type, slug });
      if (!resolved) return null;
      return source.read(resolved);
    },
  };
}

function mapClientToListConfig(config?: ContentClientConfig): ContentListConfig {
  return {
    includeDrafts: false,
    requireTitle: true,
    requireSummary: true,
    filter: config?.filters?.list,
  };
}

export const registry: ContentRegistry = {
  get(type) {
    if (!['blog', 'kb', 'terms', 'authors'].includes(type)) return null;
    return createCollection(type, filesystemSource);
  },
};

export function createContentClient(registry: ContentRegistry, config?: ContentClientConfig) {
  return {
    get: async (query: { type: string; slug: string }) => {
      const collection = registry.get(query.type);

      if (!collection) {
        throw new Error(`Unknown content type: ${query.type}`);
      }

      return getContent(
        {
          collection,
          config,
        },
        query,
      );
    },

    list: async (args: { type: string } & Record<string, unknown>) => {
      const collection = registry.get(args.type);

      if (!collection) {
        throw new Error(`Unknown content type: ${args.type}`);
      }

      return listContent(
        {
          collection,
          config: mapClientToListConfig(config),
        },
        args,
      );
    },
  };
}
