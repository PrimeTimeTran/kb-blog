import { TagBlock, NavBlock, BackToBlog, AuthorBlock } from './blocks';

export default function BlogSidebarLeft({ authorDetails, tags, prev, next, slug }) {
  return (
    <div className="p-6">
      <AuthorBlock authors={authorDetails} />

      <TagBlock tags={tags} />

      <NavBlock prev={prev} next={next} />

      <BackToBlog />
    </div>
  );
}
