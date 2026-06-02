export type FileKind = 'file' | 'folder' | 'source' | 'runtime' | 'seed' | 'unknown';
export type FileRole = 'source' | 'runtime' | 'seed' | 'unknown';

export type FileRecord = {
  relPath: string;
  absPath: string;
  name: string;
  ext: string;
  content: string;
  language?: string;
};

export type VirtualFileSystem = Record<string, VirtualFile>;

export type VirtualFile = {
  kind: FileKind;
  content?: string;
  language?: string;

  absPath: string;
  relPath: string;
  name: string;
  ext: string;
};

export type SeedFileType = 'script' | 'style' | 'html' | 'json' | 'asset';

export type FileDescriptor = {
  type: SeedFileType;
  role: FileRole;
};
export type SeedFile = {
  kind: 'seed';
  path: string;
  content: string;
  relPath: string;
  type: SeedFileType;
};
export type RuntimeAsset = {
  kind: 'runtime';
  type: 'script' | 'html' | 'style';
  path: string;
};

export type FileEntity = SeedFile | RuntimeAsset | VirtualFile;

export type TreeNode = {
  id: string;
  name: string;
  path: string;
  kind: 'file' | 'folder';
  children: TreeNode[];
};

export type TreeViewOptions = {
  hideFiles?: boolean;
  hideFolders?: boolean;
  sort?: (a: TreeNode, b: TreeNode) => number;
  filter?: (node: TreeNode) => boolean;
  node: TreeNode;
};

export type SidebarTreeProps = {
  data: TreeNode[];
  activePath: string | null;
  onSelect: (id: string) => void;
};

export type ManifestOptions = {
  rootDir: string;
  baseUrl?: string;
  include?: RegExp;
};

export type EntrySource = 'runtime' | 'seed' | 'convention' | 'heuristic';
export type ExhibitProjectType = 'vanilla' | 'react' | 'next' | 'vue' | 'nuxt' | 'react-native' | 'flutter';

export type ResolvedEntry = {
  path: string | null;
  source: EntrySource;
};

export type ManifestKind = 'npm' | 'flutter' | 'dart' | 'unknown';

export type RuntimeConfig = {
  framework: ExhibitProjectType;
  entry: string | null;
  assets: SeedFile[];
};

export type SeedConfig = {
  framework: string;
  files: Record<string, SeedFile>;
  filesFlat: SeedFile[];
  entry?: string | null;
};

export type ExhibitManifest = {
  slug: string[];
  root: string;

  kind: ManifestKind;

  files: VirtualFileSystem;
  tree: TreeNode[];

  entries: string[];

  runtime: RuntimeConfig;

  seeds: SeedConfig;

  extensions: string[];

  hasApp: boolean;
  hasPage: boolean;

  projectType: ExhibitProjectType;

  isVirtual?: boolean;
  isPreview?: true;
};

export type VirtualFileSystemAPI = {
  files: VirtualFile;
  activeFile: VirtualFile | null;
  activePath: string | null;

  entrySource: EntrySource;

  createSnapshot: () => {
    files: VirtualFile;
    entry: string;
  };

  handleFileSelect: (path: string) => void;
  updateActiveFileContent: (content: string) => void;
  setActivePath: (path: string) => void;

  syncFullProject: (path: string) => void;
  syncFilePatch: (path: string, content: string) => void;

  getEntryPath: () => string | null;
  getShellContent: () => string | null;
};

export interface TreeItemProps {
  node: TreeNode;
  activePath: string | null;
  onSelect: (id: string) => void;
  depth: number;
  children: TreeNode[];
}

export interface EditorProps {
  vfs?: VirtualFileSystemAPI;
  value: string;
  mode?: string;
  key?: string;
  onChange: (value: string) => void;
  formatter?: (code: string) => Promise<string> | string;
  expanded?: boolean;
  setEditorReady?: (ready: boolean) => void;
  autoHeight?: boolean;
  highlightActiveLine?: boolean;
  showPrintMargin?: boolean;
}

export type WalkOptions<T> = {
  includeExtensions?: string[];
  ignoreDirs?: string[];
  root?: string;

  map: (input: { full: string; relative: string; content: string; name: string; ext: string }) => T;
};
