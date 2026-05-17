'use client'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'
import { ThemeWatcher } from '@/lib/theme/ThemeWatcher'

import { ScrollProvider } from '@/providers/ScrollProvider'
import { LayoutProvider } from '@/providers/LayoutProvider'
import { MobileNavProvider } from '@/providers/MobileNavProvider'

import { AppNavbar, MobileNavbarOnOverlay } from './AppNavbar'
const screens = {
  kb: {
    prompt: 'KB Screen',
  },
  dsa: {
    prompt: 'DSA Screen',
  },
}

export function AppShell({ children }) {
  const basePath = process.env.BASE_PATH || ''
  const pathname = usePathname() || ''
  const pathBaseSegment = pathname.split('/')[1]
  const screen = screens[pathBaseSegment]

  return (
    <div className="flex h-full flex-col">
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

              {/* {false && screen && (
                <div className="fixed bottom-0 left-0 right-0 z-50 h-16 w-screen bg-surface-variant">
                  {screen.prompt}
                </div>
              )} */}
              <MobileNavbarOnOverlay />
            </LayoutProvider>
          </MobileNavProvider>
        </ThemeProvider>
      </ScrollProvider>
    </div>
  )
}
