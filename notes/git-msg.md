## Staged

| ✅  | 🆔 Name                                                                  |
| --- | ------------------------------------------------------------------------ |
|     | 👍 DONE:                                                                 |
|     | --------------------------------------------                             |
| [ ] |                                                                          |
|     | --------------------------------------------                             |
|     | ☑️ TODO:                                                                 |
|     | --------------------------------------------                             |
| [ ] |                                                                          |
|     | --------------------------------------------                             |
|     | 🐛 BUGS:                                                                 |
|     | --------------------------------------------                             |
| [ ] |                                                                          |
|     | --------------------------------------------                             |
|     | ⚠️ TRY:                                                                  |
|     | --------------------------------------------                             |
| 👎  |                                                                          |
|     |                                                                          |
| ✅  | 🆔 Name                                                                  |
| --- | --------------------------------------------                             |
|     | Live Editor                                                              |
| [x] | - Add isPublishedTests                                                   |
| [x] | - Add pipeline tests                                                     |
| [x] | -                                                                        |
| [x] | -                                                                        |
| [x] | - Overlay                                                                |
| [x] | - Text Animated                                                          |
| [x] | - Indicated by size, brightness, icon                                    |
| [x] | - Previews workspace on rail item hover                                  |
| [x] | - Changes active workspace on click                                      |
| [x] | - Renders pages                                                          |
| [x] | -                                                                        |
| [x] | -                                                                        |
| [x] | - Next 16.2.6                                                            |
| [x] | - Learn how to fix hydration warning using dynamic                       |
| [x] | - Learn how to use slots for layout, @left, @right, layout.tsx, page.tsx |
| [x] | - WIP: Base Navbar                                                       |
| [x] |                                                                          |
| [x] |                                                                          |
| [x] |                                                                          |
| [x] |                                                                          |
| [ ] |                                                                          |
| [ ] |                                                                          |
| [ ] |                                                                          |
| [ ] |                                                                          |
| [ ] |                                                                          |
| [ ] |                                                                          |
|     | --------------------------------------------                             |
|     | ☑️ TODO:                                                                 |
|     | --------------------------------------------                             |
|     | --------------------------------------------                             |
|     | 🐛 BUGS:                                                                 |
|     | --------------------------------------------                             |
| [ ] |                                                                          |
|     | --------------------------------------------                             |
|     | ⚠️ TRY:                                                                  |
|     | --------------------------------------------                             |
| 👎  | Remove inline MDX component inside of .mdx                               |
|     |                                                                          |
|     |                                                                          |
|     |                                                                          |
|     |                                                                          |
|     |                                                                          |
|     |                                                                          |
|     |                                                                          |

Give me however many "page" components needed to demonstrate this again.
I will make a new page and store all these functions.

I want all these components.

```
export default Root() {
  <!-- Preview 1. Broken Scroll 1 context/stack/layer-->
  return (
    <Container1>
      <Page>
    </Container1>
  )
  <!-- Preview 2, Fixed Scroll 1 context/stack/layer-->
  return (
    <Container2>
      <Page2>
    </Container2>
  )
  <!-- Preview 3. Broken Scroll 2 context/stack/layer-->
  return (
    <Container3 z-index>
      <Page3 z Index...? 100?>
      <Page4>
    </Container3>
  )
  <!-- Preview 4, Fixed Scroll 2 context/stack/layer-->
  return (
    <Container4>
      <Page5>
      <Page6>
    </Container5>
  )
}
```

```jsx
<div className="flex h-full min-h-screen max-w-5xl px-3 mx-auto">
  <div className="flex-1 min-w-0 space-y-2">
    <header>
      <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-on-surface sm:text-4xl">{title}</h1>

      <p className="text-lg text-on-surface-variant">{subtitle}</p>
      <SearchBar
        metrics={metrics}
        value={searchTerm}
        sortField={sortField}
        sortOrder={sortOrder}
        onChange={setSearchTerm}
        setSortField={setSortField}
        setSortOrder={setSortOrder}
      />
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-linear-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-surface to-transparent" />

        <div className="my-2 mb-6 flex space-x-2 overflow-x-auto no-scrollbar">
          {Object.entries(TOPICS).map(([topic, tags]) => {
            const active = !filteredTopics.includes(topic);
            return (
              <TagButton
                key={topic}
                label={topic}
                active={active}
                tailDecoration={tags.length}
                onClick={() => toggleTag(topic)}
              />
            );
          })}
        </div>
      </div>
    </header>
    <Suspense fallback={<PostListSkeleton />}>{<PostList posts={posts} />}</Suspense>

    {pagination?.totalPages > 1 && !searchTerm && (
      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
    )}
  </div>
</div>
```
