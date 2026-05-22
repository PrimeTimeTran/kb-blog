import { describe, it, expect } from 'vitest';
import { createTestClient } from './content-fixture';

describe('content invariants', () => {
  it('never exposes draft content via API', async () => {
    const content = createTestClient({
      secret: `---
draft: true
title: Secret
summary: Hidden
date: 2026-01-01
---`,
    });

    const result = await content.get({
      type: 'blog',
      slug: 'secret',
    });

    expect(result).toBeNull();
  });

  it('enforces publish rules strictly (missing draft is NOT published)', async () => {
    const content = createTestClient({
      safe: `---
title: No Draft Field
summary: OK
date: 2026-01-01
---`,
    });

    const result = await content.get({
      type: 'blog',
      slug: 'safe',
    });

    expect(result).toBeNull();
  });
});
