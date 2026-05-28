import { describe, it, expect } from 'vitest';
import { preprocessObsidianLinks } from '@/lib/content/core/preprocess-obsidian-links';

const index = {
  'react-context': {
    path: 'react-context',
    title: 'React Context',
  },
  'blog/react/hooks/useState': {
    path: 'blog/react/hooks/useState',
    title: 'useState Hook',
  },
  architecture: {
    path: 'architecture',
    title: 'System Architecture',
  },
};

describe('obsidian preprocessing', () => {
  it('resolves simple wikilinks', () => {
    const input = 'See [[react-context]] for details';

    const out = preprocessObsidianLinks(input, index);

    expect(out).toContain('/kb/react-context');
    expect(out).not.toContain('[[react-context]]');
  });

  it('resolves nested wikilinks with folders', () => {
    const input = 'Read [[blog/react/hooks/useState]]';

    const out = preprocessObsidianLinks(input, index);

    expect(out).toContain('/kb/blog/react/hooks/useState');
  });

  it('preserves alias text', () => {
    const input = 'See [[react-context|React Context Guide]]';

    const out = preprocessObsidianLinks(input, index);

    expect(out).toContain('React Context Guide');
    expect(out).toContain('/kb/react-context');
  });

  it('does not resolve missing entries but removes raw brackets', () => {
    const input = 'See [[does-not-exist]]';

    const out = preprocessObsidianLinks(input, index);

    expect(out).toContain('does-not-exist');
    expect(out).not.toContain('[[does-not-exist]]');
  });

  it('never emits raw wiki syntax in final output', () => {
    const input = '[[react-context]] and [[architecture]]';

    const out = preprocessObsidianLinks(input, index);

    expect(out).not.toMatch(/\[\[.*?\]\]/);
  });

  it('normalizes all links to /kb prefix', () => {
    const input = '[[react-context]]';

    const out = preprocessObsidianLinks(input, index);

    expect(out).toContain('/kb/react-context');
  });

  it('handles repeated wikilinks consistently', () => {
    const input = '[[react-context]] and again [[react-context]]';

    const out = preprocessObsidianLinks(input, index);

    const matches = out.match(/\/kb\/react-context/g) || [];
    expect(matches.length).toBe(2);
  });

  it('does not break headings', () => {
    const input = '# [[react-context]]';

    const out = preprocessObsidianLinks(input, index);

    expect(out.startsWith('#')).toBe(true);
    expect(out).not.toContain('[[react-context]]');
  });

  it('ignores asset-like links (png, jpg, etc)', () => {
    const input = '![image]([[diagram.png]])';

    const out = preprocessObsidianLinks(input, index);

    expect(out).toContain('diagram.png');
    expect(out).not.toContain('/kb/diagram.png');
  });

  it('does not modify frontmatter-like text', () => {
    const input = `---
title: [[react-context]]
---`;

    const out = preprocessObsidianLinks(input, index);

    expect(out).toContain('title:');
  });
});
