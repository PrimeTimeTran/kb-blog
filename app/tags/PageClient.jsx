'use client'

import React from 'react'
import { GrSystem } from 'react-icons/gr'
import { SiFramework } from 'react-icons/si'
import { CiMoneyBill } from 'react-icons/ci'
import { FaLaptopCode } from 'react-icons/fa6'
import { TbMathSymbols } from 'react-icons/tb'
import { LiaToolsSolid } from 'react-icons/lia'
import { SiThealgorithms } from 'react-icons/si'
import { MdOutlineSecurity } from 'react-icons/md'
import { TbDatabaseSearch } from 'react-icons/tb'

import Tag from '../../components/Tag'
import { PageSEO } from '../../components/SEO'
import kebabCase from '../../lib/utils/kebab-case'
import siteMetadata from '../../data/site-metadata'
import { SafeLink as Link } from '../../mdx/components/Link'

import {
  dsa,
  tech,
  misc,
  maths,
  tools,
  devops,
  finance,
  security,
  databases,
  frameworks,
} from '../../data/constants'

function renderTags(tags, t) {
  return (
    <div key={t} className="my-1 mr-5 ">
      <Tag text={t} />
      <Link
        href={`/tags/${kebabCase(t)}`}
        className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
      >
        {` (${tags[t]})`}
      </Link>
    </div>
  )
}

function Category({ title, tags, sortedTags, filter, icon }) {
  const [open, setOpen] = React.useState(true)
  const categoryTags = (sortedTags ?? [])?.filter((t) => {
    return filter.includes(t.toLowerCase())
  })
  const Icon = icon
  return (
    <div className="w-full group">
      <button className="w-full text-left" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5" />}
            <h1 className="block w-full text-3xl font-semibold  transition-colors group-hover:text-link">
              {title}
            </h1>
          </div>

          <span className="ml-2 text-lg text-gray-600">
            ({categoryTags.length}) {open ? '▲' : '▼'}
          </span>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="flex flex-wrap">{(categoryTags ?? []).map((t) => renderTags(tags, t))}</div>
      </div>
      <hr className="my-2" />
    </div>
  )
}

export default function PageClient({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <div>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="space-y-2 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Tags
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{siteMetadata.tags}</p>
      </div>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-12 md:flex-row md:items-center overflow-auto">
        <div className="w-full">
          <Category
            title="Maths"
            icon={TbMathSymbols}
            tags={tags}
            sortedTags={sortedTags}
            filter={maths}
          />
          <Category
            title="Finance"
            icon={CiMoneyBill}
            tags={tags}
            sortedTags={sortedTags}
            filter={finance}
          />
          <Category
            title="Frameworks"
            icon={SiFramework}
            tags={tags}
            sortedTags={sortedTags}
            filter={frameworks}
          />
          <Category
            title="Tech"
            icon={FaLaptopCode}
            tags={tags}
            sortedTags={sortedTags}
            filter={tech}
          />
          <Category
            title="Databases"
            icon={TbDatabaseSearch}
            tags={tags}
            sortedTags={sortedTags}
            filter={databases}
          />
          <Category
            title="DevOps"
            icon={GrSystem}
            tags={tags}
            sortedTags={sortedTags}
            filter={devops}
          />
          <Category
            title="Data Structures & Algorithms"
            icon={SiThealgorithms}
            tags={tags}
            sortedTags={sortedTags}
            filter={dsa}
          />
          <Category
            title="Security"
            icon={MdOutlineSecurity}
            tags={tags}
            sortedTags={sortedTags}
            filter={security}
          />
          <Category
            title="Tools"
            icon={LiaToolsSolid}
            tags={tags}
            sortedTags={sortedTags}
            filter={tools}
          />
          <div className="w-full">
            <h1 className="text-2xl font-bold">Misc</h1>
            <div className="flex flex-wrap">
              {(sortedTags ?? []).map((t) => {
                if (misc.includes(t.toLowerCase())) return null
                return renderTags(tags, t)
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
