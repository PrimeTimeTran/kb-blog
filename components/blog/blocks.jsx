// import { TagButton } from '../Taxonomy'
import { SafeLink as Link } from '../mdx/Link'
import { useScroll } from '@/providers/ScrollProvider'

// import { Image } from '../mdx'
// import { CiCalendarDate } from 'react-icons/ci'
// import PageTitle from '../../components/PageTitle'

import { discussUrl, editUrl } from '../../lib/utils'

export function BlogHeader({ title, date }) {
  const { shrunk } = useScroll()

  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b">
      <div
        className={`flex h-full flex-col justify-center bg-surface text-on-surface px-4 transition-all duration-300
          ${false ? 'scale-[0.92] origin-top translate-y-[-10px]' : ''}
        `}
      >
        <div
          className={`transition-all duration-300 ease-in-out
            ${false ? 'text-xl font-semibold' : 'text-3xl md:text-4xl font-bold'}
          `}
        >
          {title}
        </div>

        <time
          className={`text-sm transition-all duration-300 ease-in-out text-on-surface-variant
            ${false ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 mt-2'}
          `}
        >
          {new Date(date).toDateString()}
        </time>
      </div>
    </header>
  )
}

/* -----------------------------
   Blog Footer
------------------------------ */
export function BlogFooter({ slug, fileName }) {
  return (
    <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
      <Link href={discussUrl(slug)}>Discuss</Link>
      {' • '}
      <Link href={editUrl(fileName)}>Edit on GitHub</Link>
    </div>
  )
}

/* -----------------------------
   Author Block
------------------------------ */
export function AuthorBlock({ authors = [] }) {
  return <div>hi</div>
  // return (
  //   <dl className="border-slate-200 pb-10 pt-6 dark:border-slate-800 xl:border-b">
  //     <dt className="sr-only">Authors</dt>
  //     <dd>
  //       <ul className="space-y-6 xl:block">
  //         {(authors ?? []).map((author, idx) => (
  //           <li key={idx} className="flex items-center space-x-3">
  //             {author.frontMatter?.avatar && (
  //               <Image
  //                 src={author.frontMatter.avatar}
  //                 width={38}
  //                 height={38}
  //                 alt="avatar"
  //                 className="h-10 w-10 rounded-full"
  //               />
  //             )}
  //             <div className="text-sm">
  //               <div className="font-medium text-gray-900 dark:text-gray-100">{author.name}</div>
  //               {author.twitter && (
  //                 <Link href={author.twitter} className="text-primary-500">
  //                   @{author.twitter.split('/').pop()}
  //                 </Link>
  //               )}
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     </dd>
  //   </dl>
  // )
}

/* -----------------------------
   Tag Block
------------------------------ */
export function TagBlock({ tags = [] }) {
  if (!tags.length) return null

  return (
    <div className="xl:py-8">
      <h2 className="text-xs uppercase tracking-wide text-gray-500">Tags</h2>
      <div className="flex flex-wrap">
        {/* {((tags ?? [])?.filter(Boolean) ?? []).map((tag, idx) => (
          <TagButton key={idx} text={tag} />
        ))} */}
      </div>
    </div>
  )
}

/* -----------------------------
   Nav Block (prev/next)
------------------------------ */
export function NavBlock({ prev, next }) {
  if (!prev && !next) return null

  return (
    <div className="space-y-6 xl:py-8">
      {prev && (
        <div>
          <h2 className="text-xs uppercase text-gray-500">Previous</h2>
          <Link href={`/blog/${prev.slug}`} className="text-primary-500">
            {prev.title}
          </Link>
        </div>
      )}

      {next && (
        <div>
          <h2 className="text-xs uppercase text-gray-500">Next</h2>
          <Link href={`/blog/${next.slug}`} className="text-primary-500">
            {next.title}
          </Link>
        </div>
      )}
    </div>
  )
}

/* -----------------------------
   Back To Blog
------------------------------ */
export function BackToBlog() {
  return (
    <div className="pt-4 xl:pt-8">
      <Link href="/blog" className="text-primary-500">
        ← Back to blog
      </Link>
    </div>
  )
}
