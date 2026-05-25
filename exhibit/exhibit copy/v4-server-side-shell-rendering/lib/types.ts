export type VFS = Record<string, string>;
export type Framework = 'react' | 'next' | 'react-native' | 'flutter';
export type ProjectSpec = {
  id: string;

  entry: string;
  framework: string;

  files: Record<string, string>;

  /**
   * optional: what files should be shown first
   */
  focus?: string;

  /**
   * optional: groups like "5 ways to build infinite scroll"
   */
  modules?: Record<
    string,
    {
      entry: string;
      files: string[];
    }
  >;
};

export type Snapshot = {
  files: Record<string, string>;
  entry: string;
};
