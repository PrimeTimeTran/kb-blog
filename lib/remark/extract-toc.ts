import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';

export function sanitizeHeadings() {
  return (tree) => {
    visit(tree, 'heading', (node, index, parent) => {
      const text = toString(node).trim();
      // remove empty headings
      if (!text) {
        parent.children.splice(index, 1);
        return;
      }

      // normalize weird numeric-only headings if you want
      if (/^\d+\.?$/.test(text)) {
        node.data ||= {};
        node.data.hProperties ||= {};
        node.data.hProperties.className = 'toc-number';
      }
    });
  };
}

export function extractTOC() {
  return (tree, _) => {
    const headings = [];
    const slugger = new GithubSlugger();

    visit(tree, 'heading', (node) => {
      const value = toString(node);

      if (!value) return;

      const depth = Math.max(0, node.depth - 1);

      headings.push({
        depth,
        value,
        url: `#${slugger.slug(value)}`,
      });
    });

    tree.data = tree.data || {};
    tree.data.toc = headings;
  };
}
