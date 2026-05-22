import { extractTOC } from '../core/extract-toc';
import { extractHeadings } from '@/lib/remark/extract-headings';

import { ContentEntity, ContentItem, PipelineContext } from './types';

export function analyzeContent(source) {
  return {
    toc: extractTOC(source),
    headings: extractHeadings(source),
  };
}

export function toContentItem(entity: ContentEntity): ContentItem {
  const fm = entity.frontMatter;

  return {
    slug: entity.source.slug,
    filePath: entity.source.filePath,

    title: fm.title ?? '',
    summary: fm.summary ?? '',
    tags: fm.tags ?? [],
    date: fm.date ?? '',
    isDev: !!fm.isDev,

    frontMatter: {
      tags: fm.tags,
      images: fm.images,
      date: fm.date,
      title: fm.title,
      summary: fm.summary,
      isDev: fm.isDev,
    },
  };
}

export function toContentEntity(ctx: PipelineContext): ContentEntity {
  return {
    request: ctx.request,
    source: ctx.source,
    raw: ctx.raw,
    frontMatter: ctx.frontMatter!,
    body: ctx.content!,
  };
}
