import 'katex/dist/katex.min.css'
import '../css/tailwind.css'

// import { SystemShell } from '@primetimetran/beeline'
import { AppShell } from '@/components/layout/AppShell'
import { siteMetaDataHeader } from '../data/site-metadata-header'

export const metadata = siteMetaDataHeader

export default async function AppLayout({ children }) {
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
            <div className="flex flex-1 min-h-0 pt-16">{children}</div>
          </div>
          {/*
            CONTEXT: GLOBAL SCROLL CAPTURE
            Requires specific root structure to work on "deeply" nested children.
            Used by:
              - Navigation progress bar
              - Graffiti background
              - Table of contents indicator
            CONTEXT:
            New pages that dont use BasePage must use these classes to 
            restore page scroll
            h-full w-full overflow-y-scroll
          */}
          {/* Option 1: Scroll Capture: Minimum Structure  */}
          {/* <div className="flex h-full flex-col">
            <div className="flex flex-1 min-h-0">{children}</div>
          </div> */}
          {/* Option 2: Scroll Capture: Nested (Example)  
              ! DO NOT DELETE Option 2 without verifying 
              scroll spy continues working across home, kb, blog post screens.
          */}
          {/* <div className="flex h-full flex-col">
            <div className="flex h-full flex-col">
              <div className="flex h-full flex-col">
                <div className="flex flex-1 min-h-0">{children}</div>
              </div>
            </div>
          </div> */}
        </AppShell>
      </body>
    </html>
  )
}
// <html>
//   <body>
//     <AppShell>
//       <div className="flex h-full flex-col">
//         <div className="flex flex-1 min-h-0">{children}</div>
//       </div>
//     </AppShell>
//   </body>
// </html>
