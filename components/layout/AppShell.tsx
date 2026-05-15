import { ThemeProvider } from 'next-themes'

import 'katex/dist/katex.min.css'
import '../../css/tailwind.css'

import { ThemeProviders } from '../../app/theme-providers'

import { ScrollProvider } from '@/providers/ScrollProvider'
import { LayoutProvider } from '@/providers/LayoutProvider'
import { ThemeWatcher } from '@/lib/theme/ThemeWatcher'

export async function AppShell({ children }) {
  // const registry = await buildKbRegistry()
  const basePath = process.env.BASE_PATH || ''
  return (
    <>
      {/* <RegistryProvider registry={registry}> */}
      {/* <ThemeProviders> */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeWatcher />
        <LayoutProvider>
          <ScrollProvider>
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
            <link rel="manifest" href={`${basePath}/static/favicons/loi-tran.png`} />
            <link
              rel="mask-icon"
              href={`${basePath}/static/favicons/loi-tran.png`}
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
            <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
            {children}
          </ScrollProvider>
        </LayoutProvider>
      </ThemeProvider>
      {/* </ThemeProviders> */}
      {/* </RegistryProvider> */}
    </>
  )
}
