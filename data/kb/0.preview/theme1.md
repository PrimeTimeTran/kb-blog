---
draft: false
slug: preview/theme1
date: '2026-04-30'
title: 'Preview: Theme 1'
summary: ''
tags: ['KB/MD/Obsidian/Blog']
isDev: true
---

# Theme 1

## Table of Contents (TOC)

- [[#Markdown Elements]]
  - [[#Lists]]
    - [[#Ordered/Numbered]]
    - [[#Unordered]]
  - [[#Emphasis]]
  - [[#Block Quote]]
    - [[#Single]]
    - [[#Nested]]
      - [[#With Elements]]
    - [[#Code]]
    - [[#CSS]]
    - [[#Callouts]]
- [[#Links]]

## Markdown Elements

### Emphasis

This line has an _italic_.
This line has a **bold**.
This line has an ~~strikethrough~~.

### Lists

#### Ordered/Numbered

1. text emphasis
   - italic
   - bold
   - strikethrough
2. block quotes
3. code
4. css
5. reference links to sources^[https://www.markdownguide.org/basic-syntax/#code]

#### Unordered

- ideas
- concepts
- thoughts

### Block Quote

#### Single

> "If it was easy everyone would do it."

> "If it was easy everyone would do it."
>
> - unknown

#### Nested

> Then why aren't you doing it?
>
> > "If it was easy everyone would do it."

#### With Elements

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>   _Everything_ is going according to **plan**.

### Code

#### Code Block

```html
<html>
  <head></head>
</html>
```

#### MDX & KB Obsidian
```js showLineNumbers
function helloWorld() {
    console.log('Hi')
}
```

#### Code Tab Group
- starts with <code>\`\`\`tabgroup</code> and ends with <code>\`\`\`</code>
- define each language with opening `:::py`  and closing `:::`

> [!tip]- Create Code Tab Group
> ![[kb-dsl-code-tab-group]]

### Callouts

> [!note]- Note Callout
>
> ```js
> function helloWorld() {
>   console.log('hi')
> }
> ```

> [!info]- Info Callout
>
> - Bullet 1
> - Bullet 2
> - Bullet 3

> [!tip]- Tip Callout
>
> 1. Bullet 1
> 2. Bullet 2
> 3. Bullet 3

> [!success]- Success Callout
> ![[theme2.md]]

> [!question]- Question Callout
> ![[theme2.md]]

> [!warning]- Warning Callout
> ![[theme2.md]]

> [!failure]- Failure Callout
> ![[theme2.md]]

> [!danger]- Danger Callout
> ![[theme2.md]]

> [!bug]- Bug Callout
> ![[theme2.md]]

> [!example]- Example Callout
> ![[theme2.md]]

> [!quote]- Quote Callout
> ![[theme2.md]]

## Links

- External(Note) Links
    - [[theme2.md]]
        - theme2.md note
    - [[Theme2.md]]
        - theme2.md with capitalized display text.
    - [[theme2.md#Markdown Elements|Another Note]]
        - theme2.md and section.
    - [[theme2#Lists|theme2 > Lists]]
        - `note#Header|Display Text`
        - Aliased with ending `|`
    - [[theme2#Block Quote|theme2 > Block Quote > Single]]
        - "Breadcrumbs"
    - [[theme2#Code|theme2 > Code]]
        - "Note with Heading"
    - [[theme2#Code#Code Block|theme2 > Code > Code Block]]
        - "Note with Heading breadcrumb"
    - [[tool/obsidian/preview/theme2.md]]
        - Path link.
    - [[tool/obsidian/preview/theme2.md|Theme 2 Preview]]
        - Path link aliased.
- External(Web) Links
    - Link to URL: [OpenAI](https://openai.com)
    - Link with titles: [Wikipedia](https://wikipedia.org 'Free encyclopedia')
    - Reference link: [Google][2]
  - 
# Reference

[^1]: https://www.markdownguide.org/basic-syntax/#code

[2]: https://google.com
