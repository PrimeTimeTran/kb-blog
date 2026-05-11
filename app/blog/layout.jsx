import { BlogSidebarLeft, BlogContent } from '../../components/blog'

export default function Layout({ children }) {
  // const { authorDetails, prev, next, toc, slug, fileName, tags } = props.frontMatter

  return (
    <div>
      {children}
    </div>
  )
}
