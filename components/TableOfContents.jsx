/**
 * ============================
 *  TOC / DATA CONTRACT LESSON
 * ============================
 *
 * Root problem:
 * - UI debugging was misled by silent data shape drift
 * - "title" vs "value", "level" vs "depth" mismatches
 * - No runtime validation → system failed silently in UI layer
 * - Result: unnecessary debugging of layout, templates, providers
 *
 * Key insight:
 * - This was NOT a rendering or Next.js issue
 * - It was a missing "data contract boundary"
 * - React correctly rendered invalid/empty data
 *
 * ----------------------------
 *  WHAT ACTUALLY FIXES THIS
 * ----------------------------
 *
 * 1. Schema validation at boundaries (CRITICAL)
 *    - Validate data immediately after fetch (e.g. Zod)
 *    - Ensures TOC structure is always correct
 *    Benefit:
 *      → prevents silent shape drift
 *      → fails at source, not in UI
 *
 * 2. Fail-fast runtime guards
 *    - Throw errors when required fields are missing
 *    - Example: missing `value`, `url`, `depth`
 *    Benefit:
 *      → immediate crash instead of corrupted UI
 *      → forces early correction
 *
 * 3. Strict TypeScript types (not optional, but not sufficient alone)
 *    - Define explicit TOCItem, KBItem types
 *    - Avoid `any` or implicit inference from APIs
 *    Benefit:
 *      → compile-time safety
 *      → prevents accidental renames like title/value
 *
 * 4. Runtime invariant logging (dev-only)
 *    - Assert expected shape in development
 *    - Example: console.assert(item.value)
 *    Benefit:
 *      → early detection of contract drift
 *      → faster debugging without layout investigation
 *
 * 5. Centralized logging system (already implemented)
 *    - Namespace-based logger (mdx, content, embed, etc.)
 *    - Configurable log levels + debug toggles
 *    Benefit:
 *      → replaces scattered console.log debugging
 *      → allows "intentional observability" instead of noise
 *      → separates "debug now" vs "inspect later"
 *
 * ----------------------------
 *  DESIGN PRINCIPLE
 * ----------------------------
 *
 * Always enforce this rule:
 *
 *   "If data crosses a module boundary → validate it"
 *
 * Because:
 * - UI bugs are often data contract bugs in disguise
 * - Layout systems (Next.js / React) only expose the symptom
 * - The real issue is almost always upstream data shape drift
 *
 * ----------------------------
 *  WHY THIS MATTERS
 * ----------------------------
 *
 * Without this discipline:
 * - debugging shifts into layout / rendering / framework complexity
 * - incorrect assumptions about React/Next behavior emerge
 * - time is wasted on architectural red herrings
 *
 * With this discipline:
 * - failures happen early and loudly
 * - UI becomes predictable
 * - debugging becomes data-focused instead of structural
 *
 * ============================
 */

'use client'

import { getHeadingClass } from '@/lib/theme/theme.cjs'
import { useScroll } from '../providers/ScrollSpyProvider'

function TOCItem({ item, activeId }) {
  const isActive = activeId === item.url

  const level = item.depth ?? 1
  const indent = (level - 1) * 16
  const colorClass = getHeadingClass(level)
  return (
    <div
      className={`border-l-2 transition ${isActive
        ? 'border-blue-500 bg-blue-500/10'
        : 'border-transparent hover:bg-white/5'
        }`}
      style={{ paddingLeft: `${indent}px` }}
    >
      <a
        href={item.url}
        className={`block w-full truncate px-2 py-1 transition ${colorClass
          } ${isActive
            ? 'font-bold text-zinc-500 dark:text-zinc-100'
            : ''
          }`}
      >
        {item.value}
      </a>
    </div>
  )
}
export default function TableOfContents({ toc = [] }) {
  const { activeId } = useScroll()

  if (toc.length === 0) {
    return <div>Empty TOC</div>
  }

  return (
    <aside>
      {toc.map((item) => (
        <TOCItem key={item.url} item={item} activeId={activeId} />
      ))}
    </aside>
  )
}
