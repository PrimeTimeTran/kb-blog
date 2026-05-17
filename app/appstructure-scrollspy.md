```html
<body class="h-full overflow-hidden">
  <div class="flex h-full flex-col">
    <!-- app shell -->
    <div class="flex flex-1 min-h-0 overflow-hidden">
      <!-- sidebar -->
      <aside class="w-64 shrink-0"></aside>

      <!-- center region -->
      <div class="flex flex-1 min-h-0 flex-col overflow-hidden">
        <!-- navbar -->
        <header class="shrink-0"></header>

        <!-- route region -->
        <main class="flex flex-1 min-h-0 overflow-hidden">
          <!-- graffiti -->
          <Graffiti />

          <!-- ONLY SCROLLER -->
          <BaseScroll>
            <!-- safe wrapper -->
            <div class="flex flex-col min-h-full">
              <!-- another wrapper -->
              <div class="flex-1">
                <!-- centered content -->
                <div class="mx-auto w-full max-w-4xl px-6 py-10">PAGE CONTENT</div>
              </div>
            </div>
          </BaseScroll>
        </main>
      </div>
    </div>
  </div>
</body>
```

```jsx
// layout
export default async function AppLayout({ children }) {
  return (
    <html className="h-full">
      <body className="h-full overflow-hidden">
        <ScrollProvider>
          <AppShell>
            <div className="flex h-full flex-col bg-background text-on-background">
              <div className="flex h-full flex-col bg-background text-on-background">
                <div className="flex h-full flex-col bg-background text-on-background">
                  <div className="flex flex-1 min-h-0">{children}</div>
                </div>
              </div>
            </div>
          </AppShell>
        </ScrollProvider>
      </body>
    </html>
  )
}

// app/page.jsx
export default async function Page() {
  const posts = (await content.list({ type: 'blog' })) || []
  if (!posts) return null
  return (
    <main className="relative flex flex-1 min-h-0 overflow-hidden">
      <Graffiti />
      <BaseScroll>
        <div className="mx-auto w-full max-w-4xl px-6 py-10">
          <PageClient posts={posts || []} />
        </div>
      </BaseScroll>
    </main>
  )
}


// scroll container.jsx
'use client'

import { useScroll } from '@/providers/ScrollProvider'

export function ScrollContainer({ children }) {
  const { setScrollEl } = useScroll()

  return (
    <div
      ref={setScrollEl}
      className="
        flex-1
        min-h-0
        overflow-y-auto
      "
      // style={{ contain: 'layout paint' }}
    >
      {children}
    </div>
  )
}

```

<!--
<style>
  @import url('https://googleapis.com');

  .graffiti-text {
    font-family: 'Permanent Marker', cursive;
    font-size: 80px;
    color: #ff00de; /* Vibrant fill color */
    text-shadow:
      2px 2px 0px #000,   /* Thin black outline */
      4px 4px 0px #333,   /* Inner shadow for 3D effect */
      8px 8px 15px rgba(0,0,0,0.5); /* Soft drop shadow */
    transform: rotate(-5deg); /* Slanted "throw-up" look */
  }
</style>

<h1 class="graffiti-text">STREET ART</h1> -->
