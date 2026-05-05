'use client'

export default function SectionContainer({ children }) {
  return (
    <div
      className={'flex h-full w-full flex-col px-2 sm:px-6 lg:px-8 overflow-auto overflow-scroll'}
    >
      {children}
    </div>
  )
}
