import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/social-icons'
import { Image } from '@/mdx/components'

export default function AuthorLayout({ children, frontMatter }) {
  const {
    name = '',
    avatar = '',
    occupation = '',
    company = '',
    email = '',
    twitter = '',
    linkedin = '',
    github = '',
  } = frontMatter || {}

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="flex w-full">
        {/* left column */}
        <div className="w-1/3">Left content</div>

        {/* right column (children) */}
        <div className="w-2/3">{children}</div>
      </div>
    </>
  )
}
