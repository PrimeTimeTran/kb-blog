import 'prismjs'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'

import siteMetadata from '@/data/site-metadata'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProviders } from './theme-providers'

import { RegistryProvider } from '@/lib/providers/RegistryProvider'
import ScrollSpyWrapper from '@/components/providers/ScrollSpyWrapper'
import { buildKbRegistry } from '@/lib/content/server/kb.server'

import { AppShell } from '@/components/layout/AppShell'

import { SystemShell } from '../packages/docksystem/src'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata = {
  authors: [{ name: 'Loi Tran' }],
  creator: 'Loi Tran',
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  themeColor: '#0f172a',
  icons: {
    icon: [
      { url: '/public/static/favicons/favicon.ico' },
      { url: '/public/static/images/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png' }],
    shortcut: ['/public/static/favicons/favicon.ico'],
  },
}
// route: dock-system 1.a DockSystem wraps client
export default async function RootLayout({ children }) {
  const registry = await buildKbRegistry()

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProviders>
          <RegistryProvider registry={registry}>
            <ScrollSpyWrapper>
              <AppShell>
                <SystemShell isDebug>{children}</SystemShell>
              </AppShell>
            </ScrollSpyWrapper>
          </RegistryProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
