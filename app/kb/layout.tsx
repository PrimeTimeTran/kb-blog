// app/kb/layout.tsx
import { KBLayout } from '@/layouts/ThreeColumnLayout'
import { getKbTree } from '@/lib/content/domain/kb/kb.server'

export default async function Layout({ children }) {
  const tree = await getKbTree()
  return <KBLayout tree={tree}>{children}</KBLayout>
}
