'use client';

import { useMemo, useState } from 'react';
import { RiBloggerLine } from 'react-icons/ri';
import { FiSearch, FiFilter, FiBookOpen, FiClock } from 'react-icons/fi';
import { HiOutlineSortAscending } from 'react-icons/hi';

const MOCK_TERMS = [
  {
    title: 'Binary Search',
    description: 'Efficient algorithm for finding an item in a sorted list.',
    category: 'Algorithms',
    updatedAt: '2026-04-10',
  },
  {
    title: 'React Server Components',
    description: 'A new architecture for rendering React components on the server.',
    category: 'Frontend',
    updatedAt: '2026-03-22',
  },
  {
    title: 'Big O Notation',
    description: 'Mathematical notation describing algorithm complexity.',
    category: 'Computer Science',
    updatedAt: '2026-02-18',
  },
];

export default function TermsPage() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('title'); // title | recent
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    return ['all', ...new Set(MOCK_TERMS.map((t) => t.category))];
  }, []);

  const filtered = useMemo(() => {
    let data = [...MOCK_TERMS];

    // filter by category
    if (category !== 'all') {
      data = data.filter((t) => t.category === category);
    }

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }

    // sort
    if (sort === 'title') {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'recent') {
      data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    return data;
  }, [query, sort, category]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-black p-2 text-white">
              <RiBloggerLine className="text-xl" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Terms Encyclopedia</h1>
          </div>

          <p className="mt-2 text-sm text-neutral-600">
            Explore concepts, definitions, and patterns. Filter, search, and navigate knowledge like a living index.
          </p>
        </div>
      </header>

      {/* Controls */}
      <section className="mx-auto max-w-5xl px-6 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm w-full md:w-1/2">
            <FiSearch className="text-neutral-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search terms..."
              className="w-full bg-transparent outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            {/* Category */}
            <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
              <FiFilter className="text-neutral-500" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2">
              <HiOutlineSortAscending className="text-neutral-500" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none">
                <option value="title">A → Z</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 pb-20">
        {/* Stats */}
        <div className="mb-4 text-sm text-neutral-500">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((term) => (
            <a
              key={term.title}
              href={`/terms/${term.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FiBookOpen className="text-neutral-500" />
                  <h2 className="text-lg font-semibold group-hover:underline">{term.title}</h2>
                </div>

                <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600">{term.category}</span>
              </div>

              <p className="mt-2 text-sm text-neutral-600">{term.description}</p>

              <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400">
                <FiClock />
                Updated {term.updatedAt}
              </div>
            </a>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border bg-white p-10 text-center text-neutral-500">
            No terms found. Try adjusting search or filters.
          </div>
        )}
      </main>
    </div>
  );
}
