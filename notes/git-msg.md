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

My objective here is to understand this more deeply. There's so many moving parts.
Z-index, stack context, inset reset? I want to begin documenting this for the rest of my life with examples in one place so I can fix this issue myself in the future like I do CSS
