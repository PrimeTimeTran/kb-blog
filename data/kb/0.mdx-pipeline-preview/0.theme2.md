---
draft: false
slug: preview/theme1
date: '2026-04-30'
title: 'Preview: Theme 2'
summary: ''
tags: ['KB/MD/Obsidian/Blog']
isDev: true
---

# Theme 2

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
```html showLineNumbers
<html>
  <head></head>
</html>
```

#### Code Tab Group
- starts with <code>\`\`\`tabgroup</code> and ends with <code>\`\`\`</code>
- define each language with opening ...py`  and closing `...`

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
> ![[theme1.md]]

> [!question]- Question Callout
> ![[theme1.md]]

> [!warning]- Warning Callout
> ![[theme1.md]]

> [!failure]- Failure Callout
> ![[theme1.md]]

> [!danger]- Danger Callout
> ![[theme1.md]]

> [!bug]- Bug Callout
> ![[theme1.md]]

> [!example]- Example Callout
> ![[theme1.md]]

> [!quote]- Quote Callout
> ![[theme1.md]]

## Links

- External(Note) Links
    - [[theme1.md]]
        - theme1.md note
    - [[theme1.md]]
        - theme1.md with capitalized display text.
    - [[theme1.md#Markdown Elements|Another Note]]
        - theme1.md and section.
    - [[theme1#Lists|theme1 > Lists]]
        - `note#Header|Display Text`
        - Aliased with ending `|`
    - [[theme1#Block Quote|theme1 > Block Quote > Single]]
        - "Breadcrumbs"
    - [[theme1#Code|theme1 > Code]]
        - "Note with Heading"
    - [[theme1#Code#Code Block|theme1 > Code > Code Block]]
        - "Note with Heading breadcrumb"
    - [[tool/obsidian/preview/theme1.md]]
        - Path link.
    - [[tool/obsidian/preview/theme1.md|Theme 2 Preview]]
        - Path link aliased.
- External(Web) Links
    - Link to URL: [OpenAI](https://openai.com)
    - Link with titles: [Wikipedia](https://wikipedia.org 'Free encyclopedia')
    - Reference link: [Google][2]


# Reference

[^1]: https://www.markdownguide.org/basic-syntax/#code

[2]: https://google.com
