import 'katex/dist/katex.min.css';
import '../css/tailwind.css';

import { AppShell } from '@/components';
import { Metadata } from 'next/dist/types';
import { siteMetaDataBase } from '../data/site-metadata-header';

export const dynamic = 'force-dynamic';
// NOTE:
// Instead of messing with layout.tsx structure frequency,
// Create a new root project root to experiment and export from layout.tsx
// to skip dependencies and try new things out quickly.
export default RootLayout;

export function RootLayout({ children }) {
  return (
    // CONTEXT: GLOBAL STYLING STRATEGY
    // We support two approaches styling html:

    // Option A — Tailwind's Inline Convention (quick / explicit / local reasoning)
    // <body className="h-full overflow-hidden scroll-smooth absolute inset-0 -z-20 bg-background text-on-background">

    // Option B — CSS Layer Architecture (Tailwind-based)
    //   @theme { ... }
    //   @layer base { ... }
    //   @layer components { ... }
    //   @layer utilities { ... }

    //   Centralized styling via Tailwind layers in /css:

    //   styles/theme.css        → design tokens only (@theme)
    //   styles/base.css         → html, body, resets (@layer base)
    //   styles/layout.css       → app shell + structural layout (@layer components)
    //   styles/utilities.css    → helpers + small reusable utilities
    //   styles/animations.css   → keyframes + motion utilities
    //   styles/vendors.css      → third-party overrides
    //   styles/app.css          → final overrides / app-specific fixes

    // tailwind.css acts as the composition entry point:
    //   - @tailwind base / components / utilities
    //   - imports theme + layered css in correct order

    // Why Option B:
    //   - keeps layout concerns out of JSX
    //   - enforces consistent design tokens + surface system
    //   - aligns with Tailwind layering model
    //   - reduces duplication across routes/layouts
    //   - makes global changes predictable (body, surfaces, typography)

    // CONTEXT: suppressHydrationWarning
    // We must due this because we of know issue with Theme Provider by Next
    // If we implement "theme save"  then server and client can't resolve theme/dom.
    // Required here and ThemeProvider (in AppShell)
    <html suppressHydrationWarning>
      <body>
        <AppShell>
          <div className="flex flex-col h-full">
            <div className="flex flex-1 min-h-0 pt-16">
              {children}
              {/* app layer (workspace system) */}
              {/* <div className="absolute inset-0 pointer-events-none">
                <FixedOverlayRespectingNavbar />
              </div> */}
            </div>
          </div>
        </AppShell>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  ...siteMetaDataBase,
  metadataBase: new URL('https://kb-blog-primetimetran.vercel.app'),

  title: {
    default: 'Loi Tran',
    template: '%s | Loi Tran',
  },

  keywords: ['software engineering', 'web development', 'programming', 'blog'],

  authors: [{ name: 'Loi Tran' }],

  openGraph: {
    title: 'Loi Tran',
    description: 'Personal blog about software engineering, systems, and learning in public.',
    type: 'website',
    siteName: 'Loi Tran',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Loi Tran',
    description: 'Personal blog about software engineering, systems, and learning in public.',
  },

  robots: {
    index: true,
    follow: true,
  },
};
