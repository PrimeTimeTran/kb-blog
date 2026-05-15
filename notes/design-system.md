Alright I'm planning my selectors/globals/themes right now so talk me through this.
I think that every HTML page has one body tag.
So I wnt to say, I can bet my life, if I properly structure
my .css files I will never ever be confused with my body gets it's bg color from

  <!-- --background derived from theme.css & light/dark mode. -->

```css
body {
  color: var(--on-background)
  background-color: var(--background)
}
```

Assume we agree above is ok. I think I want to define the following

```css
body {
  color: var(--on-background)
  background-color: var(--background)
}
.surface {
  color: var(--on-surface);
  background-color: var(--surface);
}
```

My goal with this example is, I never ever want to run in the situation again, that when i switch
mode, the text disappears (excluding edge cases which I'll discuss shortly if you think this covers 99+% of cases)

bg < surface
body < div < p, h1, h2, h3, h4, h5, h6

bg < on-background
nav < a
