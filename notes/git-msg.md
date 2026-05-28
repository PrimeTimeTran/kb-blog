## Staged

| ✅  | 🆔 Name                                       |
| --- | --------------------------------------------- |
|     | 👍 DONE:                                      |
|     | --------------------------------------------  |
| [ ] |                                               |
|     | --------------------------------------------  |
|     | ☑️ TODO:                                      |
|     | --------------------------------------------  |
| [ ] |                                               |
|     | --------------------------------------------  |
|     | 🐛 BUGS:                                      |
|     | --------------------------------------------  |
| [ ] |                                               |
|     | --------------------------------------------  |
|     | ⚠️ TRY:                                       |
|     | --------------------------------------------  |
| 👎  |                                               |
|     |                                               |
| ✅  | 🆔 Name                                       |
| --- | --------------------------------------------  |
|     | Vercel Build                                  |
| [x] | SVG Sprite for tree icons                     |
| [x] | Add Global Overlays(Cmd/Help)                 |
| [x] | Add Global Exhibit Layout to /kb              |
| [x] | Squash /lib with barrel files & .js to .ts    |
| [x] | Refactored walk implementations               |
| [x] | Consolidated Treeview for /kb and /playground |
| [x] | Update mini-react, n-queens,                  |
| [x] |                                               |
| [x] |                                               |
| [x] |                                               |
| [x] |                                               |
| [x] | Add Design System Base                        |
| [x] | Add Several Exhibits                          |
| [x] |                                               |
| [x] |                                               |
| [x] |                                               |
| [x] | Update three column layout for KB layout      |
| [x] | Fix DSA Tooltip styling                       |
| [x] |                                               |
| [x] |                                               |
| [x] |                                               |
| [x] |                                               |
| [x] |                                               |
| [x] |                                               |
| [ ] |                                               |
| [ ] |                                               |
| [ ] |                                               |
| [ ] |                                               |
| [ ] |                                               |
|     | --------------------------------------------  |
|     | ☑️ TODO:                                      |
|     | --------------------------------------------  |
|     | --------------------------------------------  |
|     | 🐛 BUGS:                                      |
|     | --------------------------------------------  |
| [ ] |                                               |
|     | --------------------------------------------  |
|     | ⚠️ TRY:                                       |
|     | --------------------------------------------  |
| 👎  | Remove inline MDX component inside of .mdx    |
|     |                                               |
|     |                                               |
|     |                                               |
|     |                                               |
|     |                                               |
|     |                                               |
|     |                                               |

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
