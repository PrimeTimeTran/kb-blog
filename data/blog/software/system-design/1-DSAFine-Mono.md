---
draft: true
date: 2025-05-08
title: 'System Design: Monorepo'
tags: ['system design']
summary: 'x'
---

Create a mono repo to share project code while maintaining the ability to build & deploy both apps separately.

```sh
monorepo/
│   .git        # Manages Monorepo
├── client/     # Flutter app
│   └── .git    # Separate git repo with its own remote
├── server/     # Nuxt.js app
│   └── .git    # Separate git repo with its own remote
└── README.md   # Optional parent repo metadata
```
