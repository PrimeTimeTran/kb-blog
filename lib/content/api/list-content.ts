import { slug as toSlug } from 'github-slugger';
import { createTrace } from '@/lib/trace';

import { isPublished } from '../core/is-published';

import { createPipelineContext } from '../pipeline/runtime';
import { buildParsePipeline } from '../pipeline/runtime/build-runtime-pipeline';

import type { ContentItem, ContentCollection, ContentListConfig } from '../core/types';
import { toContentEntity, toContentItem } from '../core/content';

export async function listContent(
  options: {
    collection: ContentCollection;
    config?: ContentListConfig;
  },
  query: {
    type: string;
    action?: string;
  } & Record<string, unknown>,
) {
  const trace = createTrace('content:list');
  try {
    const { collection, config } = options;

    trace.setContext({
      type: query.type,
      action: query.action,
      collection: collection.id,
    });

    trace.mark('REQUEST_RECEIVED');

    const entries = await collection.list();

    trace.mark('COLLECTION_LISTED', {
      totalEntries: entries.length,
    });

    const results: ContentItem[] = [];

    for (const slug of entries) {
      trace.mark('ENTRY_START', { slug });

      const raw = await collection.read(slug);

      if (!raw) {
        trace.mark('ENTRY_SKIPPED_NO_RAW', { slug });
        continue;
      }

      const ctx = createPipelineContext({
        namespace: 'content:list',
        request: {
          type: query.type,
          slug,
        },
        source: raw.source,
        raw,
      });

      trace.mark('PIPELINE_CREATED', { slug });

      const result = await buildParsePipeline(ctx).run(raw);

      trace.mark('PIPELINE_PARSED', {
        slug,
      });

      const entity = Object.freeze(toContentEntity(result));
      const published = isPublished(entity);

      if (!published) {
        trace.mark('ENTRY_SKIPPED_UNPUBLISHED', {
          slug,
        });

        continue;
      }
      const item = toContentItem(entity);

      if (item.title && !item.title.trim()) {
        trace.mark('ENTRY_SKIPPED_EMPTY_TITLE', {
          slug,
        });

        continue;
      }

      if (item.summary && !item.summary.trim()) {
        trace.mark('ENTRY_SKIPPED_EMPTY_SUMMARY', {
          slug,
        });

        continue;
      }

      results.push(item);

      trace.mark('ENTRY_ACCEPTED', {
        slug,
      });
    }

    if (query.action === 'countBy') {
      const by = query.by as string;

      trace.mark('ACTION_COUNT_BY', { by });

      const counts: Record<string, number> = {};

      for (const item of results) {
        const values = item.frontMatter?.[by];

        if (!Array.isArray(values)) continue;

        for (const value of values) {
          const key = toSlug(String(value));
          counts[key] = (counts[key] || 0) + 1;
        }
      }

      trace.mark('ACTION_COUNT_BY_COMPLETE', {
        keys: Object.keys(counts).length,
      });

      trace.end();

      return counts;
    }

    if (query.action === 'filterBy') {
      trace.mark('ACTION_FILTER_BY');

      const filtered = filterFor(query, results);

      trace.mark('ACTION_FILTER_BY_COMPLETE', {
        results: Array.isArray(filtered) ? filtered.length : undefined,
      });

      trace.end();

      return filtered;
    }

    // ─────────────────────────────
    // SORT
    // ─────────────────────────────

    if (config?.sort) {
      trace.mark('SORTING_RESULTS');

      results.sort(config.sort);
    }

    trace.mark('REQUEST_COMPLETE', {
      results: results.length,
    });

    trace.end();

    return results;
  } catch (error) {
    trace.error('Content List', error);

    throw error;
  }
}

function filterFor(query: { type: string; action: string } & Record<string, unknown>, results: ContentItem[]) {
  const items: ContentItem[] = [];

  const by = query.by as string;
  const match = query.match as string;
  const value = toSlug(String(query.value ?? ''));

  for (const item of results) {
    const fieldValue = item.frontMatter?.[by];

    // Array fields (tags, authors, categories, etc)
    if (Array.isArray(fieldValue)) {
      const normalized = fieldValue.map((v) => toSlug(String(v)));

      if (match === 'includes' && normalized.includes(value)) {
        items.push(item);
      }

      continue;
    }

    if (typeof fieldValue === 'string') {
      const normalized = toSlug(fieldValue);

      if (match === 'equals' && normalized === value) {
        items.push(item);
      }

      continue;
    }
  }

  return items;
}
