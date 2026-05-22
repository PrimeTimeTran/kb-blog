export type Framework = 'react' | 'next' | 'react-native' | 'flutter';
export type ProjectSpec = {
  id: string;

  entry: string;

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
