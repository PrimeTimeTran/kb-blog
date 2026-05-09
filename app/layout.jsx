import { Space_Grotesk } from 'next/font/google'
import { SystemShell } from '@primetimetran/beeline'
import { AppShell } from '../components/layout/AppShell'
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
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className='mx-4'>
        <RouteSync />
        <AppShell>
          <SystemShell isDebug>
            <div className='pt-8'>{children}</div>
          </SystemShell>
        </AppShell>
      </body>
    </html>
  )
}
