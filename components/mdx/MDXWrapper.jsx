'use client'
import { useEffect } from 'react'
import Prism from 'prismjs'

/**
 * 1. BASE DEPENDENCIES
 * These MUST come first. JSX and TSX rely on these being present.
 */
import 'prismjs/components/prism-markup' // HTML tags
import 'prismjs/components/prism-javascript' // Standard JS
import 'prismjs/components/prism-typescript' // Standard TS

/**
 * 2. COMPOSITE LANGUAGES
 * These extend the base languages above.
 */
import 'prismjs/components/prism-jsx' // Needs markup + javascript
import 'prismjs/components/prism-tsx' // Needs jsx + typescript

/**
 * 3. STANDALONE LANGUAGES
 * These can generally go anywhere after the core Prism import.
 */
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-rust'

export default function MDXWrapper({ children }) {
  useEffect(() => {
    // We check for window to be safe, though 'use client' + useEffect
    // already ensures we are on the client side.
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [children]) // Re-run if content changes

  return <div className="mdx-content">{children}</div>
}
