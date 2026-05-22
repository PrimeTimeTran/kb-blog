import { visit } from 'unist-util-visit';

export function renderCallOuts() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      if (!node.children || node.children.length === 0) return;

      // 1. Locate the absolute first text container node inside the blockquote
      let firstParagraph = node.children[0];
      if (firstParagraph.type !== 'paragraph' || !firstParagraph.children) return;

      let firstTextNode = firstParagraph.children[0];
      if (!firstTextNode || firstTextNode.type !== 'text') return;

      // 2. Safe, precise regex matching for Obsidian's callout structure
      // Matches: [!type] or [!type]- optionally followed by a space and a custom title
      const calloutRegex = /^\[!(\w+)\](-)?(?:\s+(.*))?$/;

      // We check the first line string value
      const lines = firstTextNode.value.split('\n');
      const firstLine = lines[0].trim();
      const match = firstLine.match(calloutRegex);

      if (!match) return; // Not an Obsidian callout block, skip safely

      const [, type, hyphen, explicitTitle] = match;
      const isCollapsible = hyphen === '-';

      // Determine the final title string to display
      // If no title is given explicitly, capitalize the type name (e.g., "tip" -> "Tip")
      const finalTitle = explicitTitle || type.charAt(0).toUpperCase() + type.slice(1);

      // 3. CLEAN UP THE AST (Consume the callout definition string completely)
      if (lines.length > 1) {
        // If there were other lines packed inside this first text node, keep them!
        lines.shift();
        firstTextNode.value = lines.join('\n');
      } else if (firstParagraph.children.length > 1) {
        // If there are other inline formatting nodes (like bold, links) on that same line
        firstParagraph.children.shift();
      } else {
        // Entire first paragraph was just the callout token line, safely drop it completely
        node.children.shift();
      }

      // 4. TRANSFORM TO MDX COMPONENT NODES
      node.data = node.data || {};
      node.data.hName = 'CallOut';
      node.data.hProperties = {
        type: type.toLowerCase(),
        title: finalTitle,
        collapsible: isCollapsible,
        collapsed: isCollapsible,
      };
    });
  };
}
