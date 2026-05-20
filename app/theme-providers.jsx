'use client'

import { ThemeProvider } from '@teispace/next-themes'
import siteMetadata from '../data/site-metadata'

export function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
