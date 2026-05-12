/* ─────────────────────────────────────────────
   CORE REQUEST + SOURCE TYPES
───────────────────────────────────────────── */

export interface ContentRequest {
  type: ContentType
  slug: Slug
}
export type ContentType = 'blog' | 'kb' | 'authors' | 'terms' | (string & {})

export interface ResolvedContentSource {
  id: string

  type: ContentType
  slug: Slug

  filePath: string
  extension: string

  source: 'filesystem' | (string & {})
}

export interface RawContent {
  source: ResolvedContentSource
  raw: string

  stats?: {
    size?: number
    modifiedAt?: Date
  }
}

/* ─────────────────────────────────────────────
   PIPELINE ARTIFACTS
───────────────────────────────────────────── */

export interface AnalysisArtifacts {
  toc: unknown[]
  backlinks: unknown[]
}

export interface TransformArtifacts {
  ast: unknown | null
}

export interface CompileArtifacts {
  code?: string
  Content?: unknown
}

/* ─────────────────────────────────────────────
   DIAGNOSTICS
───────────────────────────────────────────── */

export interface Diagnostic {
  level: 'info' | 'warn' | 'error'
  message: string
  code?: string
  meta?: Record<string, unknown>
}

/* ─────────────────────────────────────────────
   FRONTMATTER (STRUCTURED — IMPORTANT FIX)
───────────────────────────────────────────── */

export interface FrontMatter {
  title?: string
  summary?: string
  tags?: string[]
  date?: ISODateString
  images?: string[]
  draft?: boolean
  isDev?: boolean
}

/* ─────────────────────────────────────────────
   PIPELINE CONTEXT
───────────────────────────────────────────── */

export interface PipelineContext {
  raw: RawContent
  request: ContentRequest
  source: ResolvedContentSource
  index?: Record<string, unknown>
  frontMatter?: FrontMatter

  compile: CompileArtifacts
  analysis: AnalysisArtifacts
  transform: TransformArtifacts

  diagnostics: Diagnostic[]
  artifacts: Record<string, unknown>
}

/* ─────────────────────────────────────────────
   SOURCE ABSTRACTION
───────────────────────────────────────────── */

export interface ContentSource {
  id: string
  source: ResolvedContentSource['source']

  resolve(input: ContentRequest): Promise<ResolvedContentSource | null>
  read(source: ResolvedContentSource): Promise<RawContent>

  /**
   * Collection-level listing (blog/kb/authors/etc)
   */
  list(input: { type: ContentType }): Promise<ResolvedContentSource[]>
}

/* ─────────────────────────────────────────────
   PRIMITIVES
───────────────────────────────────────────── */

export type ISODateString = string | null
export type Slug = string

/* ─────────────────────────────────────────────
   NORMALIZED CONTENT ENTITY (SINGLE SOURCE OF TRUTH)
───────────────────────────────────────────── */

export interface ContentItem {
  slug: Slug
  filePath: string

  title: string
  summary: string
  tags: string[]

  date: ISODateString
  isDev: boolean

  frontMatter: FrontMatter
}

/* ─────────────────────────────────────────────
   TREE STRUCTURE
───────────────────────────────────────────── */

export interface TreeNode {
  name: string
  file: string | null
  children: TreeNode[]
  isFolder: boolean
  isFile: boolean
}

export interface ContentCollectionSource {
  id: string

  source: ResolvedContentSource['source']

  /**
   * Returns all available entries (not raw slugs anymore)
   */
  list(input: { type: ContentType }): Promise<ResolvedContentSource[]>

  /**
   * Resolve a single item in the collection
   */
  resolve(input: ContentRequest): Promise<ResolvedContentSource | null>

  /**
   * Read raw content for a resolved source
   */
  read(source: ResolvedContentSource): Promise<RawContent>
}

export type ContentClientConfig = {
  root: string
  filters?: {
    list?: (item: ContentItem) => boolean
    get?: (item: ContentItem) => boolean
  }
}

export type ContentListConfig = {
  includeDrafts?: boolean
  filter?: (item: ContentItem) => boolean
  sort?: (a: ContentItem, b: ContentItem) => number
}

export interface ContentSource {
  id: string
  resolve(input: ContentRequest): Promise<ResolvedContentSource | null>
  read(source: ResolvedContentSource): Promise<RawContent>
  list(type: string): Promise<string[]>
}

export interface ContentCollection {
  id: string
  rootDir: string
  list(): Promise<string[]>
  read(slug: string): Promise<RawContent>
}
export type ContentRegistryItem = Record<string, ContentSource>

export interface ContentRegistryEntry {
  type: string
  source: ContentSource
}

export interface ContentRegistry {
  get(type: string): ContentCollection | null
}

export type ContentGetConfig = {
  includeDrafts?: boolean
  filter?: (item: ContentItem) => boolean
}
