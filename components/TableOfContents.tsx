'use client';
import React, { useEffect } from 'react';
import { getHeadingColor } from '@/lib/theme/theme.cjs';
import { useScroll } from '@/providers/ScrollProvider';
import { TOCItemData, useTableOfContents } from '@/hooks/useTOC';
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

export default function TableOfContents({ toc }: { toc: TOCItemData[] }) {
  const { activeId, setToc } = useScroll();

  const { itemRefs, getItemState } = useTableOfContents(toc, activeId);

  useEffect(() => {
    setToc(toc);
  }, [toc, setToc]);

  if (!toc?.length) {
    return <div>Empty TOC</div>;
  }

  return (
    <aside className="max-h-screen overflow-y-auto text-xs">
      {toc.map((item, index) => {
        const { isActive, isPassed } = getItemState(index, item);

        return (
          <TOCItem
            key={item.url}
            item={item}
            index={index}
            isActive={isActive}
            isPassed={isPassed}
            ref={(el) => {
              if (el) itemRefs.current.set(item.url, el);
            }}
          />
        );
      })}
    </aside>
  );
}

type TOCItemProps = {
  item: TOCItemData;
  index: number;
  isActive: boolean;
  isPassed: boolean;
};

export const TOCItem = React.forwardRef<HTMLDivElement, TOCItemProps>(({ item, isActive, isPassed }, ref) => {
  const level = item.depth ?? 1;
  const indent = (level - 1) * 16;
  const colorClass = getHeadingColor(level);

  return (
    <div
      ref={ref}
      className={`
          py-0.5 px-2 text-xs transition-all w-full text-left flex items-center hover:bg-primary/5
          ${isActive ? 'border-l-2' : ''}
        `}
      style={{
        paddingLeft: `${indent}px`,
        borderColor: isActive ? 'var(--primary)' : 'var(--outline-variant)',
        backgroundColor: isActive ? 'var(--primary-container)' : undefined,
        opacity: isPassed ? 0.45 : 1,
      }}
    >
      <a
        href={item.url}
        className={`
            block w-full truncate px-2 py-1.5 text-sm normal-case font-normal no-underline tracking-normal m-0
            ${colorClass}
            ${isActive ? 'font-bold text-on-primary-container' : 'text-on-surface-variant'}
          `}
      >
        {item.value}
      </a>
    </div>
  );
});

TOCItem.displayName = 'TOCItem';
