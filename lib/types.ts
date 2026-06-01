export type VFS = Record<string, VFSFile>;
export type VFSFile = {
  content?: string;
  language?: string;
  absPath: string;
  relPath: string;
  name: string;
  ext: string;
};
export type VFSNode = {
  id: string;
  name: string;
  path: string;
  kind: 'file' | 'folder';
  isFolder?: boolean;
  isFile?: boolean;
  children: VFSNode[];
};
export type TreeViewOptions = {
  hideFiles?: boolean;
  hideFolders?: boolean;
  sort?: (a: VFSNode, b: VFSNode) => number;
  filter?: (node: VFSNode) => boolean;
  node: VFSNode;
};
export type SidebarTreeType = {
  data: VFSNode[];
  activePath: string | null;
  onSelect: (id: string) => void;
};
export type ManifestOptions = {
  rootDir: string;
  baseUrl?: string;
  include?: RegExp;
};
export type EntrySource = 'runtime' | 'seed' | 'convention' | 'heuristic';
export type ExhibitProjectType = 'vanilla' | 'next' | 'react' | 'nuxt' | 'vue';
export type ResolvedEntry = {
  path: string | null;
  source: EntrySource;
};
export interface EditorProps {
  vfs?: vfsAPI;
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
export type ExhibitManifest = {
  slug: string[];
  root: string;
  files: {
    [x: string]: VFS;
  };
  tree: any;
  entries: string[];
  runtime: {
    framework: ExhibitProjectType;
    entry: string | null;
    assets: ExhibitRuntimeAsset[];
  };
  seeds: {
    framework: string;
    files: SeedFile[];
    entry?: string | null;
  };
  extensions: string[];
  hasApp: boolean;
  hasPage: boolean;
  projectType: ExhibitProjectType;
};
export type ExhibitRuntimeAsset = {
  type: 'html' | 'script' | 'style';
  path: string;
};
export type ExhibitRuntime = {
  framework: ExhibitProjectType;
  entry: string | null;
  assets: ExhibitRuntimeAsset[];
};
export interface vfsAPI {
  files: VFSFile;
  activeFile: VFS | null;
  activePath: string | null;
  entrySource: EntrySource;
  createSnapshot: () => {
    files: VFSFile;
    entry: string;
  };
  handleFileSelect: (path: string) => void;
  updateActiveFileContent: (content: string) => void;
  setActivePath: (path: string) => void;
  syncFullProject: (path: string) => void;
  syncFilePatch: (path: string, content: string) => void;
  getEntryPath: () => string | null;
  getShellContent: () => string | null;
}
export type SeedFile = {
  path: string;
  content: string;
  type: 'script' | 'html' | 'style' | 'json' | 'asset';
};
export type FrameworkSeeds = {
  framework: string;
  files: SeedFile[];
  entry?: string | null;
};
export interface TreeItemProps {
  node: VFSNode;
  activePath: string | null;
  onSelect: (id: string) => void;
  depth: number;
  children: VFSNode[];
}
