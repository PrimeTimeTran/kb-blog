import { ContentSource } from './source/contracts';
import type { MDXContent } from 'mdx/types';

export type { ContentSource };

export type Slug = string;
export type ISODateString = string | null;
export type ContentType = 'blog' | 'kb' | 'authors' | 'terms' | (string & {});
export type FrontMatterParsed = Pick<FrontMatter, 'tags' | 'images' | 'date' | 'title' | 'summary' | 'isDev'>;

export interface FrontMatter {
  title?: string;
  summary?: string;
  tags?: string[];
  date?: ISODateString;
  images?: string[];
  draft?: boolean;
  isDev?: boolean;
}
export interface ContentEntity {
  raw: RawContent;
  frontMatter: FrontMatter;
  source: ResolvedContentSource;
  request: ContentRequest;

  body: string;

  stats?: RawContent['stats'];
}
export interface BaseContentItem {
  filePath: string;
  isDev: boolean;
  title: string;
  slug: Slug;
  summary: string;
  tags: string[];
  date: ISODateString;
  frontMatter: FrontMatterParsed;
}

export interface ContentItemResult extends BaseContentItem {
  mdxSource: string;

  toc: {
    depth: 1 | 2 | 3 | 4 | 5 | 6;
    value: string;
    url: string;
  }[];

  Content: MDXContent;
}
export interface RawContent {
  source: ResolvedContentSource;
  raw: string;

  stats?: {
    size?: number;
    modifiedAt?: Date;
  };
}

export interface ContentRequest {
  type: ContentType;
  slug: Slug;
}
export interface ResolvedContentSource {
  id: string;

  type: ContentType;
  slug: Slug;

  filePath: string;
  extension: string;

  source: 'filesystem' | (string & {});
}
export interface AnalysisArtifacts {
  toc: unknown[];
  backlinks: unknown[];
}
export interface TransformArtifacts {
  ast: unknown | null;
}
export interface CompileArtifacts {
  code?: string;
  Content?: MDXContent;
}
export interface Diagnostic {
  level: 'info' | 'warn' | 'error';
  message: string;
  code?: string;
  meta?: Record<string, unknown>;
}
export interface PipelineContext {
  request: ContentRequest;
  source: ResolvedContentSource;
  raw: RawContent;

  content?: string;
  frontMatter?: FrontMatter;

  index: Record<string, unknown>;
  analysis: Record<string, unknown>;

  headings?: unknown;

  transform: {
    ast: unknown;
  };

  compile: {
    code?: string;
    Content: MDXContent;
  };

  diagnostics: unknown[];
  artifacts: Record<string, unknown>;
}
export interface VFSNode {
  name: string;
  file: string | null;
  children: VFSNode[];
  isFolder: boolean;
  isFile: boolean;
}
export interface ContentCollection {
  id: string;

  list(): Promise<string[]>;

  read(slug: string): Promise<RawContent | null>;
}
export type ContentClientConfig = {
  root: string;
  filters?: {
    list?: (item: ContentEntity) => boolean;
    get?: (item: ContentEntity) => boolean;
  };
};
export type ContentRegistryItem = Record<string, ContentSource>;
export interface ContentRegistryEntry {
  type: string;
  source: ContentSource;
}
export interface ContentRegistry {
  get(type: string): ContentCollection | null;
}
export type ContentGetConfig = {
  includeDrafts?: boolean;
  filter?: (item: BaseContentItem) => boolean;
};
export type ContentListConfig = {
  includeDrafts?: boolean;

  requireTitle?: boolean;
  requireSummary?: boolean;

  filter?: (item: BaseContentItem) => boolean;
  sort?: (a: BaseContentItem, b: BaseContentItem) => number;
};
