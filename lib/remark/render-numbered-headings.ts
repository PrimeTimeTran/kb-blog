export interface KbTreePlugin {
  name: string;
  apply(tree: any): any;
}

export function numberingPlugin(): KbTreePlugin {
  return {
    name: 'numbering',

    apply(tree) {
      function walk(nodes, prefix = []) {
        return Object.values(nodes).map((node: any, i: number) => {
          const number = [...prefix, i + 1];
          const label = number.join('.');

          return {
            ...node,
            label: `${label} ${node.name}`,
            children: walk(node.children || {}, number),
          };
        });
      }

      return walk(tree);
    },
  };
}

export function applyKbPlugins(tree, plugins: KbTreePlugin[] = []) {
  return plugins.reduce((acc, plugin) => {
    return plugin.apply(acc);
  }, tree);
}
