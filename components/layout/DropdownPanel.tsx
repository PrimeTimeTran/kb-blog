'use client';

import * as Brief from '@/components/Brief';

import React, { useEffect } from 'react';

import { SafeLink as Link } from '@/mdx/Link';
import { getFeatureFlags } from '@/lib/feature-flags';
import { usePathname } from 'next/navigation';

// https://prismic.io/blog/css-background-effects
// - Awesome navbar
// - Nav links may have a dropdown panel
// - Hover drops down the panel unless there is already a panel expanded in which card the animation goes from left to right or vice versa

export function DropdownPanel({ item, scheduleClose }) {
  function NavIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-level shadow-sm">
        <Icon className="h-5 w-5 shrink-0" />
      </div>
    );
  }
  const pathname = usePathname();

  useEffect(() => {
    scheduleClose();
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') {
      e.preventDefault();
      return;
    }
  };

  function renderLeft() {
    return (
      <div className="flex flex-col w-95 bg-surface shrink-0">
        <div className="px-8 py-8 bg-linear-to-b from-level/60 to-transparent border-b border-outline/40">
          <div className="flex items-center gap-5">
            {item.icon && (
              <div className="flex h-14 w-14 bg-level shadow-sm rounded-3xl items-center justify-center relative">
                <div className="bg-primary/20 rounded-3xl absolute inset-0 blur-2xl" />
                <NavIcon icon={item.icon} />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-on-surface tracking-tight">{item.label}</h2>
              <p className="mt-1 text-sm text-on-surface-muted">{item.description}</p>
            </div>
          </div>
        </div>

        {/* LINKS: Increased gap and clearer focus states */}
        <div className="flex flex-col flex-1 min-h-0 p-4 gap-3 overflow-y-auto">
          {item.links.map(({ href, title, description, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              onClick={(e) => handleClick(e, href)}
              className={`group relative flex items-start gap-4 p-4 rounded-2xl transition-colors duration-200
                ${href == '#' ? 'opacity-40 pointer-events-none' : 'hover:bg-level'}
              `}
            >
              {/* Active Indicator */}
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full" />

              <div className="flex h-11 w-11 bg-low rounded-xl items-center justify-center">
                <Icon className="h-5 w-5 text-on-surface-muted" />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-sm font-semibold text-on-surface">{title}</div>
                <p className="mt-0.5 text-xs leading-relaxed text-on-surface-muted">{description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER: Anchored and refined */}
        <div className="px-6 py-4 flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-on-surface-muted/60 bg-linear-to-t from-level/50 to-transparent border-t border-lowest">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-pulse" />
          Experimental runtime systems
        </div>
      </div>
    );
  }
  function renderRight() {
    function rightContent() {
      return (
        <div className="flex h-full p-6 items-center justify-center">
          <div className="w-full max-w-[1200px]">
            <div className="rounded-[28px] border border-lowest shadow-2xl bg-level overflow-hidden">
              <div className="flex h-12 px-4 bg-low/70 border-b border-lowest items-center gap-2">
                <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />
                <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />
                <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />
                <div className="ml-3 px-2 py-1 text-[11px] text-on-surface-muted bg-level rounded-md border border-lowest">
                  {item.featured?.title ?? item.label}
                </div>
              </div>
              <div className="aspect-16/9 w-full relative overflow-hidden bg-background">
                <Brief.BriefExhibit />
              </div>
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
      className="overflow-hidden w-full shadow-2xl shrink-0 transition-all duration-300 will-change-transform min-h-0"
    >
      <div className="flex">
        {!getFeatureFlags().megaMenu.isBriefFocus && renderLeft()}
        {renderRight()}
      </div>
    </div>
  );
}
