import type { ContentCollection, ContentGetConfig, ContentItemResult } from '../types';
import { analyzeContent, toContentEntity, toContentItem } from '../core/content';
import { buildCompilePipeline, buildParsePipeline } from '../pipeline/runtime/build-runtime-pipeline';

import { buildContentIndex } from '@/lib/content/api/build-content-index';
import { createPipelineContext } from '../pipeline/runtime/create-pipeline-context';
import { createTrace } from '@/lib/trace';
import { extractTOC } from '@/lib/content/core/extract-toc';
import { getRootPath } from '@/lib/paths';

export async function getContent(
  options: {
    collection: ContentCollection;
    config?: ContentGetConfig;
  },
  query: {
    type: string;
    slug: string;
  } & Record<string, unknown>,
) {
  const trace = createTrace('content:get');
  const stage = createStage(trace);

  try {
    const { collection, config } = options;
    const { type, slug } = query;

    trace.setContext({
      type,
      slug,
      collection: collection.id,
    });

    trace.mark('REQUEST_RECEIVED');

    if (!type || !slug) {
      trace.warn('INVALID_INPUT', { type, slug });
      return null;
    }

    const raw = await stage(
      'READ_CONTENT',
      () => collection.read(slug),
      (raw) => ({
        found: !!raw,
      }),
    );

    if (!raw) {
      trace.mark('NOT_FOUND', { slug });
      return null;
    }

    const collectionId = collection.id?.replace(/^fs:/, '');

    const rootDir = collectionId ? getRootPath(collectionId) : getRootPath();

    const typeIndex = await stage(
      'BUILD_CONTENT_INDEX',
      () => {
        if (process.env.NODE_ENV === 'test') {
          return {};
        }

        return buildContentIndex({ rootDir });
      },
      (index) => ({
        size: Object.keys(index).length,
      }),
    );

    const analysis = await stage('ANALYZE_CONTENT', () => analyzeContent(raw.raw));

    const ctx = await stage('CREATE_PIPELINE_CONTEXT', () =>
      createPipelineContext({
        request: { type, slug },
        raw,
        index: typeIndex,
        source: raw.source,
        analysis,
      }),
    );

    const parsedCtx = await stage(
      'PARSE_PIPELINE',
      () => buildParsePipeline(ctx).run(raw),
      (parsed) => ({
        published: parsed?.analysis?.published,
      }),
    );

    if (!parsedCtx.published) {
      trace.mark('UNPUBLISHED', { slug });
      return null;
    }

    await stage('COMPILE_PIPELINE', () => buildCompilePipeline(ctx).run());

    const entity = await stage('BUILD_CONTENT_ENTITY', () => toContentEntity(ctx));

    if (config?.includeDrafts) {
      trace.mark('DRAFT_SKIPPED', { slug });
      return null;
    }

    const item = await stage('BUILD_CONTENT_ITEM', () => toContentItem(entity));

    if (config?.filter && !config.filter(item)) {
      trace.mark('FILTERED_OUT', { slug });
      return null;
    }

    const result: ContentItemResult = {
      ...item,
      mdxSource: raw.raw,
      toc: extractTOC(raw.raw),
      Content: ctx.compile!.Content,
    };

    trace.mark('RESULT', {
      type,
      slug,
    });

    return result;
  } catch (err) {
    trace.error('GET_CONTENT_CRASH', err);

    if (err instanceof Error) {
      trace.error('STACK', err.stack);
    }

    throw err;
  } finally {
    trace.end();
  }
}

type MaybePromise<T> = T | Promise<T>;

function createStage(trace: ReturnType<typeof createTrace>) {
  return async function stage<T>(
    name: string,
    fn: () => MaybePromise<T>,
    meta?: (result: T) => Record<string, unknown>,
  ): Promise<T> {
    try {
      const result = await trace.span(name, async () => await fn());

      trace.debug(`${name}_COMPLETE`, meta?.(result));

      return result;
    } catch (err) {
      trace.error(`${name}_FAILED`, err);

      throw err;
    }
  };
}

// async function stage<T>(
//   trace: ReturnType<typeof createTrace>,
//   name: string,
//   fn: () => Promise<T>,
//   meta?: (result: T) => Record<string, unknown>,
// ): Promise<T> {
//   try {
//     const result = await trace.span(name, fn);

//     trace.debug(`${name}_COMPLETE`, meta?.(result));

//     return result;
//   } catch (err) {
//     trace.error(`${name}_FAILED`, err);

//     throw err;
//   }
// }
