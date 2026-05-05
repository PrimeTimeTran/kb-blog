import { Navbar } from '@/components/Navbar'

export default function PageLayout({ children }) {
  return (
    <div className="flex flex-1 flex-col min-h-0 h-full w-full">
      <Navbar className="h-14 sticky top-0 z-10 flex justify-around theme-border-b px-3 bg-white dark:bg-black" />
      {children}
    </div>
  )
}
