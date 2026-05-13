---
draft: false
slug: tool/grep/search-cheatsheet
date: "2026-05-03"
title: "Grep for searching the file system"
summary: "Reference table for grep cli command and flags"
tags: ["grep", "file system", "cli", "linux"]
---

# 📋 Cheat Sheet
    
| 👨🏻‍💻 Command                          | 🆔 Name                 | ℹ️ Desc                        |
| ----------------------------------- | ----------------------- | ------------------------------ |
| `grep -r "term" .`                  | recursive search        | search all files for a string  |
| `grep -rn "term" .`                 | line number search      | show matches with line numbers |
| `grep -ri "term" .`                 | case-insensitive search | ignore uppercase/lowercase     |
| `grep -r "term" lib/`               | directory search        | search only inside a folder    |
| `grep -r "term" . --include="*.js"` | file type filter        | search only JS files           |
| `grep -rL "term" .`                 | inverse file search     | show files WITHOUT match       |
| `grep -rl "term" .`                 | file list search        | show only filenames with match |
| `grep -rc "term" .`                 | match count per file    | count matches in each file     |
| `grep -r -C 2 "term" .`             | context search          | show surrounding lines         |
| `grep -r -A 2 "term" .`             | after context           | show lines after match         |
| `grep -r -B 2 "term" .`             | before context          | show lines before match        |
| `grep -rE "a\|b\|c" .`              | multiple patterns       | match any of several terms     |
| `grep -rw "term" .`                 | whole word search       | match exact word only          |
| `grep -rF "term" .`                 | literal search          | treat pattern as plain text    |
| `grep -ro "term" .`                 | output matches only     | print only matching text       |

## 🔍 Search (basic text search)

Search recursively for a string.

```sh id="g1"
grep -r "buildPipeline" .
```

---

## 📁 Search in specific file types

Limit by extension using `--include`.

```sh id="g2"
grep -r "log" . --include="*.js"
```

---

## 🔤 Case-insensitive search

Ignore upper/lowercase differences.

```sh id="g3"
grep -ri "registry" .
```

---

## 📍 Search in a specific directory

Only scan a folder.

```sh id="g4"
grep -r "terms" lib/
```

---

## 🚫 Exclude directories

Skip folders like `node_modules`.

```sh id="g5"
grep -r "build" . --exclude-dir=node_modules
```

---

## 📄 Show line numbers

Helpful for jumping to matches.

```sh id="g6"
grep -rn "backlinks" .
```

---

## 🎯 Match whole words only

Avoid partial matches.

```sh id="g7"
grep -rw "log" .
```

---

## 📂 Show only filenames

List files containing the match.

```sh id="g8"
grep -rl "buildPipeline" .
```

---

## ❌ Invert match (files WITHOUT pattern)

Find files that do NOT contain something.

```sh id="g9"
grep -rL "log.content" .
```

---

## 🧮 Count matches per file

Show how many matches per file.

```sh id="g10"
grep -rc "registry" .
```

---

## 🧠 Multiple patterns (OR search)

Match any of the patterns.

```sh id="g11"
grep -rE "registry|backlinks|terms" .
```

---

## 🧭 Show context around matches

Include lines before/after matches.

```sh id="g12"
grep -r -C 2 "buildPipeline" .
```

---

## ⚡ Search literal string (no regex)

Treat pattern as plain text.

```sh id="g13"
grep -rF "a.b.c" .
```

---

## 🧾 Show only matching text (not full line)

Print only the match itself.

```sh id="g14"
grep -ro "buildPipeline" .
```

---

## 🧱 Combine useful flags (real-world style)

Typical “debug everything” command:

```sh id="g15"
grep -rinC 2 "log" .
```

---

## 🧠 Mental model (important difference vs rg)

```txt id="model1"
grep → older, very flexible, everywhere available
rg   → faster, smarter defaults, modern dev UX
```
