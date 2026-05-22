---
draft: false
date: '2024-07-31'
title: 'System Design: Bit.ly'
summary: 'A concise guide to the essential principles of system design, covering scalability, reliability, maintainability, availability, and trade-offs. This post introduces the core building blocks you need to design robust, efficient, and scalable systems—crucial knowledge for system design interviews.'
tags: ['system design']
---

# Introduction

## 1. Requirements

### Functional Requirements

- As a user I navigate I can enter a URL and get a shortened URL
- As a user if I navigate to the shortened URL I'm redirected to the original URL I entered

## Generate UIDs

```js
// 1. Use Hashing(ensures same url gets same shortened URL)
const crypto = require('crypto');

function hashUrl(url, length = 7) {
  const hash = crypto.createHash('sha256').update(url).digest('base64url');
  return hash.slice(0, length);
}

// 2. Use Id
const urlToId = new Map();
const idToUrl = new Map();
let counter = 1000;

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function toBase62(num) {
  let str = '';
  while (num > 0) {
    str = BASE62[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str || '0';
}

function shortenUrl(url) {
  if (urlToId.has(url)) {
    return toBase62(urlToId.get(url));
  }

  const id = counter++;
  urlToId.set(url, id);
  idToUrl.set(id, url);
  return toBase62(id);
}

function expandShortCode(shortCode) {
  const id = parseInt(shortCode, 62);
  return idToUrl.get(id);
}
```

## Flip Key/Values

```js
function flipSelective(obj) {
  const flipped = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'number' || typeof value === 'string') {
      flipped[value] = key;
    } else {
      flipped[key] = value;
    }
  }
  return flipped;
}
```

## API Endpoint

```js
const express = require('express');
const app = express();

const urlMap = {
  'uid-123': 'https://example.com/some-long-url',
  'uid-456': 'https://google.com',
};

app.get('/:uid', (req, res) => {
  const { uid } = req.params;
  const redirectUrl = urlMap[uid];

  if (redirectUrl) {
    return res.redirect(302, redirectUrl);
  }

  res.status(404).send('URL not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
