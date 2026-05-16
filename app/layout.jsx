import { SystemShell } from '@primetimetran/beeline'

import { AppShell } from '@/components/layout/AppShell'
import { siteMetaDataHeader } from '../data/site-metadata-header'

import { ScrollProvider } from '@/providers/ScrollProvider'

export const metadata = siteMetaDataHeader

export default async function AppLayout({ children }) {
  return (
    <html className="h-full">
      <body className="h-full overflow-hidden scroll-smooth absolute inset-0 -z-20 bg-background text-on-background">
        <ScrollProvider>
          <AppShell>
            <div className="flex h-full flex-col ">
              <div className="flex h-full flex-col bg-background text-on-background">
                <div className="flex h-full flex-col bg-background text-on-background">
                  <div className="flex flex-1 min-h-0">{children}</div>
                </div>
              </div>
            </div>
          </AppShell>
        </ScrollProvider>
      </body>
    </html>
  )
}
