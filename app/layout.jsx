import siteMetadata from '@/data/site-metadata'
import { Space_Grotesk } from 'next/font/google'
import { ThemeProviders } from './theme-providers'
import { RegistryProvider } from '@/lib/providers/RegistryProvider'
import ScrollSpyWrapper from '@/components/providers/ScrollSpyWrapper'

import { buildKbRegistry } from '@/lib/content/server/kb.server'
import { AppShell } from '@/components/layout/AppShell'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata = {
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default async function RootLayout({ children }) {
  const registry = await buildKbRegistry()

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        <div className="flex flex-col h-screen w-full overflow-hidden p-2">
          <ThemeProviders>
            <AppShell>
              <ScrollSpyWrapper>
                <RegistryProvider registry={registry}>
                  <main className="flex-1 min-h-0">{children}</main>
                </RegistryProvider>
              </ScrollSpyWrapper>
            </AppShell>
          </ThemeProviders>
        </div>
      </body>
    </html>
  )
}
