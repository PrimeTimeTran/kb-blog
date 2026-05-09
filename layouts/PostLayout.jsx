'use client'
import { useEffect } from 'react'
import { SafeLink as Link } from '../mdx/components/Link'
import PageTitle from '../components/PageTitle'
import SectionContainer from '../components/SectionContainer'
import { BlogSEO } from '../components/SEO'
import siteMetadata from '../data/site-metadata'
import formatDate from '../lib/utils/formate-date'
import Comments from '../components/comments'
import ScrollTopAndComment from '../components/ScrollTopAndComment'

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { date, title } = frontMatter

  // function focusLanguageTab(evt, language) {
  //   language = language + '-content'
  //   var i, tabcontent, tablinks, group

  //   group = document.getElementById(language).parentElement

  //   tabcontent = group.getElementsByClassName('tabcontent')
  //   for (i = 0; i < tabcontent.length; i++) {
  //     tabcontent[i].style.display = 'none'
  //   }
  //   tablinks = group.getElementsByClassName('tablinks')
  //   for (i = 0; i < tablinks.length; i++) {
  //     tablinks[i].className = tablinks[i].className.replace(' active', '')
  //   }

  //   document.getElementById(language).style.display = 'block'
  //   evt.currentTarget.className += ' active'
  // }

  // useEffect(() => {
  //   function addIdToTabGroups() {
  //     var groups = document.getElementsByClassName('tab-group')
  //     for (let groupId = 0; groupId < groups.length; groupId++) {
  //       var group = groups[groupId]
  //       group.id = `tab-group-${groupId}`

  //       var buttonChildren = group.getElementsByClassName('tablinks')
  //       for (var j = 0; j < buttonChildren.length; j++) {
  //         var buttonChild = buttonChildren[j]
  //         buttonChild.id += `-${groupId}-${j}`
  //       }

  //       var children = group.getElementsByClassName('tabcontent')
  //       for (var k = 0; k < children.length; k++) {
  //         var child = children[k]
  //         child.id = `${groupId}-${k}-content`
  //       }

  //       var buttons = group.children[0].children
  //       for (var l = 0; l < buttons.length; l++) {
  //         var button = buttons[l]
  //         button.addEventListener('click', (e) => focusLanguageTab(e, `${groupId}-${l}`))
  //       }
  //     }
  //   }
  //   addIdToTabGroups()
  // }, [])

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date)}</time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">{children}</div>
            </div>
            <Comments frontMatter={frontMatter} />
            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/blog/${next.slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
