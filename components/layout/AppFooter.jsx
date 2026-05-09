import { SafeLink as Link } from '../../mdx/components/Link'
import siteMetadata from '../../data/site-metadata'
import SocialIcon from '../../components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-8 ">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="24" />
          <SocialIcon kind="github" href={siteMetadata.github} size="24" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="24" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="24" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="24" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="24" />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title.split('-')[1]}</Link>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400"></div>
      </div>
    </footer>
  )
}
