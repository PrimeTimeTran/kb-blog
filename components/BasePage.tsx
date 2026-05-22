import { BaseScroll } from '@/components/BaseScroll';
import { CenterRegion } from '@/components/layout/CenterRegion';

export function BasePage({ children }) {
  return (
    <BaseScroll>
      <CenterRegion>{children}</CenterRegion>
    </BaseScroll>
  );
}
