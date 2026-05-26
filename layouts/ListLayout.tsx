'use client';
import React, { Suspense } from 'react';
import { FiCalendar } from 'react-icons/fi';

import { usePosts } from '@/hooks/usePosts';
import { useInView } from '@/hooks/useInView';

import { TOPICS } from '@/data/constants';
import formatDate from '@/lib/utils/formate-date';
import { buildContentUrl } from '@/lib/content/core/url';
import Pagination from '@/components/Pagination';
import { SafeLink as Link } from '@/components/mdx/Link';
import { TagButton, TagLink } from '@/components/Taxonomy';
import { graffitiWords } from '@/data/graffiti';
import { useTypewriter } from '@/hooks/useTypeWriter';

export function DebugWorkspace() {
  return (
    <div className="relative h-screen w-full overflow-hidden isolate bg-white">
      {/* 🌌 atmosphere MUST be behind */}
      <WorkspaceAtmosphere />

      {/* 📜 scroll layer */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="relative z-10 h-full overflow-y-auto px-10 py-10 space-y-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl border bg-surface p-6">
              Item {i + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ListLayout({ posts: fetchedPosts, title, subtitle, pagination }) {
  // export default function ListLayout({ posts: fetchedPosts, title, subtitle, pagination }) {
  const {
    posts,
    metrics,

    searchTerm,
    setSearchTerm,

    filteredTopics,
    toggleTag,

    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = usePosts({ fetchedPosts });

  return (
    <div className="relative flex-1 min-w-0 isolate ">
      {/* <WorkspaceAtmosphere /> */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="shrink-0">
          <HeaderBlock
            title={title}
            subtitle={subtitle}
            props={{
              posts,
              metrics,
              searchTerm,
              setSearchTerm,
              filteredTopics,
              toggleTag,
              sortField,
              setSortField,
              sortOrder,
              setSortOrder,
            }}
          />
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 ">
          <Suspense fallback={<PostListSkeleton />}>
            <PostList posts={posts} />
          </Suspense>
          {pagination?.totalPages > 1 && !searchTerm && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  );
}
function filterSection(filteredTopics, toggleTag) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-linear-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-surface to-transparent" />

      <div className="my-2 mb-6 flex space-x-2 overflow-x-auto no-scrollbar">
        {Object.entries(TOPICS).map(([topic, tags]) => {
          const active = !filteredTopics.includes(topic);
          return (
            <TagButton
              key={topic}
              label={topic}
              active={active}
              tailDecoration={tags.length}
              onClick={() => toggleTag(topic)}
            />
          );
        })}
      </div>
    </div>
  );
}
function HeaderBlock({
  title,
  subtitle,
  props,
}: {
  title: string;
  subtitle?: string;
  props: {
    metrics: string;
    searchTerm?: string;
    setSearchTerm: string;
    filteredTopics?: string;
    toggleTag: string;
    sortField?: string;
    setSortField: string;
    sortOrder?: string;
    setSortOrder?: string;
  };
  children: React.ReactNode;
}) {
  const {
    metrics,
    searchTerm,
    setSearchTerm,
    filteredTopics,
    toggleTag,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = props;
  return (
    <div className="max-w-5xl px-3 mx-auto">
      <header>
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-on-surface sm:text-4xl">{title}</h1>

        <p className="text-lg text-on-surface-variant">{subtitle}</p>
        <SearchBar
          metrics={metrics}
          value={searchTerm}
          sortField={sortField}
          sortOrder={sortOrder}
          onChange={setSearchTerm}
          setSortField={setSortField}
          setSortOrder={setSortOrder}
        />
        {filterSection(filteredTopics, toggleTag)}
      </header>
    </div>
  );
}
function PostCard({ post }) {
  const { ref, inView } = useInView();

  const { slug, date, title, summary, tags = [] } = post;

  // 🔥 latch: remembers if it was ever visible
  const wasInView = React.useRef(false);

  if (inView) {
    wasInView.current = true;
  }

  // show stays true until exit animation finishes naturally
  const show = inView || wasInView.current;

  return (
    <article
      ref={ref}
      className={`
        xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 group rounded-xl

        transition-all duration-700 ease-out

        ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-[0.98]'}
      `}
    >
      {/* DATE */}
      <dl
        className={`
          transition-all duration-700 ease-out delay-75

          ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3'}
        `}
      >
        <dd className="text-sm flex items-center space-x-3 text-on-surface-variant opacity-80">
          <FiCalendar className="text-primary opacity-80" />
          <time dateTime={date}>{formatDate(date)}</time>
        </dd>
      </dl>

      {/* CONTENT */}
      <div className="space-y-3 xl:col-span-3 w-full">
        {/* TITLE */}
        <h3 className="transition-transform hover:rotate-[-0.3deg] hover:scale-[1.01] ">
          <Link href={buildContentUrl('blog', slug)} className="block w-full">
            <span className="aurora-text text-2xl font-extrabold transition-transform duration-500 ease-out hover:rotate-[0.3deg] hover:scale-[1.01]">
              {title}
            </span>
          </Link>
        </h3>

        {/* SUMMARY */}
        <p
          className={`
            text-on-surface-variant opacity-80
            transition-all duration-700 ease-out delay-150 

            ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4'}
          `}
        >
          {summary}
        </p>

        {/* TAGS */}
        <div
          className={`
            flex flex-wrap gap-2
            transition-all duration-700 ease-out delay-200

            ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4'}
          `}
        >
          {tags.map((tag) => (
            <TagLink key={tag} text={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}

function SearchBar({ value, onChange, metrics, sortField, setSortField, sortOrder, setSortOrder }) {
  // graffitiWords
  const { text, pause, resume, paused } = useTypewriter(graffitiWords);
  const toggleSort = (field) => {
    if (sortField === field) {
      // same field → toggle direction
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // new field → default to desc (your rule)
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortLabel = (field) => {
    const active = sortField === field;
    const arrow = active ? (sortOrder === 'asc' ? '↑' : '↓') : '';
    return `${field[0].toUpperCase() + field.slice(1)} ${arrow}`;
  };

  const labelBase = 'px-2 py-1 rounded text-xs min-w-[64px] text-center transition-colors border';

  // ASC (ascending) → A → Z: apple, banana, cherry
  // DESC (descending) → Z → A: cherry, banana, apple
  function getStateClass(field) {
    return sortField === field
      ? 'bg-primary text-on-primary border-primary'
      : 'bg-level text-on-surface border-outline-variant hover:bg-high';
  }

  return (
    <div className="w-full">
      {/* SINGLE TOOLBAR ROW */}
      <div className="flex items-center justify-center space-x-5">
        {/* METRICS (between input and sort) */}
        <div className="shrink-0 text-sm font-medium text-on-surface whitespace-nowrap tabular-nums tracking-tight">
          <span>{metrics.filtered}</span>
          <span className="px-1 text-on-surface-variant">/</span>
          <span>{metrics.total}</span>
        </div>
        {/* SEARCH */}
        {/* TODO: Add base design tokens for input(hover, active, etc.) */}
        <div className="relative w-full max-w-lg">
          <div className="relative w-full">
            {/* ghost text */}
            <div className="absolute inset-0 flex items-center px-3 py-2 pointer-events-none text-on-surface-variant">
              {!paused && text}
              <span className="animate-pulse">|</span>
            </div>

            {/* real input */}
            <input
              aria-label="Search articles"
              type="text"
              onFocus={pause}
              onBlur={resume}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder=""
              className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/70 transition-colors duration-200 outline-none hover:border-outline hover:bg-level focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/15 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* SORT BUTTONS */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          <button onClick={() => toggleSort('date')} className={`${labelBase} ${getStateClass('date')}`}>
            {sortLabel('date')}
          </button>

          <button onClick={() => toggleSort('title')} className={`${labelBase} ${getStateClass('title')}`}>
            {sortLabel('title')}
          </button>
        </div>
      </div>
    </div>
  );
}

function PostList({ posts }) {
  if (!posts.length) {
    return <p className="py-6 text-on-surface-variant opacity-70">No posts found.</p>;
  }

  return (
    <ul className="h-full w-full space-y-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </ul>
  );
}

function PostListSkeleton() {
  return (
    <div className="space-y-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <article key={i} className="xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0 rounded-xl">
          {/* DATE */}
          <div className="mb-3 xl:mb-0">
            <div className="h-4 w-32 bg-on-surface/10 rounded animate-pulse" />
          </div>

          {/* CONTENT */}
          <div className="space-y-4 xl:col-span-3 w-full">
            {/* TITLE */}
            <div className="h-8 w-3/4 bg-on-surface/10 rounded animate-pulse" />

            {/* SUMMARY */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-on-surface/10 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-on-surface/10 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-on-surface/10 rounded animate-pulse" />
            </div>

            {/* TAGS */}
            <div className="flex gap-2 flex-wrap pt-2">
              <div className="h-6 w-16 bg-on-surface/10 rounded-full animate-pulse" />
              <div className="h-6 w-20 bg-on-surface/10 rounded-full animate-pulse" />
              <div className="h-6 w-14 bg-on-surface/10 rounded-full animate-pulse" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function WorkspaceAtmosphere() {
  // 1. MAIN ANCHOR BLOBS (this is what makes it look like your reference)
  const anchors = [
    {
      top: '-10%',
      left: '20%',
      size: 700,
      color: 'var(--primary)',
      opacity: 0.22,
    },
    {
      top: '60%',
      left: '110%',
      size: 800,
      color: 'var(--secondary)',
      opacity: 0.18,
    },
    {
      top: '110%',
      left: '30%',
      size: 600,
      color: 'var(--tertiary)',
      opacity: 0.16,
    },
  ];

  // 2. LIGHT BACKGROUND FILL BLOBS (very subtle, optional “fog layer”)
  const noise = Array.from({ length: 12 }).map((_, i) => {
    const seed = i * 9999;

    const rand = (n: number) => (Math.sin(seed * n) + 1) / 2;

    return {
      top: `${rand(1) * 120}%`,
      left: `${rand(2) * 120}%`,
      size: 120 + rand(3) * 260,
      color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
      opacity: 0.06,
    };
  });

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* MAIN ATMOSPHERE LAYER */}
      {anchors.map((b, i) => (
        <div
          key={`a-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)`,
            opacity: b.opacity,
          }}
        />
      ))}

      {/* SOFT FOG LAYER */}
      {noise.map((b, i) => (
        <div
          key={`n-${i}`}
          className="absolute rounded-full blur-2xl"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}
