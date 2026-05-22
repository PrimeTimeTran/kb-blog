// import { describe, it, expect } from 'vitest';
// import { preprocessEmbeds } from '@/lib/content/api/transformers'; // Update if needed!
import { describe, it, expect } from 'vitest';
import { preprocessEmbeds } from '@/lib/content/api/transformers';

describe('preprocessEmbeds pipeline tests', () => {
  const mockRegistry = {
    '0.mdx-pipeline-preview/0.page1': {
      slug: '0.preview/page1',
      title: 'Preview: Page 1',
      mdxSource: '# Page 1\nContent of page 1',
    },
    '0.mdx-pipeline-preview/0.page2': {
      slug: '0.preview/page2',
      title: 'Preview: Page 2',
      mdxSource: '# Page 2\nI contain an embed!\n![[page3.md]]',
    },
    '0.mdx-pipeline-preview/0.page3': {
      slug: '0.preview/page3',
      frontMatter: { title: 'Custom Frontmatter Page 3 Title' },
      mdxSource: '# Page 3\nNothing interesting',
    },
    '0.mdx-pipeline-preview/0.theme1': {
      slug: '0.preview/theme1',
      title: 'Theme 1 Config',
      mdxSource: 'Tailwind surfaces configuration data.',
    },
    '0.mdx-pipeline-preview/0.circular-a': {
      slug: '0.preview/circular-a',
      title: 'Circular A',
      mdxSource: 'Inside A!\n![[circular-b.md]]',
    },
    '0.mdx-pipeline-preview/0.circular-b': {
      slug: '0.preview/circular-b',
      title: 'Circular B',
      mdxSource: 'Inside B!\n![[circular-a.md]]',
    },
  };

  it('successfully resolves basic embeds and generates an interactive disclosure dropdown', () => {
    const rawSource = `
- ![[page3.md]]
- ![[0.preview/page1.md]]
    `.trim();

    const normalized = preprocessEmbeds(rawSource, mockRegistry, '0.preview/page1');

    expect(normalized).toContain('<details class="obsidian-embed-container');
    expect(normalized).toContain('<summary class="embed-header');
    expect(normalized).toContain('embed-link');
    expect(normalized).toContain('Custom Frontmatter Page 3 Title');
    expect(normalized).toContain('Preview: Page 1');
    expect(normalized).toContain('href="/kb/0.preview/page3"');
    expect(normalized).toContain('href="/kb/0.preview/page1"');
    expect(normalized).toContain('Nothing interesting');
    expect(normalized).toContain('Content of page 1');
  });

  it('safely passes through missing file links without breaking the compilation bundle', () => {
    const rawSource = `
- ![[does-not-exist.md]]
- ![[0.preview/page3.md]]
    `.trim();

    const normalized = preprocessEmbeds(rawSource, mockRegistry, '0.preview/page1');

    expect(normalized).toContain('![[does-not-exist.md]]');
    expect(normalized).toContain('Custom Frontmatter Page 3 Title');
  });

  it('trips the recursion circuit breaker to prevent infinite engine memory loops', () => {
    const rawSource = `![[circular-a.md]]`;

    const normalized = preprocessEmbeds(rawSource, mockRegistry, '0.preview/root');

    expect(normalized).toContain('Inside A!');
    expect(normalized).toContain('Inside B!');
    expect(normalized).toContain('Recursive loop blocked');
    expect(normalized).toContain('Circular A');
  });

  // --- NEW ADVANCED INTEGRATION PATHS ---

  it('successfully parses embeds nested inside Obsidian callout blockquote formatting', () => {
    const rawSource = `
> [!success]- Success Callout
> ![[theme1.md]]
    `.trim();

    const normalized = preprocessEmbeds(rawSource, mockRegistry, '0.preview/page1');

    // The callout syntax wrappers must remain intact for the MDX compiler stage
    expect(normalized).toContain('> [!success]- Success Callout');

    // The inner file must be successfully unpacked inside the blockquote body string
    expect(normalized).toContain('<details class="obsidian-embed-container');
    expect(normalized).toContain('Theme 1 Config');
    expect(normalized).toContain('Tailwind surfaces configuration data.');
  });

  it('preserves clean resolution layout rules when embeds are deeply indented or inside list objects', () => {
    const rawSource = `
* Parent List Level
    * Nested List Level
        * ![[theme1.md]]
    `.trim();

    const normalized = preprocessEmbeds(rawSource, mockRegistry, '0.preview/page1');

    expect(normalized).toContain('* Parent List Level');
    expect(normalized).toContain('Theme 1 Config');
    expect(normalized).toContain('Tailwind surfaces configuration data.');
  });
});

// describe('preprocessEmbeds pipeline tests', () => {
//   const mockRegistry = {
//     '0.mdx-pipeline-preview/0.page1': {
//       slug: '0.preview/page1',
//       title: 'Preview: Page 1',
//       mdxSource: '# Page 1\nContent of page 1',
//     },
//     '0.mdx-pipeline-preview/0.page2': {
//       slug: '0.preview/page2',
//       title: 'Preview: Page 2',
//       mdxSource: '# Page 2\nI contain an embed!\n![[page3.md]]',
//     },
//     '0.mdx-pipeline-preview/0.page3': {
//       slug: '0.preview/page3',
//       frontMatter: { title: 'Custom Frontmatter Page 3 Title' },
//       mdxSource: '# Page 3\nNothing interesting',
//     },
//     '0.mdx-pipeline-preview/0.circular-a': {
//       slug: '0.preview/circular-a',
//       title: 'Circular A',
//       mdxSource: 'Inside A!\n![[circular-b.md]]',
//     },
//     '0.mdx-pipeline-preview/0.circular-b': {
//       slug: '0.preview/circular-b',
//       title: 'Circular B',
//       mdxSource: 'Inside B!\n![[circular-a.md]]',
//     },
//   };

//   it('successfully resolves basic embeds and generates an interactive disclosure dropdown', () => {
//     const rawSource = `
// - ![[page3.md]]
// - ![[0.preview/page1.md]]
//     `.trim();

//     const normalized = preprocessEmbeds(rawSource, mockRegistry, '0.preview/page1');

//     // 1. Verify UI Layout Elements are injected cleanly
//     expect(normalized).toContain('<details class="obsidian-embed-container');
//     expect(normalized).toContain('<summary class="embed-header');
//     expect(normalized).toContain('embed-link');

//     // 2. Verify titles are successfully resolved (from frontmatter or title keys)
//     expect(normalized).toContain('Custom Frontmatter Page 3 Title');
//     expect(normalized).toContain('Preview: Page 1');

//     // 3. Verify clean dynamic link resolution (accounting for the stripped leading 0.)
//     expect(normalized).toContain('href="/kb/0.preview/page3"');
//     expect(normalized).toContain('href="/kb/0.preview/page1"');

//     // 4. Verify original nested text payloads are flattened into the page container body
//     expect(normalized).toContain('Nothing interesting');
//     expect(normalized).toContain('Content of page 1');
//   });

//   it('safely passes through missing file links without breaking the compilation bundle', () => {
//     const rawSource = `
// - ![[does-not-exist.md]]
// - ![[0.preview/page3.md]]
//     `.trim();

//     const normalized = preprocessEmbeds(rawSource, mockRegistry, '0.preview/page1');

//     // Missing links must be preserved raw as safe literal fallbacks
//     expect(normalized).toContain('![[does-not-exist.md]]');

//     // Sibling assets inside the same file context should continue compiling normally
//     expect(normalized).toContain('Custom Frontmatter Page 3 Title');
//   });

//   it('trips the recursion circuit breaker to prevent infinite engine memory loops', () => {
//     const rawSource = `![[circular-a.md]]`;

//     const normalized = preprocessEmbeds(rawSource, mockRegistry, '0.preview/root');

//     // Depth 0 (File A) content must load completely
//     expect(normalized).toContain('Inside A!');

//     // Depth 1 (Nested File B) content must load completely
//     expect(normalized).toContain('Inside B!');

//     // Depth 2 Loop Back (File B referencing File A again) catches the visited signature warning
//     expect(normalized).toContain('Recursive loop blocked');
//     expect(normalized).toContain('Circular A');
//   });
// });
