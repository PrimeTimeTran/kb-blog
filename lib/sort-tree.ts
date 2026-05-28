export function sortNodes(a, b) {
  // folders first
  if (a.isFolder !== b.isFolder) {
    return a.isFolder ? -1 : 1;
  }

  const aName = a.name.toLowerCase();
  const bName = b.name.toLowerCase();

  // numeric prefix (00-, 01-, etc.)
  const aNum = aName.match(/^(\d+)[.-]/);
  const bNum = bName.match(/^(\d+)[.-]/);

  const aIsNum = !!aNum;
  const bIsNum = !!bNum;

  if (aIsNum && bIsNum) {
    return Number(aNum[1]) - Number(bNum[1]);
  }

  if (aIsNum && !bIsNum) return -1;
  if (!aIsNum && bIsNum) return 1;

  return aName.localeCompare(bName);
}
export function getSortKey(name) {
  const base = name.toLowerCase();

  // extract numeric prefix like "01-"
  const numericMatch = base.match(/^(\d+)-/);

  return {
    isDir: base.includes('/') || !base.includes('.'),
    isNumeric: !!numericMatch,
    numericValue: numericMatch ? parseInt(numericMatch[1], 10) : Infinity,
    name: base,
  };
}
export function printTree(nodes, depth = 0) {
  if (!Array.isArray(nodes)) return;

  const indent = '  '.repeat(depth);

  const sorted = [...nodes].sort(sortNodes);

  for (const node of sorted) {
    console.log(`${indent}${node.isFolder ? '📁' : '📄'} ${node.name}`);

    if (node.children?.length) {
      printTree(node.children, depth + 1);
    }
  }
}
export function normalizeNode(node) {
  if (!node?.children) return node;

  const folders = [];
  const files = [];

  for (const child of node.children) {
    if (child.isFolder) folders.push(child);
    else files.push(child);
  }

  node.children = [...folders, ...files];

  for (const child of node.children) {
    normalizeNode(child);
  }

  return node;
}
export function sortTree(nodes) {
  if (!Array.isArray(nodes)) return nodes;

  const sorted = [...nodes].sort(sortNodes);

  return sorted.map((node) => ({
    ...node,
    children: sortTree(node.children),
  }));
}
