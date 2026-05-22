---
draft: false
isDev: true
date: '2030-01-01'
title: 'DEV: Code blocks'
summary: 'TESTING of code blocks rendering'
tags: ['DEV']
---

## Code Block

### Python

```py
def hello_world():
  print('hi')
```

### Javascript

```js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: '#foo' });
  }
}
```

### JSX

```jsx
import Link, { LinkProps } from 'next/link';

export function SafeLink({ href, children, className, ...props }) {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}
```

### TSX

```tsx
import Link, { LinkProps } from 'next/link';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type SafeLinkProps = Partial<LinkProps> &
  ComponentPropsWithoutRef<'a'> & {
    children: ReactNode;
  };

export function SafeLink({ href, children, className, ...props }: SafeLinkProps) {
  if (!href || typeof href !== 'string') {
    return (
      <span className={fallbackStyles} {...props}>
        {children}
      </span>
    );
  }

  return (
    <Link className={baseLinkStyles} href={href} {...props}>
      {children}
    </Link>
  );
}
```

## Decorations

### Titles (js:fancyAlert.js)

```js:fancyAlert.js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: '#foo' })
  }
}
```

### Line Numbers (js showLineNumbers)

```js showLineNumbers
var twoSum = function (nums, target) {
  var map = {};
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let diff = target - num;
    if (map.has(diff)) {
      return [i, map.get(diff)];
    }
    map.set(num, i);
  }
};
```

### Show Line Highlight (js {1-5} showLineNumbers)

```js {1-4} showLineNumbers
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});
```
