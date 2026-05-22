---
draft: true
date: '2022-10-17'
title: 'Regular Expressions'
tags: ['Regular Expressions']
summary: 'Regular Expressions for strings'
canonicalUrl:
---

## Regex

```js
const string = 'The price is $5.46 on books.';
const string2 = 'The price is $ 125.46 on books.';
const string3 = 'The price is $ 1025.46 on books.';
const string4 = 'The price is $ 1,025.46 on books.';
const string5 = 'The price is $ 100,100,100.50 on books.';
const string6 = 'The price is USD 100.00 on books.';
const string7 = 'The price is USD 10 on books.';
const string8 = 'The price is $10 on books.';

function testRegEx(s) {
  const pattern = /(\$|usd|USD)?\s?[\d,.]+(\.[\d][\d])?/;
  return pattern.exec(s);
}

console.log(testRegEx(string));
console.log(testRegEx(string2));
console.log(testRegEx(string3));
console.log(testRegEx(string4));
console.log(testRegEx(string5));
console.log(testRegEx(string6));
console.log(testRegEx(string7));
console.log(testRegEx(string8));
```
