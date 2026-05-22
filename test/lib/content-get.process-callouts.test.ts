import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { preprocessEmbeds } from '@/lib/content/api/transformers';
import { renderCallOuts } from '@/lib/remark/render-callouts';

async function compileMarkdown(rawMarkdown, mockIndex, currentSlug = 'root-page') {
  const preprocessedText = preprocessEmbeds(rawMarkdown, mockIndex, currentSlug);

  const result = await unified()
    .use(remarkParse)
    .use(renderCallOuts)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(preprocessedText);

  return {
    rawProcessedText: preprocessedText,
    html: String(result),
  };
}
const mockIndex = {
  '0.preview/page1': {
    slug: '0.preview/page1',
    title: 'Page 1 Title',
    mdxSource: "# Page 1\nI'm page 1 with no links",
  },
  '0.preview/circular-a': {
    slug: '0.preview/circular-a',
    title: 'Circular A',
    mdxSource: 'Inside A!\n![[circular-b.md]]',
  },
  '0.preview/circular-b': {
    slug: '0.preview/circular-b',
    title: 'Circular B',
    mdxSource: 'Inside B!\n![[circular-a.md]]',
  },
};

describe('Obsidian Callout + Embed Integration Pipeline', () => {
  it('Scenario 1: Basic markdown callouts without embeds operate correctly', async () => {
    const markdown = `
> [!tip]- Tip Callout
> 
> 1. Works in Obsidian
> 2. Works when there is no Embedded content
`;

    const { html } = await compileMarkdown(markdown, mockIndex);

    // Adjusted to match your actual capitalized component string output: <callout
    expect(html).toContain('<callout');
    expect(html).toContain('type="tip"');
    expect(html).toContain('title="Tip Callout"');
    expect(html).toContain('collapsible');
    expect(html).toContain('<li>Works in Obsidian</li>');
  });

  it('Scenario 2: Successfully resolves and processes embeds nested inside callouts', async () => {
    const markdown = `
> [!success]- Success Callout
> Hi there
> ![[page1.md]]
`;

    const { rawProcessedText, html } = await compileMarkdown(markdown, mockIndex);

    // 1. Verify that the raw preprocessor phase successfully found and injected the text properties
    expect(rawProcessedText).toContain('obsidian-embed-container');
    expect(rawProcessedText).toContain('# Page 1');

    // 2. Verify that the HTML compiler tree successfully outputs the callout and the embedded content
    expect(html).toContain('title="Success Callout"');
    expect(html).toContain('Page 1 Title');

    // Change from the escaped entity string back to a normal human-readable string!
    expect(html).toContain("I'm page 1 with no links");
  });

  it('Scenario 3: Sequential callouts block evaluation handles spacing shifts seamlessly', async () => {
    const markdown = `
> [!tip]- Tip Callout
> 1. Item 1
> 2. Item 2

> [!success]- Success Callout
> Hi there
> ![[page1.md]]
`;

    const { html } = await compileMarkdown(markdown, mockIndex);

    // Fixed the Chai engine matcher syntax from .bin.toBe to .toBe
    const calloutMatches = html.match(/<callout/g) || [];
    expect(calloutMatches.length).toBe(2);

    expect(html).toContain('type="tip"');
    expect(html).toContain('type="success"');
  });

  it('Scenario 4: Missing text strings generate capitalized type text headers cleanly', async () => {
    const markdown = `
> [!warning]-
> Pay attention to this text content line!
`;

    const { html } = await compileMarkdown(markdown, mockIndex);

    expect(html).toContain('type="warning"');
    expect(html).toContain('title="Warning"');
    expect(html).toContain('Pay attention to this text content line!');
  });

  it('Scenario 5: Circular nested references trigger safety boundary box instead of infinite looping', async () => {
    const markdown = `
> [!error] Loop Container
> ![[circular-a.md]]
`;

    const { html } = await compileMarkdown(markdown, mockIndex);

    // Capitalized target match alignment
    expect(html).toContain('<callout type="error"');
    expect(html).toContain('Recursive loop blocked:');
    expect(html).toContain('Infinite loop reference to');
  });
});
