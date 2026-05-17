import { CenterRegion } from '@/components/layout/CenterRegion'
import { BaseScroll } from '@/components/BaseScroll'

export function BasePage({ children }) {
  return (
    <BaseScroll>
      <CenterRegion>{children}</CenterRegion>
    </BaseScroll>
  )
}
