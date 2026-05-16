import { Graffiti } from './Graffiti'
import { ScrollContainer } from './ScrollContainer'

// | class           | reason                          |
// | --------------- | ------------------------------- |
// | relative        | anchor graffiti                 |
// | flex            | flex child behavior             |
// | flex-1          | fill remaining space            |
// | min-h-0         | allow scrolling child to shrink |
// | overflow-hidden | prevent document overflow       |

export default function SiteLayout({ children }) {
  return (
    <main className="flex flex-1 min-h-0 overflow-hidden">
      <Graffiti />
      <ScrollContainer>{children}</ScrollContainer>
    </main>
  )
  return <div className="relative flex flex-1 min-h-0 overflow-hidden"></div>
}

// Every child layout and page must look like this.
export function Page() {
  return <div className="mx-auto w-full max-w-4xl px-6 py-10">...</div>
}

// body
// ↓
// ScrollContainer
// min-h-0 overflow-hidden your system breaks again. That is not exaggeration.

// Horizontal regions?
// <div className="flex flex-1 min-h-0 overflow-hidden">
// Fill regions?
// <div className="flex-1 min-w-0 min-h-0 overflow-hidden">
