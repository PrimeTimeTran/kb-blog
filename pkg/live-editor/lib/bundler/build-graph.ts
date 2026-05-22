import { parseImports } from './parse-imports';

export type ModuleGraph = Record<
  string,
  {
    code: string;
    deps: string[];
  }
>;

export function buildGraph(vfs: Record<string, string>): ModuleGraph {
  const graph: ModuleGraph = {};

  for (const file in vfs) {
    const code = vfs[file];

    graph[file] = {
      code,
      deps: parseImports(code),
    };
  }

  return graph;
}
