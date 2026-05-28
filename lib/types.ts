export type VFSFile = {
  content: string;
  language?: string;
};

export type VFS = {
  files: Record<string, VFSFile>;
};

export type VirtualFile = {
  content: string;
  language: string;
};

export type VirtualFS = Record<string, VirtualFile>;

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
export type SidebarTreeType = {
  data: TreeNode[];
  activePath: string | null;
  onSelect: (id: string) => void;
};
