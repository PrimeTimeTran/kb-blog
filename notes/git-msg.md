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

I need to update a function, preprocessEmbeds. It receives source code and an index as 
arguments. Index is a registry of files in my system with file names & paths in an object.

The keys look like the following example.

- 0.mdx-pipeline-preview/0.page2
- 0.mdx-pipeline-preview/0.page2

Here's an example of the value of one of those keys.

It's got more .md source, in `mdxSource`. We want 

```jsx
{ "mdxSource": "\n- ![[page1.md]]\n- [[theme2.md]]\n\n# Internal Doc\n\n- ....", "frontMatter": { "draft": false, "isDev": true, "slug": "preview/page1", "date": "2026-04-30", "title": "Preview: Page 1", "summary": "Preview of page 1", "tags": [ "KB/MD/Obsidian/Blog" ] }, "slug": "0.preview/page1" }
```
