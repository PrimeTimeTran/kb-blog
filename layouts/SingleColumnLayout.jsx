export default function SingleColumnLayout({ left, children, right }) {
  return <div className="flex flex-1 flex-col min-h-0 h-full px-16">{children}</div>
}
