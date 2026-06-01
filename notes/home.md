## Focused

- [ ] KS Projects:
  - [ ] - Add /projects/name route with more details about the project
  - [ ] - Add "images" tab. Lightbox/Light Gallery/Photo Swipe/Fancy Box/BaguetteBox
- [ ] KS Remix:
  - [ ] - Inject footer
  - [ ] - Inject term preview
  - [ ] - Inject citations(bottom of pages)
  - [ ] - Inject citations(bottom of pages)
- [ ] KS - Term generation:
  - [ ] - Caching
  - [ ] - Whitelist groups of terms per page(so and/or from SQL doesn't match everywhere)
  - [ ] - Tag suggestions. Suggest tags which are manually reviewed

## Blocked

```jsx
'use client'
// ./app/shell/layout.tsx
export default function Layout({ children }) : React.PropsWithChildren {
  return (
    <div>
      <div>Left</div>
      {children}
    </div>
  )
}


export default function Layout({ children }) : React.PropsWithChildren {
  return (
    <div>
      {children}
      <div></div>
    </div>
  )
}
```
