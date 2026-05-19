---
draft: true
date: '2025-04-20'
title: 'System Design: Build a database cluster with primary(master) & read replica(slave)'
summary: 'x'
tags: ['system design', 'docker', 'postgres']
---

## Installation

```sh
brew services list | grep postgres
```

```sh
brew services start postgresql@16
```

```sh
brew services stop postgresql@16
```

```sh
initdb /opt/homebrew/var/postgresql@16
```

- Create DB

```sh
createdb future
```

## Shell(REPL) CLI.

- Get shell into DB(REPL).

```sh
psql
```
