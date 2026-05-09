import { Dock, DockShell } from '@primetimetran/beeline'
import { BlogSidebarLeft, BlogContent } from '../../components/blog'
// import TableOfContents from '../components/TableOfContents'

export default function Layout({ children }) {
  // const { authorDetails, prev, next, toc, slug, fileName, tags } = props.frontMatter

  return (
    <div>
      <DockShell left={<h1>hi</h1>} right={<div>Right</div>}>
      {children}
      </DockShell>
    </div>
  )
}
