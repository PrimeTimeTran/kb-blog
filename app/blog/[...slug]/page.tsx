import { Layout3ColumnCenter, Layout3ColumnLeft, Layout3ColumnRight } from '@/components/layout/ThreeColumnLayout';

import { BlogContent } from '@/components/blog';
import type { ComponentType } from 'react';
import type { MDXContent } from 'mdx/types';
import TableOfContents from '@/components/TableOfContents';
import { content } from '@/lib/content/api/client';
import { notFound } from 'next/navigation';

type PostType = {
  Content: MDXContent;
};

export async function generateStaticParams() {
  const posts = await content.list({ type: 'blog' });

  return (posts ?? [])
    .filter((p) => !p.draft)
    .map((p) => ({
      slug: p.slug.split('/'),
    }));
}

export default async function BlogPage({ params, posts }) {
  const { slug } = await params;

  const normalizedSlug = Array.isArray(slug) ? slug.join('/') : slug;

  const Post: PostType | null = await content.get({
    type: 'blog',
    slug: normalizedSlug,
  });

  if (!Post) {
    notFound();
  }

  const { toc, frontMatter } = Post;

  return (
    <Layout3ColumnLeft
      leftCol={
        <div className=" w-128">
          {/* <div className=" w-128">
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className="h-20 border">
                item {i}
              </div>
            ))}
          </div> */}
        </div>
      }
    >
      <Layout3ColumnRight rightCol={<TableOfContents toc={toc} />}>
        <Layout3ColumnCenter>
          <BlogContent toc={toc} frontMatter={frontMatter}>
            <Post.Content />
          </BlogContent>
        </Layout3ColumnCenter>
      </Layout3ColumnRight>
    </Layout3ColumnLeft>
  );
}
