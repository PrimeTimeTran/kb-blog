| Keys         | Command                                 | Category  | Context |
| ------------ | --------------------------------------- | --------- | ------- |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 1. 🧭 Movement                          |           |         |
| h            | move left                               | Movement  |         |
| j            | move down                               | Movement  |         |
| k            | move up                                 | Movement  |         |
| l            | move right                              | Movement  |         |
| 0            | beginning of line                       | Movement  |         |
| $            | end of line                             | Movement  |         |
| w            | start of next word                      | Movement  |         |
| b            | start of previous word                  | Movement  |         |
| e            | end of word                             | Movement  |         |
| gg           | jump to first line                      | Movement  |         |
| G            | jump to last line                       | Movement  |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 2. 🧭 Operators(Actions)                |           |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 3. 🧭 Text Objects(Scope)               |           |         |
| d            | delete                                  | Editing   |         |
| diw          | delete word                             | Editing   |         |
| dd           | delete line                             | Editing   |         |
| y            | yank (copy)                             | Editing   |         |
| yy           | yank line                               | Editing   |         |
| o            | new line below                          | Editing   |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 4. 🧭 Operators + Motions (The Grammar) |           |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 5. 🧭 Folds                             |           |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 6. 🧭 Marks & Jumps                     |           |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 7. 🧭 Search & Rules                    |           |         |
| /text        | search forward                          | Search    |         |
| ?text        | search backward                         | Search    |         |
| n            | next match                              | Search    |         |
| N            | previous match                          | Search    |         |
| \*           | search word under cursor                | Search    |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 8. 🧭 Registers & clipboard             |           |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 9. 🧭 Undo / Repeat                     |           |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 10. 🧭 Modes                            |           |         |
| v            | visual mode                             | Selection |         |
| Esc          | exit visual mode                        | Selection |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 11. 🧭 Window / Buffer / Tab Management |           |         |
|              |                                         |           |         |
|              |                                         |           |         |
| ⚡️⚡️⚡️⚡️⚡️⚡️ | 12. 🧭 Macos & Automation               |           |         |
|              |                                         |           |         |
|              |                                         |           |         |
|              |                                         |           |         |
|              |                                         |           |         |

Here’s a **tight 10-command Vim search mastery set** — no fluff, just what you’ll actually use.

---

# 🧠 Vim Search Mastery (10 Commands)

## 🔍 Core search

```txt id="1"
/term
```

→ search forward in file

```txt id="2"
?term
```

→ search backward

```txt id="3"
n
```

→ next match

```txt id="4"
N
```

→ previous match

---

## 🎯 Word-based search (fastest in practice)

```txt id="5"
*
```

→ search forward for word under cursor

```txt id="6"
#
```

→ search backward for word under cursor

---

## 🧹 Control search state

```txt id="7"
:noh
```

→ clear highlight

---

## 🎯 Line-level precision (underrated)

```txt id="8"
f<char>
```

→ jump to next char in line

```txt id="9"
t<char>
```

→ jump _before_ char

---

## 🌍 Multi-file (project-level)

```txt id="10"
:vimgrep /term/ **/*
```

→ search across files (fills quickfix list)

Then (paired with it):

```txt id="10b"
:copen   → open results
:cnext   → next
:cprev   → prev
```

---

# 🧠 The real mental model

```txt id="model"
/      → search in file
*      → search current word
f/t    → micro positioning
:vimgrep → search project
```

---

# ⚡ If you only remember 5

```txt id="core5"
/term
n
*
f(
:vimgrep /term/ **/*
```

That alone covers most real workflows.

---

# 🔥 Pro tip (this changes everything)

Use `*` way more than `/`.

Why:

- zero typing
- instant context
- keeps flow
