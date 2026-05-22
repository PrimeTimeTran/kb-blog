Here are my pages contents

Page 2 with 2 links:

```md
# Page 2

![[page3.md]]
![[page1.md]]
I'm page 2 with many links
```

Page 3 with no links:

```md
# Page 3

I'm page 3 with no links
```

Page 1 with no links:

```md
# Page 1

I'm page 1 with no links
```

Here is the HTML that is produced.

```HTML
<div class="mdx-content relative z-10"><div class="prose dark:prose-invert px-3 no-scrollbar suppressHydrationWarning"><h1 id="page-2" class="text-4xl md:text-5xl font-black tracking-tight mt-8 mb-4 leading-tight text-primary scroll-mt-24">Page 2<a class="text-primary hover:text-primary-hover font-medium transition-colors duration-200 underline decoration-primary/30 hover:decoration-primary underline-offset-4 rounded px-1 -mx-1 hover:bg-primary/5" aria-hidden="true" tabindex="-1" href="#page-2"><span class="icon icon-link"></span></a></h1>
<h1 id="page-3" class="text-4xl md:text-5xl font-black tracking-tight mt-8 mb-4 leading-tight text-primary scroll-mt-24">Page 3<a class="text-primary hover:text-primary-hover font-medium transition-colors duration-200 underline decoration-primary/30 hover:decoration-primary underline-offset-4 rounded px-1 -mx-1 hover:bg-primary/5" aria-hidden="true" tabindex="-1" href="#page-3"><span class="icon icon-link"></span></a></h1>
<p>I'm page 3 with no links</p>
<h1 id="page-1" class="text-4xl md:text-5xl font-black tracking-tight mt-8 mb-4 leading-tight text-primary scroll-mt-24">Page 1<a class="text-primary hover:text-primary-hover font-medium transition-colors duration-200 underline decoration-primary/30 hover:decoration-primary underline-offset-4 rounded px-1 -mx-1 hover:bg-primary/5" aria-hidden="true" tabindex="-1" href="#page-1"><span class="icon icon-link"></span></a></h1>
<p>I'm page 1 with no links</p>
<p>I'm page 2 with many links</p></div></div>
```
