import { SystemShell } from '@primetimetran/beeline'

import { Space_Grotesk } from 'next/font/google'
import { AppShell } from '@/components/layout/AppShell'
import { siteMetaDataHeader } from '../data/site-metadata-header'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata = siteMetaDataHeader

export default async function Layout({ children }) {
  return (
    <html
      lang={metadata.language}
      className={`${space_grotesk.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden">
        <AppShell>
          <SystemShell isDebug>
            <div className="h-full overflow-y-auto px-4">{children}</div>
          </SystemShell>
        </AppShell>
      </body>
    </html>
  )
}
