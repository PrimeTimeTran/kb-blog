'use client'
import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect } from 'react'

import KBSidebar from '@/components/KBSidebar'
import TableOfContents from '@/components/TableOfContents'

import PanelsLayout from '@/layouts/PanelsLayout'

const SCROLL_KEY = 'kb-sidebar-scroll'
const STORAGE_KEY = 'kb-sidebar-open-map'

export default function KBLayout({ toc, children, embedded = false, outline }) {
  const router = useRouter()
  const [openMap, setOpenMap] = useState({})
  const [hydrated, setHydrated] = useState(false)
  const scrollRef = useRef(null)

  // restore scroll on mount / route change
  useEffect(() => {
    const saved = localStorage.getItem(SCROLL_KEY)
    if (!saved) return

    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = Number(saved)
      }
    })
  }, [router.asPath])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScroll = () => {
      localStorage.setItem(SCROLL_KEY, el.scrollTop)
    }

    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!router.isReady) return

    const saved = localStorage.getItem(STORAGE_KEY)
    const savedMap = saved ? JSON.parse(saved) : {}

    const path = router.asPath.replace('/kb/', '').split('/')?.filter(Boolean)

    const routeMap = {}

    let current = ''

    for (const segment of path) {
      current = current ? `${current}/${segment}` : segment
      routeMap[current] = true
    }

    setOpenMap({
      ...savedMap, // user overrides after
      ...routeMap, // route ALWAYS wins for expansion
    })

    setHydrated(true)
  }, [router.isReady, router.asPath])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(openMap))
  }, [openMap])

  if (embedded) {
    return children
  }

  return (
    <PanelsLayout
      left={
        hydrated && (
          <div className="animate-in fade-in duration-200 p-3">
            <KBSidebar node={outline} openMap={openMap} setOpenMap={setOpenMap} />
          </div>
        )
      }
      right={
        <TableOfContents
          toc={toc ?? []}
          className="hidden xl:block p-3 sticky self-start max-h-[calc(100vh-4rem)] overflow-y-auto theme-border-l"
        />
      }
    >
      <article className="prose p-3 dark:prose-invert prose-md flex-1 min-h-0 overflow-y-auto">
        {children}
      </article>
    </PanelsLayout>
  )
}
