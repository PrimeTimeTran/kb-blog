---
draft: true
date: '2021-11-21'
title: 'ES5 vs ES6'
summary: 'ES5 vs ES6 var vs let'
tags: ['programming fundamentals', 'javascript']
---

## ES5 vs ES6

### Intro

`var` vs `let`

The variables that are defined with `var` statement have function scope.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3, 3, 3
  }, 2000);
}
```

The variables that are defined with let statement have block scope.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2
  }, 2000);
}
```

Using `let` also introduces [temporal dead zones](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz).

Referencing bar before it's been declare won't throw an error whereas foo does.

```js
{
  // TDZ starts at beginning of scope
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2; // End of TDZ (for foo)
}
```
