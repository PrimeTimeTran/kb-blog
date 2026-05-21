'use client'

export default function Layout({ children, left, right }) {
  return (
    <div className="flex w-full h-full">
      <div className="flex">{left}</div>
      <div className="flex-2 ">{children}</div>
      <div className="flex">{right}</div>
    </div>
  )
}

// This is a three column layout which I think could serve a lot of use cases.
// I'm considering making this the basis for the playground route segment.
// Good or bad idea?

// I want to eventually have this guy be able to overlay kb/blogs/etc, so users can "expand up"
// and see an editor and playground while in the same view basically
// So I wanna say this should be really easy to do sorta. I either make it a layer over all other screens, or wrap all other screens in this guy eventually and
// it able to reveal a toolbar or bottom panel or right preview etc.
