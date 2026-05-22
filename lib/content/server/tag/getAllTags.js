import kebabCase from '../../../utils/kebab-case';

export async function getAllTags(type) {
  const { getAllFrontMatter } = await import('../../../content/server/blog.server');

  const posts = await getAllFrontMatter(type);

  const tagCount = {};

  for (const post of posts) {
    if (post.draft) continue;
    if (!Array.isArray(post.tags)) continue;

    for (const tag of post.tags) {
      const formatted = kebabCase(tag);
      tagCount[formatted] = (tagCount[formatted] || 0) + 1;
    }
  }

  return tagCount;
}
