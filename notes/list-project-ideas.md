# Todo Tree/Better Comments Extension Idea

```md
// TODO:
// - [ ] top 123
// - [ ] top abc
// TODO:Product:
// - [ ] dev abc
// - [ ] dev 123
// TODO:Dev:
// - [ ] dev abc
// - [ ] dev 123
// TODO:3.Dev:
// - [ ] dev abc
// - [ ] dev 123
// TODO:2.Dev:
// - [ ] dev abc
// - [ ] dev 123
// TODO:1.Dev:
// - [ ] dev abc
// - [ ] dev 123

// BUG: TOC click causes page shift
// - [ ] 1. Left col shifts
// - [ ] 1. Right col shifts

// BUG: Page Shift
// - [ ] 1. Left col shifts
// - [ ] 1. Right col shifts
```

Given the above comments, Todo Tree doesn't do the following.

- 1. TOP LEVEL (unlabeled) tag group todos
  - Currently, appearance in todo tree viewer is by "discovery order.
    This makes labeling "flows" impossible/unreliable.
    There should be a way to make tags flow "in order" as if documenting data flow
    within a tag(for a feature for example)
  - Should be top/bottom or first/last in tree depending on ASC/DEC order

```jsx
// 1.
// TODO:01:
// - [ ] ...
// TODO:02:
// - [ ] ...
```

- 1. Styles of "- [ ]" and "[ ]" rows should their tag group.
     So the - [ ] and [ ] should match `BUG:` because they're nested below it.
  - Currently the [ ] and - [ ] are styled by `"better-comments.tags": []`

```jsx
// 2.
// TODO:
// - [ ] ...
```

- 3. Subgroup sorting ASC/DESC:

  ```jsx
  // TODO:Product:
  // - [ ] ...
  // TODO:Product[2]:
  // - [ ] ...
  // TODO:Product[1]:
  // - [ ] ...
  ```

  - Currently, the order is the order these tags are discovered.
  - TODO:Product[1] should be first in the product subgroup
  - TODO:Product[2] should be second in the product subgroup
  - TODO:Product should be first/las depending on ASC or DESC ordering

## Sidebar

- [ ] GroupTodo

## Sidebar

- [ ] Group

## Settings Currently

```json
  "better-comments.tags": [
    {
      "tag": "//",
      "color": "#6272a4",
      "strikethrough": true,
      "underline": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "!",
      "color": "#FF2D00",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false,
    },
    {
      "tag": "?",
      "color": "#3498DB",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false,
    },
    {
      "tag": "*",
      "color": "#98C379",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false,
    },
    {
      "tag": "[ ]",
      "color": "#ffc66d",
      "backgroundColor": "transparent",
    },
    {
      "tag": "- [ ]",
      "color": "#ffc66d",
      "backgroundColor": "transparent",
    },
    {
      "tag": "BUG:",
      "color": "#ff0000",
      "backgroundColor": "transparent",
    },
    {
      "tag": "EXPLANATION:",
      "color": "#ff70b3",
      "underline": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "TODO:",
      "color": "#ffc66d",
      "backgroundColor": "transparent",
    },

    {
      "tag": "FIXME:",
      "color": "#ff6e6e",
      "backgroundColor": "transparent",
    },
    {
      "tag": "HACK:",
      "color": "#ffffa5",
      "backgroundColor": "transparent",
    },
    {
      "tag": "NOTE:",
      "color": "#94f0ff",
      "backgroundColor": "transparent",
    },
    {
      "tag": "INFO:",
      "color": "#c798e6",
      "backgroundColor": "transparent",
    },
    {
      "tag": "IDEA:",
      "color": "#80ffce",
      "backgroundColor": "transparent",
    },
    {
      "tag": "DEBUG:",
      "color": "#ff2975",
      "backgroundColor": "transparent",
    },
    {
      "tag": "WHY",
      "color": "#ff9580",
      "backgroundColor": "transparent",
    },
    {
      "tag": "WHAT THIS DO:",
      "color": "#FBBF24",
      "backgroundColor": "transparent",
    },
    {
      "tag": "CONTEXT",
      "color": "#d8ff80",
      "backgroundColor": "transparent",
      "underline": true,
    },
    {
      "tag": "cases",
      "color": "#1F2937",
      "backgroundColor": "#B9D36A",
    },
    {
      "tag": "case",
      "color": "#D8FF80",
      "backgroundColor": "transparent",
    },
    {
      "tag": "means",
      "color": "#A780FF",
      "backgroundColor": "transparent",
    },
    {
      "tag": "behavior",
      "color": "#A780FF",
      "backgroundColor": "transparent",
    },
    {
      "tag": "purpose",
      "color": "#A780FF",
      "backgroundColor": "transparent",
    },
    {
      "tag": "core idea",
      "color": "#A780FF",
      "backgroundColor": "transparent",
    },
    {
      "tag": "steps",
      "color": "#A780FF",
      "backgroundColor": "transparent",
    },
    {
      "tag": "-",
      "color": "#6272a4",
      "backgroundColor": "transparent",
    },
    {
      "tag": "✔",
      "color": "#62A464",
      "backgroundColor": "transparent",
    },
    {
      "tag": "✖",
      "color": "#B5421C",
      "backgroundColor": "transparent",
    },
    {
      "tag": "CRITICAL:",
      "color": "#FFFFFF",
      "backgroundColor": "#181A89",
    },
    {
      "tag": "REVIEW:",
      "color": "#A5B4FC",
      "backgroundColor": "transparent",
    },
    {
      "tag": "OPTIMIZE:",
      "color": "#4ADE80",
      "backgroundColor": "transparent",
    },
    {
      "tag": "SECTION:",
      "color": "#f1a18e",
      "backgroundColor": "transparent",
    },
    {
      "tag": "NEXT STEP:",
      "color": "#ba6645",
      "backgroundColor": "transparent",
    },
    {
      "tag": "SECURITY:",
      "color": "#cff028",
      "backgroundColor": "#44475a",
    },
    {
      "tag": "PERFORMANCE:",
      "color": "#d7ffad",
      "backgroundColor": "transparent",
    },
    {
      "tag": "DEPRECATED:",
      "color": "#8b8098",
      "strikethrough": true,
      "backgroundColor": "#44475a",
    },
    {
      "tag": "API:",
      "color": "#c798e6",
      "backgroundColor": "transparent",
    },
  ],
  "todo-tree.tree.scanAtStartup": true,
  "todo-tree.highlights.enabled": true,
  "todo-tree.general.tags": [
    "TODO:",
    "BUG:",
    "EXPLANATION:",
    "FIX:",
    "FIXME:",
    "MARK:",
    "ROUTE:",
    "FLOW:",
    "INFO:",
    "[ ]",
    "- [ ]",
  ],
  "todo-tree.general.tagGroups": {
    "TODO:": ["TODO:", "[ ]", "- [ ]"],
    "BUG:": ["BUG:"],
    "FLOW:": ["FLOW:"],
    "INFO:": ["INFO:"],
    "MARK:": ["MARK:"],
    "ROUTE:": ["ROUTE:"],
    "EXPLANATION:": ["EXPLANATION:"],
  },
  "todo-tree.highlights.customHighlight": {
    "EXPLANATION:": {
      "icon": "info",
      "iconColour": "#ff70b3",
    },
    "TODO:": {
      "icon": "checklist",
      "iconColour": "#f07229",
    },
    "ROUTE:": {
      "icon": "checklist",
      "iconColour": "#4FE84F",
    },
    "MARK:": {
      "icon": "bookmark",
      "iconColour": "#00bcd4",
    },
    "BUG:": {
      "icon": "bug",
      "iconColour": "#ff0000",
    },
    "INFO:": {
      "icon": "sun",
      "iconColour": "#d4de13",
    },
    "FLOW:": {
      "icon": "link",
      "iconColour": "#4FE84F",
    },
    "NOTE:": {
      "icon": "note",
      "iconColour": "#ce10d4",
    },
    "todo-tree.tree.labelFormat": "${tag:uppercase} ${after} [${filename}]",
    "todo-tree.tree.tooltipFormat": "${filename}:[${line}] in ${filepath}",
    "todo-tree.tree.sortTagsOnlyViewAlphabetically": true,
  },
```
