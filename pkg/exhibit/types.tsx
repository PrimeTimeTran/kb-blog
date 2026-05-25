export interface EditorProps {
  manifest: object;
}

export type VirtualFile = {
  content: string;
  language: string;
};

export type VirtualFS = Record<string, VirtualFile>;

export type ExhibitProjectType = 'vanilla' | 'next' | 'react' | 'nuxt' | 'vue';

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

export type vfsAPI = {
  files: VirtualFS;
  activePath: string;
  activeFile: {
    content: string;
    language: string;
  };
  handleFileSelect: (path: string) => void;
  updateActiveFileContent: (newContent: string) => void;
  setActivePath: (path: string) => void;
};

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
