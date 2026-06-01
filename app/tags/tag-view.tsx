'use client';

import { Category, TagList } from '@/components/Taxonomy';
import { databases, devops, dsa, finance, frameworks, maths, misc, security, tech, tools } from '@/data/constants';

import { BasePage } from '@/components/BasePage';
import { CiMoneyBill } from 'react-icons/ci';
import { FaLaptopCode } from 'react-icons/fa6';
import { GrSystem } from 'react-icons/gr';
import { LiaToolsSolid } from 'react-icons/lia';
import { MdOutlineSecurity } from 'react-icons/md';
import { PageSEO } from '@/components/SEO';
import { SiFramework } from 'react-icons/si';
import { SiThealgorithms } from 'react-icons/si';
import { TbDatabaseSearch } from 'react-icons/tb';
import { TbMathSymbols } from 'react-icons/tb';
import siteMetadata from '@/data/site-metadata';

export function TagView({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
  return (
    <BasePage>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="space-y-2 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-on-background sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Tags
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{siteMetadata.tags}</p>
      </div>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-12 md:flex-row md:items-center overflow-auto">
        <div className="w-full">
          <Category title="Maths" icon={TbMathSymbols} tags={tags} sortedTags={sortedTags} filter={maths} />
          <Category title="Finance" icon={CiMoneyBill} tags={tags} sortedTags={sortedTags} filter={finance} />
          <Category title="Frameworks" icon={SiFramework} tags={tags} sortedTags={sortedTags} filter={frameworks} />
          <Category title="Tech" icon={FaLaptopCode} tags={tags} sortedTags={sortedTags} filter={tech} />
          <Category title="Databases" icon={TbDatabaseSearch} tags={tags} sortedTags={sortedTags} filter={databases} />
          <Category title="DevOps" icon={GrSystem} tags={tags} sortedTags={sortedTags} filter={devops} />
          <Category
            title="Data Structures & Algorithms"
            icon={SiThealgorithms}
            tags={tags}
            sortedTags={sortedTags}
            filter={dsa}
          />
          <Category title="Security" icon={MdOutlineSecurity} tags={tags} sortedTags={sortedTags} filter={security} />
          <Category title="Tools" icon={LiaToolsSolid} tags={tags} sortedTags={sortedTags} filter={tools} />
          <div className="w-full">
            <h1 className="text-2xl font-bold">Misc</h1>
            <div className="flex flex-wrap">
              {(sortedTags ?? []).map((t) => {
                if (misc.includes(t.toLowerCase())) return null;
                return TagList({ tags, tag: t });
              })}
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
}
