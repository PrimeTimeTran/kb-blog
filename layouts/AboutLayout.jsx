import SocialIcon from '../components/social-icons'
import { Image } from '../mdx/components'
import { PageSEO } from '../components/SEO'

export default function AboutLayout({ navbar, children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter

  return (
    <div className="flex flex-col min-h-0 h-full">
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="relative flex flex-1 min-h-0">
        <main className="flex-1 min-w-0 pb-6">{children}</main>
        <aside className="absolute right-8 top-1/2 -translate-y-1/2 w-64">
          <div className="flex-4 float-start flow-root">
            <div className="space-y-2 pb-8 pt-6 md:space-y-5 flex justify-center flex-col items-center">
              <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
                About
              </h1>
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
              <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
              <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
              <div className="text-gray-500 dark:text-gray-400">{company}</div>
              <div className="flex space-x-3 pt-6">
                <SocialIcon kind="mail" href={`mailto:${email}`} />
                <SocialIcon kind="github" href={github} />
                <SocialIcon kind="linkedin" href={linkedin} />
                <SocialIcon kind="twitter" href={twitter} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
