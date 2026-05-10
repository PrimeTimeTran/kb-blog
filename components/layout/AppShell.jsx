// Latex support
import 'katex/dist/katex.css'
import 'katex/dist/katex.min.css'

// Core languages
import 'prismjs'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'

import '../../css/prism.css'
import '../../css/tailwind.css'

import '../../css/app.css'
import '../../css/theme.css'

import { ThemeProviders } from '../../app/theme-providers'

import { RegistryProvider } from '../../lib/providers/RegistryProvider'
import { ScrollSpyProvider } from '../../providers/ScrollSpyProvider'
import { buildKbRegistry } from '../../lib/content/server/kb.server'
import { LayoutProvider } from '../../providers/LayoutProvider';

import { Navbar } from '../../components/layout/AppNavbar'

export async function AppShell({ children }) {
  const registry = await buildKbRegistry()
  const basePath = process.env.BASE_PATH || ''
  return (
    <>
      <RegistryProvider registry={registry}>
        <ThemeProviders>
          <LayoutProvider>
            <ScrollSpyProvider>
              <link
                rel="apple-touch-icon"
                sizes="76x76"
                href={`${basePath}/static/favicons/apple-touch-icon.png`}
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href={`${basePath}/static/favicons/favicon-32x32.png`}
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href={`${basePath}/static/favicons/favicon-16x16.png`}
              />
              <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
              <link
                rel="mask-icon"
                href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
                color="#5bbad5"
              />
              <meta name="msapplication-TileColor" content="#000000" />
              <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
              <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
              <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
              <Navbar />
              {children}
            </ScrollSpyProvider>
          </LayoutProvider>
        </ThemeProviders>

      </RegistryProvider>
    </>

  )
}
