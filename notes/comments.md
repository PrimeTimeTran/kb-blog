---
draft: true
date: '2024-09-06'
title: 'x'
summary: 'x'
tags: ['']
---

## VSCode

```jsx
{
      "better-comments.tags": [
    {
      "tag": "//",
      "color": "#6272a4",
      "strikethrough": true,
      "underline": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "EXPLANATION:",
      "color": "#ff70b3",
      "strikethrough": false,
      "underline": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "TODO:",
      "color": "#ffc66d",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "FIXME:",
      "color": "#ff6e6e",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "BUG:",
      "color": "#f8f8f2",
      "strikethrough": false,
      "backgroundColor": "#bb80ff",
    },
    {
      "tag": "HACK:",
      "color": "#ffffa5",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "NOTE:",
      "color": "#94f0ff",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "INFO:",
      "color": "#c798e6",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "IDEA:",
      "color": "#80ffce",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "DEBUG:",
      "color": "#ff2975",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "WHY:",
      "color": "#ff9580",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "WHAT THIS DO:",
      "color": "#FBBF24",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "CONTEXT:",
      "color": "#d8ff80",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "CRITICAL:",
      "color": "#FFFFFF",
      "strikethrough": false,
      "backgroundColor": "#9F1239",
    },
    {
      "tag": "REVIEW:",
      "color": "#A5B4FC",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "OPTIMIZE:",
      "color": "#4ADE80",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "SECTION:",
      "color": "#f1a18e",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "NEXT STEP:",
      "color": "#ba6645",
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
    {
      "tag": "SECURITY:",
      "color": "#cff028",
      "strikethrough": false,
      "backgroundColor": "#44475a",
    },
    {
      "tag": "PERFORMANCE:",
      "color": "#d7ffad",
      "strikethrough": false,
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
      "strikethrough": false,
      "backgroundColor": "transparent",
    },
  ],
  "todo-tree.tree.scanAtStartup": true,
  "todo-tree.highlights.enabled": true,
  "todo-tree.general.tags": [
    "EXPLANATION",
    "TODO",
    "todo",
    "BUG",
    "FIX",
    "FIXME",
    "fix",
    "fixme",
    "MARK",
    "mark",
    "trail",
    "ROUE",
    "route",
    "FLOW",
    "Flow",
    "flow",
    "note",
    "INFO",
    "info",
  ],
  "todo-tree.general.tagGroups": {
    "EXPLANATION": ["EXPLANATION", "todo"],
    "TODO": ["TODO", "todo"],
    "BUG": ["BUG", "FIX", "FIXME", "fix"],
    "FLOW": ["FLOW", "flow", "Flow", ""],
    "INFO": ["INFO", "info"],
    "MARK": ["MARK", "mark"],
    "NOTE": ["NOTE", "note"],
    "ROUTE": ["ROUTE", "route"],
  },
  "todo-tree.regex.regex": "((//|#|<!--|;|/\\*|^)((\\s+(!|\\?|\\*|\\-))?(\\s+\\[ \\])?|(\\s+(!|\\?|\\*)\\s+\\[.\\])?)\\s*($TAGS)\\s*\\:)|((<!--)\\s*($TAGS)\\b\\s*\\:?\\s*-->)",
  "todo-tree.highlights.customHighlight": {
    "EXPLANATION": {
      "icon": "checklist",
      "iconColour": "#f07229",
    },
    "TODO": {
      "icon": "checklist",
      "iconColour": "#f07229",
    },
    "ROUTE": {
      "icon": "checklist",
      "iconColour": "#4FE84F",
    },
    "MARK": {
      "icon": "bookmark",
      "iconColour": "#00bcd4",
    },
    "BUG": {
      "icon": "bug",
      "iconColour": "#ff0000",
    },
    "INFO": {
      "icon": "sun",
      "iconColour": "#d4de13",
    },
    "FLOW": {
      "icon": "link",
      "iconColour": "#4FE84F",
    },
    "NOTE": {
      "icon": "note",
      "iconColour": "#ce10d4",
    },
    "todo-tree.tree.labelFormat": "${tag:uppercase} ${after} [${filename}]",
    "todo-tree.tree.tooltipFormat": "${filename}:[${line}] in ${filepath}",
    "todo-tree.tree.sortTagsOnlyViewAlphabetically": true,
  },
}
```
