'use client';

import type { LucideIcon } from 'lucide-react';

// https://prismic.io/blog/css-background-effects
// - Awesome navbar
// - Nav links may have a dropdown panel
// - Hover drops down the panel unless there is already a panel expanded in which card the animation goes from left to right or vice versa

import * as Brief from '@/components/Brief';
import { SafeLink as Link } from '@/mdx/Link';

export function DropdownPanel({ item, scheduleClose }) {
  function renderLeft() {
    return (
      <div className="flex flex-col w-[380px]  border-r border-lowest shrink-0 ">
        {/* HEADER */}
        <div className="px-6 py-6 bg-linear-to-b from-level/40 to-transparent border-b border-lowest">
          <div className="flex items-center gap-4">
            {item.icon && (
              <div className="flex h-11 w-11 bg-level rounded-2xl border border-lowest shadow-[0_0_0_1px_rgba(255,255,255,0.03)] relative items-center justify-center">
                {/* subtle glow core */}
                <div className="bg-primary/10 rounded-2xl opacity-0 transition-opacity absolute inset-0 blur-xl duration-300 group-hover:opacity-100" />

                <item.icon className="h-5 w-5 text-on-surface relative" />
              </div>
            )}

            <div className="min-w-0">
              <div className="text-sm font-medium text-on-surface tracking-tight">{item.label}</div>

              <div className="mt-0.5 text-xs text-on-surface-muted">{item.description}</div>
            </div>
          </div>
        </div>

        {/* LINKS */}
        <div className="flex flex-col flex-1 p-3 gap-2">
          {item.links.map(
            ({
              href,
              title,
              description,
              icon: Icon,
            }: {
              href: string;
              title: string;
              description: string;
              icon: LucideIcon;
            }) => {
              if (!Icon) return null;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={scheduleClose}
                  className="p-3 bg-level/40 rounded-2xl border border-transparent transition-all group relative duration-200 ease-out hover:bg-level hover:border-lowest hover:-translate-y-px hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                >
                  {/* left accent line */}
                  <div className="w-[2px] bg-primary/0 rounded-full transition-all absolute left-0 top-3 bottom-3 group-hover:bg-primary/60 duration-200" />

                  <div className="flex pl-1 items-start gap-3">
                    {/* ICON */}
                    <div className="flex h-10 w-10 bg-low rounded-xl border border-lowest transition-all items-center justify-center duration-200 group-hover:bg-level group-hover:border-primary/20">
                      <Icon className="h-4 w-4 text-on-surface-muted transition-colors duration-200 group-hover:text-on-surface" />
                    </div>

                    {/* TEXT */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-on-surface transition-transform duration-200 group-hover:translate-x-0.5">
                        {title}
                      </div>

                      <div className="mt-1 text-xs leading-relaxed text-on-surface-muted">{description}</div>
                    </div>
                  </div>
                </Link>
              );
            },
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-4 text-[11px] tracking-wide text-on-surface-muted bg-linear-to-t from-level/30 to-transparent border-t border-lowest">
          Experimental runtime systems
        </div>
      </div>
    );
  }
  function renderRight() {
    function rightContent() {
      return (
        <div className="flex h-full p-6 relative items-center justify-center">
          <div className="overflow-hidden h-[520px] w-full bg-level rounded-[28px] border border-lowest shadow-2xl">
            {/* TOP BAR */}
            <div className="flex h-12 px-4 bg-low/70 border-b border-lowest items-center gap-2">
              <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />
              <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />
              <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />

              <div className="ml-3 px-2 py-1 text-[11px] text-on-surface-muted bg-level rounded-md border border-lowest">
                {item.featured?.title ?? item.label}
              </div>
            </div>

            {/* EXHIBIT */}
            <div className="h-[calc(100%-48px)] w-full">
              <Brief.BriefExhibit />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 overflow-hidden bg-lowest relative">
        <div className="bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[48px_48px] pointer-events-none opacity-[0.03] absolute inset-0" />
        {rightContent()}
      </div>
    );
  }
  return (
    <div
      key={item.label}
      className="overflow-hidden w-full bg-lowest border border-lowest shadow-2xl shrink-0 transition-all duration-300 will-change-transform"
    >
      <div className="flex">
        {renderLeft()}
        {renderRight()}
      </div>
    </div>
  );
}
