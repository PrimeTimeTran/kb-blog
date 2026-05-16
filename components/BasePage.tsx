import { AppScrollable } from '@/components/layout/AppScrollable'
import { CenterRegion } from '@/components/layout/CenterRegion'

export function BasePage({ children }) {
  return (
    <AppScrollable>
      <CenterRegion>{children}</CenterRegion>
    </AppScrollable>
  )
}
