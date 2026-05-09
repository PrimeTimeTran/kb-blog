import Link from 'next/link'
import kebabCase from '../lib/utils/kebab-case'

const Tag = ({ text }) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      // className="mr-3 text-sm font-medium uppercase underline text-text-muted hover:text-link"
      className="uppercase underline mr-3 text-meta text-xs hover:text-meta-hover"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
