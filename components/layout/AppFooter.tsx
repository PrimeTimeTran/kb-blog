import { SafeLink as Link } from '../mdx/Link';
import siteMetadata from '@/data/site-metadata';
import SocialIcon from '../social-icons';

export function AppFooter() {
  return (
    <footer className="flex flex-col items-center pt-16">
      {/* Socials */}
      <div className="mb-3 flex space-x-8">
        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={24} />
        <SocialIcon kind="github" href={siteMetadata.github} size={24} />
        <SocialIcon kind="facebook" href={siteMetadata.facebook} size={24} />
        <SocialIcon kind="youtube" href={siteMetadata.youtube} size={24} />
        <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={24} />
        <SocialIcon kind="twitter" href={siteMetadata.twitter} size={24} />
      </div>

      {/* Meta row */}
      <div className="mb-2 flex space-x-2 text-sm text-on-surface-variant">
        <div className="hover:text-on-surface transition-colors">{siteMetadata.author}</div>

        <div>•</div>

        <Link href="/" className="hover:text-primary transition-colors">
          {siteMetadata.title.split('-')[1]}
        </Link>

        <div>•</div>

        <div className="hover:text-on-surface transition-colors">© {new Date().getFullYear()}</div>
      </div>

      <div className="h-8" />
    </footer>
  );
}
