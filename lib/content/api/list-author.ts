import matter from 'gray-matter';

import { filesystemSource } from '../source/fs';

export async function listAuthor() {
  const files = await filesystemSource.list?.({ type: 'authors' });

  if (!files) return [];

  const authors = [];

  for (const file of files) {
    const source = await filesystemSource.resolve({
      type: 'authors',
      slug: file,
    });

    if (!source) continue;

    const raw = await filesystemSource.read(source);

    const { data } = matter(raw.raw);

    authors.push({
      id: source.slug,
      name: data.name ?? '',
      bio: data.bio ?? '',
      avatar: data.avatar ?? '',
      links: data.links ?? {},
    });
  }

  return authors;
}
