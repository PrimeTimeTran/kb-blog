// Icons taken from: https://simpleicons.org/

import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaFacebook, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa';

const components = {
  mail: AiOutlineMail,
  github: FaGithub,
  facebook: FaFacebook,
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
};

const SocialIcon = ({ kind, href, size = 20 }) => {
  if (!href) return null;

  const Icon = components[kind];
  if (!Icon) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        text-(--on-surface-variant)
        hover:text-(--primary)
        transition-colors
      "
    >
      <span className="sr-only">{kind}</span>
      <Icon size={size} />
    </a>
  );
};

export default SocialIcon;
