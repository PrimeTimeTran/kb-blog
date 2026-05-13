// 'use client'
// import { createContext, useContext, useRef, useState } from 'react'

// type MDXContextValue = {
//   tree?: any
//   toc?: any[]
//   slug?: string
//   analysis?: {}
//   numbering?: any[]
//   value: any
// }

// const MDXContext = createContext<MDXContextValue | null>(null)

// export function MDXProvider({
//   toc,
//   slug,
//   tree,
//   analysis,
//   children,
//   ...value
// }: {
//   tree?: any
//   toc?: any[]
//   slug?: string
//   analysis?: any
//   children: React.ReactNode
// }) {
//   return (
//     <MDXContext.Provider value={{ tree, toc, slug, analysis, value }}>
//       {children}
//     </MDXContext.Provider>
//   )
// }

// export function usePageMdx() {
//   const ctx = useContext(MDXContext)
//   if (!ctx) {
//     throw new Error('usePageMdx must be used within MDXProvider')
//   }
//   return ctx
// }
