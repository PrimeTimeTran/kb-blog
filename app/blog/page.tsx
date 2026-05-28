import siteMetadata from '@/data/site-metadata';
import ListLayout from '@/layouts/ListLayout';
import { POSTS_PER_PAGE } from '@/data/constants';
import { content } from '@/lib/content/api/client';

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default async function Page() {
  const posts = await content.list({ type: 'blog' });

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);

  return (
    <ListLayout
      posts={initialDisplayPosts}
      pagination={{
        currentPage: 1,
        totalPages,
      }}
      title="All Posts"
    />
  );
}
