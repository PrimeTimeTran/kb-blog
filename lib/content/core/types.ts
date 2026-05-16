export type Slug = string
export type ISODateString = string | null
export type ContentType = 'blog' | 'kb' | 'authors' | 'terms' | (string & {})

export interface ContentRequest {
  type: ContentType
  slug: Slug
}

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

export interface Diagnostic {
  level: 'info' | 'warn' | 'error'
  message: string
  code?: string
  meta?: Record<string, unknown>
}
export interface FrontMatter {
  title?: string
  summary?: string
  tags?: string[]
  date?: ISODateString
  images?: string[]
  draft?: boolean
  isDev?: boolean
}
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

export interface TreeNode {
  name: string
  file: string | null
  children: TreeNode[]
  isFolder: boolean
  isFile: boolean
}

export interface ContentSource {
  id: string

  list(type: string): Promise<string[]>

  resolve(input: ContentRequest): Promise<ResolvedContentSource | null>

  read(source: ResolvedContentSource): Promise<RawContent>
}

export interface ContentCollection {
  id: string

  list(): Promise<string[]>

  read(slug: string): Promise<RawContent | null>
}

export type ContentClientConfig = {
  root: string
  filters?: {
    list?: (item: ContentItem) => boolean
    get?: (item: ContentItem) => boolean
  }
}

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

export type ContentListConfig = {
  includeDrafts?: boolean

  requireTitle?: boolean
  requireSummary?: boolean

  filter?: (item: ContentItem) => boolean
  sort?: (a: ContentItem, b: ContentItem) => number
}
