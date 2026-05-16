import { ScrollContainer } from '@/components/ScrollContainer'

export function AppScrollable({ children }) {
  return (
    <div className="h-full min-h-0 flex flex-col">
      <ScrollContainer>
        <div className="p-4 space-y-2">{children}</div>
      </ScrollContainer>
    </div>
  )
}
