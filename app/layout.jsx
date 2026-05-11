import { Space_Grotesk } from 'next/font/google'
import { SystemShell } from '@primetimetran/beeline'
import { AppShell } from '@/components/layout/AppShell'
import { siteMetaDataHeader } from '../data/site-metadata-header'
import { RouteSync } from './RouteSync'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata = siteMetaDataHeader

export default async function RootLayout({ children }) {
  return (
    <html
      lang={metadata.language}
      className={`${space_grotesk.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden">
        <RouteSync />
        <AppShell>
          <div className="px-4 h-full">
            <SystemShell isDebug>
              <div className="h-full overflow-y-auto pt-16">{children}</div>
            </SystemShell>
          </div>
        </AppShell>
      </body>
    </html>
  )
}
