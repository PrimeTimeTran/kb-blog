export type VirtualFile = {
  content: string;
  language: string;
};

export type VirtualFS = Record<string, VirtualFile>;
export type EntrySource = 'runtime' | 'seed' | 'convention' | 'heuristic';
export type ExhibitProjectType = 'vanilla' | 'next' | 'react' | 'nuxt' | 'vue';

export type ResolvedEntry = {
  path: string | null;
  source: EntrySource;
};

export interface EditorProps {
  manifest: object;
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
    shell: any;
    framework: string;
    files: SeedFile[];
    entry?: string | null;
  };
  extensions: string[];
  hasApp: boolean;
  hasPage: boolean;
  projectType: 'vanilla' | 'next' | 'react' | 'nuxt' | 'vue';
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

export interface TreeNode {
  name: string;
  path: string;
  isFolder: boolean;
  children: Record<string, TreeNode>;
}

export interface SidebarProps {
  vfs: vfsAPI;
  files: Record<string, any>;
  activePath: string;
}

export interface FileNodeProps {
  node: TreeNode;
  activePath: string;
  onSelect: (path: string) => void;
  depth: number;
}
