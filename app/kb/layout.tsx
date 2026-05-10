import LayoutClient from './LayoutClient'
import { getKbTree } from '../../lib/content/server/kb.server'

export default async function Layout({ children }) {
  const data = await getKbTree()

  return <LayoutClient data={data}>{children}</LayoutClient>
}
