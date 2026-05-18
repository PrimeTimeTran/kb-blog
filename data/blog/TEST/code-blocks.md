---
draft: true
isDev: true
date: '2030-01-01'
title: 'DEV: Code blocks'
summary: 'TESTING of code blocks rendering'
tags: ['DEV']
---

## Code Block (js)

```js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: '#foo' })
  }
}
```

```py
def hello_world():
  print('hi')
```

## Code Block with Title (js:fancyAlert.js)

```js:fancyAlert.js
function fancyAlert(arg) {
  if (arg) {
    $.facebox({ div: '#foo' })
  }
}
```

## Show Line Numbers (js showLineNumbers)

```js showLineNumbers
var twoSum = function (nums, target) {
  var map = {}
}
```

## Show Line Numbers (js {1-5} showLineNumbers)

```js {1-4} showLineNumbers
import mongoose, { Schema } from 'mongoose'
import { Auditor } from './Audit'

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
})
```
