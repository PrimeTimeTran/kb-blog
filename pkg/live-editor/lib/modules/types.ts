import { Framework } from '../types';

export type ModuleFile = {
  id: string;
  path: string;
  code: string;
};
export type VProject = Record<string, VFile>;
export type VFile = {
  path: string;
  code: string;
  type: 'react' | 'next' | 'flutter';
  imports?: string[];
};
export type BootArtifact = {
  framework: Framework;
  files: Record<string, string>;
  entry: string;
  importMap: Record<string, string>;
};
