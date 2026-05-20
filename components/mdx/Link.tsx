import Link from 'next/link'

export function SafeLink({ href, children, ...props }) {
  if (!href || typeof href !== 'string') {
    return <span>{children}</span>
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

export function CustomLink({ href = '', children, ...props }) {
  const isExternal = href.startsWith('http')
  if (!href || typeof href !== 'string') {
    return <span>{children}</span>
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
