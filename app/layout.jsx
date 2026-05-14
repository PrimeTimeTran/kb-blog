import { SystemShell } from '@primetimetran/beeline'

import { Space_Grotesk } from 'next/font/google'
import { AppShell } from '@/components/layout/AppShell'
import { siteMetaDataHeader } from '../data/site-metadata-header'

import { AppNavbar } from '@/components/layout/AppNavbar'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata = siteMetaDataHeader

export default async function AppLayout({ children }) {
  return (
    <html lang={metadata.language} className={`${space_grotesk.variable}`} suppressHydrationWarning>
      <body className="h-full overflow-hidden">
        <AppShell>
          <div className="h-screen flex flex-col">
            <AppNavbar />
            <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
          </div>
        </AppShell>
      </body>
    </html>
  )
}
