import { TreeNode, VirtualFS, VirtualFile } from '@/lib/types';

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
    [x: string]: VirtualFile;
  };
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
  files: VirtualFS;
  activeFile: VirtualFile | null;
  activePath: string | null;
  entrySource: EntrySource;
  createSnapshot: () => {
    files: VirtualFS;
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
  node: TreeNode;
  activePath: string | null;
  onSelect: (id: string) => void;
  depth: number;
  children: TreeNode[]; // ALWAYS array (never optional)
}
