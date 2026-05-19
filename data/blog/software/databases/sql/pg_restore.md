---
draft: true
date: '2025-09-10'
title: 'x'
summary: 'x'
tags: ['']
---

- Local DB setup & restore.

```sh
dropdb -U postgres cerberus_local
createdb -U postgres stockvibes
pg_restore --no-owner --no-privileges -U postgres -d stockvibes dev_db.dump
```
