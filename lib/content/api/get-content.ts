import type { ContentCollection, ContentGetConfig } from '../core/types';

import { createTrace } from '@/lib/trace';

import { createPipelineContext } from '../pipeline/runtime/create-pipeline-context';
import { buildParsePipeline, buildCompilePipeline } from '../pipeline/runtime/build-runtime-pipeline';
import { buildContentIndex } from './build-content-index';
import { analyzeContent, toContentEntity, toContentItem } from '../core/content';
import { extractTOC } from '../core/extract-toc';

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
      trace.end();
      return null;
    }

    trace.debug('INPUT_VALID');

    const raw = await trace.span('READ_CONTENT', async () => {
      return collection.read(slug);
    });

    trace.debug('CONTENT_READ', {
      found: !!raw,
    });

    if (!raw) {
      trace.mark('NOT_FOUND', { slug });
      trace.end();
      return null;
    }

    const rootDir = collection.id?.replace(/^fs:/, '') ?? process.cwd();

    trace.debug('ROOT_DIR_RESOLVED', {
      rootDir,
    });

    const typeIndex = await trace.span('BUILD_CONTENT_INDEX', async () => {
      if (process.env.NODE_ENV === 'test') {
        return {};
      }

      return buildContentIndex({ rootDir });
    });

    trace.debug('CONTENT_INDEX_READY', {
      size: Object.keys(typeIndex).length,
    });

    const analysis = await trace.span('ANALYZE_CONTENT', async () => {
      return analyzeContent(raw.raw);
    });

    trace.debug('CONTENT_ANALYZED', {
      published: analysis?.published,
    });

    const ctx = await trace.span('CREATE_PIPELINE_CONTEXT', async () => {
      return createPipelineContext({
        request: { type, slug },
        raw,
        index: typeIndex,
        source: raw.source,
        analysis,
      });
    });

    trace.debug('PIPELINE_CONTEXT_CREATED');

    const parsedCtx = await trace.span('PARSE_PIPELINE', async () => {
      return buildParsePipeline(ctx).run(raw);
    });

    trace.debug('PARSE_PIPELINE_COMPLETE', {
      published: parsedCtx?.analysis?.published,
    });

    // if (!parsedCtx.analysis.published) {
    //   trace.mark('NOT_PUBLISHED');
    //   trace.end();
    //   return null;
    // }

    await trace.span('COMPILE_PIPELINE', async () => {
      return buildCompilePipeline(ctx).run();
    });

    trace.debug('COMPILE_PIPELINE_COMPLETE');

    const entity = await trace.span('BUILD_CONTENT_ENTITY', async () => {
      return toContentEntity(ctx);
    });

    trace.debug('CONTENT_ENTITY_CREATED');

    if (config?.includeDrafts) {
      trace.mark('DRAFT_SKIPPED', { slug });
      trace.end();
      return null;
    }

    const item = await trace.span('BUILD_CONTENT_ITEM', async () => {
      return toContentItem(entity);
    });

    trace.debug('CONTENT_ITEM_CREATED');

    if (config?.filter && !config.filter(item)) {
      trace.mark('FILTERED_OUT', { slug });
      trace.end();
      return null;
    }

    const result = {
      ...item,
      mdxSource: raw.raw,
      toc: extractTOC(raw.raw),
      Content: ctx.compile?.Content,
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
