import { TiTags } from 'react-icons/ti'
import { RiBloggerLine } from 'react-icons/ri'
import { SiThealgorithms } from 'react-icons/si'
import { GoProjectSymlink } from 'react-icons/go'
import { GiGiftOfKnowledge } from 'react-icons/gi'
import { SiLibreofficewriter } from 'react-icons/si'

const headerNavLinks = [
  {
    href: '/kb/KB-TOC',
    title: 'K-Base',
    icon: GiGiftOfKnowledge,
  },
  { href: '/', title: 'Blog', icon: RiBloggerLine },
  { href: '/tags', title: 'Tags', icon: TiTags },
  { href: '/dsa', title: 'DSA', icon: SiThealgorithms },
  // { href: '/snippets', title: 'Snippets' },
  { href: '/projects', title: 'Projects', icon: GoProjectSymlink },
  { href: '/about', title: 'About', icon: SiLibreofficewriter },
]

export default headerNavLinks
