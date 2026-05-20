'use client'

export default function Layout({ children, left, right }) {
  return (
    <div className="flex w-full h-full">
      <div className="flex">{left}</div>
      <div className="flex-2 bg-red-400">{children}</div>
      <div className="flex">{right}</div>
    </div>
  )
}
