import { SafeLink as Link } from '../components/mdx/Link'
import { PageSEO } from '../components/SEO'
import siteMetadata from '../data/site-metadata'

export default function FourZeroFour() {
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-neutral-900 dark:text-neutral-100 min-h-[50vh] flex items-center justify-center w-screen">
      <PageSEO title={`Page Not Found - ${siteMetadata.title}`} />

      {/* Container with Material Standard Spacing */}
      <div className="flex flex-col items-center justify-center px-6 py-12 md:flex-row md:space-x-12 md:px-12">
        {/* Error Code: Display Large / Display Medium token */}
        <div className="pb-6 md:pb-0 md:border-r md:border-slate-300 dark:md:border-neutral-700 md:pr-12">
          <h1 className="text-7xl font-regular tracking-[-0.25px] text-slate-900 dark:text-neutral-100 md:text-8xl">
            404
          </h1>
        </div>

        {/* Content Area */}
        <div className="max-w-md text-center md:text-left">
          {/* Headline Small Token */}
          <p className="mb-2 text-2xl font-normal tracking-normal text-slate-900 dark:text-neutral-100">
            Sorry we couldn't find this page.
          </p>

          {/* Body Large Token */}
          <p className="mb-8 text-base font-normal tracking-[0.5px] text-slate-600 dark:text-neutral-400">
            But don't worry, you can find plenty of other things on our homepage.
          </p>

          <Link href="/">
            {/* Material 3 Filled Button Token */}
            <button className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-medium tracking-[0.1px] text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-offset-neutral-900">
              Back to homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
