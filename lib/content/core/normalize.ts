import type { ISODateString, Slug } from '../types';

import type { VFSNode } from '@/lib/types';

export function normalizeDate(input: unknown): ISODateString {
  if (!input) return null;

  if (input instanceof Date) {
    return input.toISOString().slice(0, 10);
  }

  if (typeof input === 'string') {
    const d = new Date(input);

    if (isNaN(d.getTime())) {
      return input.slice(0, 10);
    }

    return d.toISOString().slice(0, 10);
  }

  try {
    const d = new Date(input as any);
    return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
  } catch {
    return null;
  }
}

export function normalizeSlug(input: any): Slug {
  if (!input) return '';

  const raw = typeof input === 'string' ? input : input.slug || input.filePath || '';

  return raw
    .replace(/\\/g, '/')
    .replace(/^.*\/data\//, '')
    .replace(/\.(md|mdx)$/, '');
}

export function normalizeFile({
  filePath,
  frontMatter = {},
}: {
  filePath: string;
  frontMatter?: FrontMatterBase;
}): Pick<NormalizedPost, 'slug' | 'filePath' | 'frontMatter'> | null {
  if (typeof filePath !== 'string') return null;

  const slug = filePath
    .replace(/\\/g, '/')
    .replace(/^.*data\/(blog|kb)\//, '')
    .replace(/\.(md|mdx)$/, '');

  if (!slug) return null;

  return {
    slug,
    filePath,
    frontMatter: {
      tags: [],
      ...frontMatter,
    },
  };
}

export function normalizePost(post: Partial<NormalizedPost> & { frontMatter?: FrontMatterBase }): NormalizedPost {
  return {
    slug: post.slug || '',
    filePath: post.filePath || '',

    title: post.title || post.frontMatter?.title || '',
    summary: post.summary || post.frontMatter?.summary || '',

    tags: post.tags || post.frontMatter?.tags || [],

    date: normalizeDate(post.frontMatter?.date),

    isDev: post.isDev ?? post.frontMatter?.isDev ?? false,

    frontMatter: {
      tags: post.frontMatter?.tags || [],
      draft: post.frontMatter?.draft || false,
      date: normalizeDate(post.frontMatter?.date),
      isDev: post.frontMatter?.isDev || false,
    },
  };
}

export function normalizeFrontMatter(fm: FrontMatterBase, slug: string) {
  return {
    slug,
    tags: fm?.tags ?? [],
    date: normalizeDate(fm?.date),
    images: fm?.images ?? [],
    summary: fm?.summary ?? '',
    title: fm?.title ?? 'Untitled',
  };
}

export function normalizeTree(tree: Record<string, any>): VFSNode[] {
  return (Object.values(tree) ?? []).map((node: any) => ({
    name: node.name,

    file: node.file ?? null,

    children: node.children ? normalizeTree(node.children) : [],

    isFolder: !!node.children && Object.keys(node.children).length > 0,
    isFile: Boolean(node.file),
  }));
}
