import { BlogSidebarLeft, BlogContent } from '@/components/blog'
import TableOfContents from '@/components/TableOfContents'

import PanelsLayout from './PanelsLayout'

export default function BlogLayout(props) {
  const { authorDetails, prev, next, toc, slug, fileName, tags } = props.frontMatter

  return (
    <PanelsLayout
      left={
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
      }
      right={<TableOfContents toc={toc} className="h-full overflow-y-auto theme-border-l p-3" />}
    >
      <BlogContent
        toc={toc}
        // frontMatter={frontMatter}
        // className="flex-6 min-w-0 h-full overflow-y-auto p-3 scrollbar"
      >
        {/* {children} */}
      </BlogContent>
    </PanelsLayout>
  )
}
