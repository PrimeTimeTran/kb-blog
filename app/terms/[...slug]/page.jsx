import Link from 'next/link';
import { TiTags } from 'react-icons/ti';
import { RiBloggerLine } from 'react-icons/ri';
import { SiThealgorithms } from 'react-icons/si';
import { GoProjectSymlink } from 'react-icons/go';
import { GiGiftOfKnowledge } from 'react-icons/gi';
import { SiLibreofficewriter } from 'react-icons/si';

import { terms } from '../../../data/generated/terms';
import { termBacklinks } from '../../../data/generated/backlinks';

export default async function TermPage({ params }) {
  let { slug } = await params;
  slug = Array.isArray(slug) ? slug[0] : slug;
  const key = slug.toLowerCase();
  const term = terms[key];
  const backlinks = termBacklinks[key] || [];

  if (!term) {
    return (
      <div className="mx-auto max-w-3xl p-10">
        <h1 className="text-xl font-medium text-red-500">Term not found</h1>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl p-8">
      {/* HEADER */}
      <header className="mb-10 border-b border-gray-200 pb-6 dark:border-gray-800">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <GiGiftOfKnowledge className="text-lg" />
          <span>Knowledge Term</span>
        </div>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{term.term}</h1>

        {term.definition && (
          <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">{term.definition}</p>
        )}
      </header>

      {/* META GRID */}
      <div className="space-y-10">
        {/* TAGS */}

        {term.tags?.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <TiTags className="text-base" />
              Tags
            </div>

            <div className="flex flex-wrap gap-2">
              {term.tags.map((tag) => {
                const slug = tag.toLowerCase().trim().replace(/\s+/g, '-');

                return (
                  <Link key={tag} href={`/tags/${slug}`}>
                    <span className="cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
                      {tag}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
        {/* ALIASES */}
        {term.aliases?.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <SiLibreofficewriter className="text-base" />
              Aliases
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              {term.aliases.map((alias) => (
                <span
                  key={alias}
                  className="rounded-md bg-gray-100 px-2 py-1 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {alias}
                </span>
              ))}
            </div>
          </section>
        )}
        {/* RELATED (future graph layer) */}
        <section>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <GoProjectSymlink className="text-base" />
            Related
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">No relations indexed yet.</div>
        </section>
        {/* CATEGORY / DOMAIN (future expansion) */}
        <section>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <SiThealgorithms className="text-base" />
            Domain
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">Unclassified</div>
        </section>
        {/* NOTES / EXTENSION HOOK */}
        <section>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <RiBloggerLine className="text-base" />
            Notes
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">No additional notes.</div>
        </section>
        {/* BACKLINKS */}
        {backlinks.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">Mentions</h2>

            <ul className="space-y-2 text-sm">
              {backlinks.map((b) => (
                <li key={b.file} className="flex justify-between">
                  <span className="truncate">{b.file}</span>
                  <span className="text-gray-400">{b.count}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
