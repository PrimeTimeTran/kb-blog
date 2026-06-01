## Staged

| ✅  | 🆔 Name                                        |
| --- | ---------------------------------------------- |
|     | 👍 DONE:                                       |
|     | --------------------------------------------   |
| [ ] |                                                |
|     | --------------------------------------------   |
|     | ☑️ TODO:                                       |
|     | --------------------------------------------   |
| [ ] |                                                |
|     | --------------------------------------------   |
|     | 🐛 BUGS:                                       |
|     | --------------------------------------------   |
| [ ] |                                                |
|     | --------------------------------------------   |
|     | ⚠️ TRY:                                        |
|     | --------------------------------------------   |
| 👎  |                                                |
|     |                                                |
| ✅  | 🆔 Name                                        |
| --- | --------------------------------------------   |
| [x] | Add mega menu                                  |
| [x] | Add feature flags                              |
| [x] | Add drop down IDE preview                      |
| [x] | Vercel: Update path/root strategy to fix build |
| [x] | Fix HMR scroll reset for exhibit preview       |
| [x] | Unify cmd palette. Add shortcuts               |
| [x] |                                                |
| [x] |                                                |
| [ ] |                                                |
| [ ] |                                                |
| [ ] |                                                |
| [ ] |                                                |
| [ ] |                                                |
|     | --------------------------------------------   |
|     | ☑️ TODO:                                       |
|     | --------------------------------------------   |
|     | --------------------------------------------   |
|     | 🐛 BUGS:                                       |
|     | --------------------------------------------   |
| [ ] |                                                |
|     | --------------------------------------------   |
|     | ⚠️ TRY:                                        |
|     | --------------------------------------------   |
| 👎  | Remove inline MDX component inside of .mdx     |
|     |                                                |
|     |                                                |
|     |                                                |
|     |                                                |
|     |                                                |
|     |                                                |
|     |                                                |

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

```js
{
    "slug": [
        "2-react"
    ],
    "root": "2-react",
    "files": {
        "1-fix-hydration-mismatch/window-inner-width/1-problem.tsx": {
            "content": "...",
            "language": "jsx"
        },
        "1-fix-hydration-mismatch/window-inner-width/1-solution.tsx": {
            "content": "...",
            "language": "jsx"
        },
        "README.md": {
            "content": "",
            "language": "md"
        },
        "page.tsx": {
            "content": "...",
            "language": "jsx"
        },
        "todo.tsx": {
            "content": "...",
            "language": "jsx"
        }
    },
    "tree": [
        {
        },
        {
        },
        {
        },
        {
        },
    ],
    "entries": [
        "1-fix-hydration-mismatch/window-inner-width/1-problem.tsx",
        "1-fix-hydration-mismatch/window-inner-width/1-solution.tsx",
        "README.md",
        "page.tsx",
        "todo.tsx"
    ],
    "extensions": [
        "tsx",
        "md"
    ],
    "hasApp": false,
    "hasPage": true,
    "projectType": "next",
    "runtime": {
        "framework": "next",
        "entry": null,
        "assets": [
            {
                "type": "html",
                "path": "@/pkg/exhibit/templates/next/shell.html"
            },
            {
                "type": "script",
                "path": "@/pkg/exhibit/templates/next/runtime.js"
            },
            {
                "type": "script",
                "path": "@/pkg/exhibit/templates/next/mount.js"
            }
        ]
    },
    "seeds": {
        "framework": "next",
        "files": [
            {
                "path": "index.ts",
                "content": "export * from './initial';\n",
                "type": "script"
            },
            {
                "path": "initial.tsx",
                "content": "...",
                "type": "script"
            },
            {
                "path": "shell.html",
                "content": "...",
                "type": "html"
            }
        ],
        "entry": "shell.html"
    }
}
```
