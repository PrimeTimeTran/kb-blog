export default function Page({ children }) {
  return <div className="flex flex-1 overflow-y-auto min-h-0 h-full w-full">{children}</div>;
}
