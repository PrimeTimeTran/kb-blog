import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/site-metadata'
import projectsData from '@/data/projects'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A few projects I've worked on over the years using various technologies
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {(projectsData ?? []).map((project) => (
              <Card
                key={project.title}
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                href={project.href}
                tech={project.tech}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
