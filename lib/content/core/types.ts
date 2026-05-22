export type Slug = string;
export type ISODateString = string | null;
export type ContentType = 'blog' | 'kb' | 'authors' | 'terms' | (string & {});

export interface ContentEntity {
  raw: RawContent;
  frontMatter: FrontMatter;
  source: ResolvedContentSource;
  request: ContentRequest;

  body: string;

  stats?: RawContent['stats'];
}

/**
 * UI / blog-ready projection (safe to render)
 */
export interface ContentItem {
  slug: Slug;
  filePath: string;

  title: string;
  summary: string;
  tags: string[];

  date: ISODateString;
  isDev: boolean;
  frontMatter: Pick<FrontMatter, 'tags' | 'images' | 'date' | 'title' | 'summary' | 'isDev'>;
}

/**
 * Raw markdown + metadata as parsed from filesystem
 */
export interface RawContent {
  source: ResolvedContentSource;
  raw: string;

  stats?: {
    size?: number;
    modifiedAt?: Date;
  };
}

/**
 * Canonical frontmatter AFTER parsing, BEFORE business rules
 */
export interface FrontMatter {
  title?: string;
  summary?: string;
  tags?: string[];
  date?: ISODateString;
  images?: string[];

  /**
   * If true → explicitly excluded from production unless includeDrafts
   */
  draft?: boolean;

  /**
   * Dev-only content toggle
   */
  isDev?: boolean;
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
  Content?: unknown;
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
    Content?: unknown;
  };

  diagnostics: unknown[];
  artifacts: Record<string, unknown>;
}

export interface TreeNode {
  name: string;
  file: string | null;
  children: TreeNode[];
  isFolder: boolean;
  isFile: boolean;
}

export interface ContentSource {
  id: string;

  list(type: string): Promise<string[]>;

  resolve(input: ContentRequest): Promise<ResolvedContentSource | null>;

  read(source: ResolvedContentSource): Promise<RawContent>;
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
  filter?: (item: ContentItem) => boolean;
};

export type ContentListConfig = {
  includeDrafts?: boolean;

  requireTitle?: boolean;
  requireSummary?: boolean;

  filter?: (item: ContentItem) => boolean;
  sort?: (a: ContentItem, b: ContentItem) => number;
};
