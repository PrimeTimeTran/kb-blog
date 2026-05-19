---
draft: true
date: '2025-09-11'
title: 'x'
summary: 'x'
tags: ['']
---

- Start an instance

```sh
gcloud sql instances patch stockvibes-pg-dev \
  --project=stockvibes-dev \
  --activation-policy ALWAYS
```

- Delete deletion protection

```sh
gcloud sql instances patch stockvibes-pg-dev \
  --project=stockvibes-dev \
  --no-deletion-protection
```
