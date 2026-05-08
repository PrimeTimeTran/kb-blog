import { BlogSidebarLeft, BlogContent } from '@/components/blog'
// import TableOfContents from '@/components/TableOfContents'

export default function BlogLayout(props) {
  const { authorDetails, prev, next, toc, slug, fileName, tags } = props.frontMatter

  return (
    <div>
      <aside className="flex-3 min-w-0 flex h-full overflow-hidden p-3">
        <BlogSidebarLeft
          authorDetails={authorDetails}
          tags={tags}
          prev={prev}
          next={next}
          slug={slug}
          fileName={fileName}
        />
      </aside>
      <BlogContent
        toc={toc}
        // frontMatter={frontMatter}
        // className="flex-6 min-w-0 h-full overflow-y-auto p-3 scrollbar"
      >
        {/* {children} */}
      </BlogContent>
    </div>
  )
}
