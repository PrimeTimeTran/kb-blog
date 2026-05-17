import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import { ThemeWatcher } from '@/lib/theme/ThemeWatcher'

import { LayoutProvider } from '@/providers/LayoutProvider'
import { ScrollProvider } from '@/providers/ScrollProvider'
import { MobileNavProvider } from '@/providers/MobileNavProvider'

import { AppNavbar, MobileNavbarOnOverlay } from './AppNavbar'

export async function AppShell({ children }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <ScrollProvider>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${basePath}/static/favicons/loi-tran.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/static/favicons/loi-tran.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${basePath}/static/favicons/loi-tran.png`}
        />
        <link rel="mask-icon" href={`${basePath}/static/favicons/loi-tran.png`} />
        <meta name="msapplication-TileColor" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeWatcher />
        <MobileNavProvider>
          <LayoutProvider>
            <AppNavbar />
            {children}
            <MobileNavbarOnOverlay />
          </LayoutProvider>
        </MobileNavProvider>
      </ThemeProvider>
    </ScrollProvider>
  )
}
