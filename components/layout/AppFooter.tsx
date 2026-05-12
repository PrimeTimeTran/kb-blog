import { SafeLink as Link } from '../mdx/Link'
import siteMetadata from '@/data/site-metadata'
import SocialIcon from '../social-icons'

export function AppFooter() {
  return (
    <footer className="mb-8 pb-8">
      <div className="mt-16 flex flex-col items-center">
        {/* Socials */}
        <div className="mb-3 flex space-x-8">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            size={24}
            className="text-(--on-surface-variant) hover:text-(--primary) transition-colors"
          />
          <SocialIcon
            kind="github"
            href={siteMetadata.github}
            size={24}
            className="text-(--on-surface-variant) hover:text-(--primary) transition-colors"
          />
          <SocialIcon
            kind="facebook"
            href={siteMetadata.facebook}
            size={24}
            className="text-(--on-surface-variant) hover:text-(--primary) transition-colors"
          />
          <SocialIcon
            kind="youtube"
            href={siteMetadata.youtube}
            size={24}
            className="text-(--on-surface-variant) hover:text-(--primary) transition-colors"
          />
          <SocialIcon
            kind="linkedin"
            href={siteMetadata.linkedin}
            size={24}
            className="text-(--on-surface-variant) hover:text-(--primary) transition-colors"
          />
          <SocialIcon
            kind="twitter"
            href={siteMetadata.twitter}
            size={24}
            className="text-(--on-surface-variant) hover:text-(--primary) transition-colors"
          />
        </div>

        {/* Meta row */}
        <div className="mb-2 flex space-x-2 text-sm text-(--on-surface-variant)">
          <div className="hover:text-(--on-surface) transition-colors">{siteMetadata.author}</div>

          <div>•</div>

          <Link href="/" className="hover:text-(--primary) transition-colors">
            {siteMetadata.title.split('-')[1]}
          </Link>

          <div>•</div>

          <div className="hover:text-(--on-surface) transition-colors">
            © {new Date().getFullYear()}
          </div>
        </div>

        <div className="mb-8 text-sm text-(--on-surface-variant)" />
      </div>
    </footer>
  )
}
