// components/Term.jsx
import { SafeLink as Link } from '@/mdx/components/Link'

export function Term({ href, children, short, icon, tone = 'default' }) {
  return (
    <span className={`term term--${tone} group relative`}>
      <Link href={href} className="term__link">
        {icon && <span className="term__icon">{icon}</span>}
        {children}
      </Link>

      {short && <div className="term__preview">{short}</div>}
    </span>
  )
}
