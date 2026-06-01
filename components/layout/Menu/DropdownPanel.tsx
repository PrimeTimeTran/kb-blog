'use client';

import * as Brief from '@/components/Brief';

import Exhibit from '@/pkg/exhibit/Exhibit';
import { SafeLink as Link } from '@/mdx/Link';
import React from 'react';
import { getFeatureFlags } from '@/lib/feature-flags';
import { manifest } from '../../Brief/components/data';

const idePreview = (
  <div className="aspect-16/9 w-full relative overflow-hidden bg-background">
    <div
      style={{
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 1920,
          height: 1080,
          transform: 'scale(var(--scale))',
          transformOrigin: 'center',
        }}
      >
        <Exhibit manifest={manifest} />
      </div>
    </div>
  </div>
);

const brief = (
  <div className="aspect-16/9 w-full relative overflow-hidden bg-background">
    <Brief.BriefExhibit />
  </div>
);
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') {
      e.preventDefault();
      return;
    }
  };

  function renderLeft() {
    return (
      <div className="flex flex-col w-95 shrink-0 border-r h-full min-h-0">
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-level border border-outline-variant">
            <NavIcon icon={item.icon} className="h-5 w-5 text-on-surface" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-on-surface">{item.label}</h2>
            <p className="text-sm text-on-surface-muted">{item.description}</p>
          </div>
        </div>

        {/* LINKS: Increased gap and clearer focus states */}
        {renderLinks()}

        <div className="shrink-0 px-6 py-4 flex items-center gap-2 text-[11px] font-medium tracking-wider uppercase text-on-surface-muted/60 bg-low border-t">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-pulse" />
          Experimental runtime systems
        </div>
      </div>
    );

    function renderLinks() {
      return (
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 p-4">
          {item.links.map(({ href, title, description, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              onClick={(e) => {
                handleClick(e, href);
                setTimeout(() => {
                  scheduleClose();
                }, 2500);
              }}
              className={`group relative flex items-start gap-4 p-4 rounded-2xl transition-colors duration-200 bg-low
                ${href == '#' ? 'opacity-40 pointer-events-none' : ''}
              `}
            >
              {/* Active Indicator */}
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full" />

              <div className="flex h-11 w-11 bg-lowest rounded-xl items-center justify-center">
                <Icon className="h-5 w-5 text-on-surface-muted bg-level" />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-sm font-semibold text-on-surface">{title}</div>
                <p className="mt-0.5 text-xs leading-relaxed text-on-surface-muted">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  }
  function renderRight() {
    function rightContent() {
      return (
        <div className="flex h-full p-6 items-start justify-start ">
          <div className="w-full max-w-[1200px] space-y-2">
            {/* <h1 className="max-w-2xl text-xl font-black leading-[0.95] tracking-tight md:text-3xl">Hello World</h1> */}
            <div className="rounded-[28px] shadow-2xl overflow-hidden bg-surface border">
              <div className="flex h-12 px-4 bg-low/70 border items-center gap-2">
                <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />
                <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />
                <div className="h-2 w-2 bg-on-surface-muted/30 rounded-full" />
                <div className="ml-3 px-2 py-1 text-[11px] text-on-surface-muted border rounded-md">
                  {item.featured?.title ?? item.label}
                </div>
              </div>
              {idePreview}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex-1 overflow-hidden bg-surface relative">
        <div className="bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[48px_48px] pointer-events-none opacity-[0.03] absolute inset-0" />
        {rightContent()}
      </div>
    );
  }
  return (
    <div
      key={item.label}
      className="overflow-hidden w-full shadow-2xl shrink-0 transition-all duration-300 will-change-transform min-h-0 bg-surface"
    >
      <div className="h-screen flex">
        {!getFeatureFlags().megaMenu.isBriefFocus && renderLeft()}
        {renderRight()}
      </div>
    </div>
  );
}
