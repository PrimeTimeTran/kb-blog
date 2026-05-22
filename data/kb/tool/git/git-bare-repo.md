---
draft: false
slug: tool/git/tag-cheatsheet
date: '2026-05-03'
title: 'Git Bare Repo'
summary: 'Git Bare Repo use case explained simply'
tags: ['git', 'version-control', 'architecture', 'dev-tools']
---

# 📌 Bare Git Repo (Dotfiles Model)

A **bare Git repository** is a Git setup that stores version history **without a working directory**. It is commonly used to manage dotfiles across an entire home directory.

---

# 🧠 Core idea

Normally Git has:

```text
repo/
  .git/
  files you edit
```

A **bare repo removes the working folder entirely**:

```text
~/.cfg/
  HEAD
  objects/
  refs/
  config
```

There are **no checked-out files inside it**.

---

# ⚙️ Key configuration concept

A bare repo is usually paired with a _work tree_:

```bash
git --git-dir=$HOME/.cfg --work-tree=$HOME
```

This means:

| Component     | Purpose                  |
| ------------- | ------------------------ |
| `--git-dir`   | where Git stores history |
| `--work-tree` | where real files live    |

So Git can track files like:

```text
~/.zshrc
~/.config/nvim/init.vim
```

without moving them into a repo folder.

---

# 🔁 Typical alias

```bash
alias config='git --git-dir=$HOME/.cfg --work-tree=$HOME'
```

Now:

```bash
config status
config add .zshrc
config commit -m "update shell config"
```

---

# 🧠 Mental model

Think of it as:

> Git database lives in `.cfg/`
> Your home directory is the “checked-out view”

But unlike normal repos:

- there is no `.git` folder inside project files
- everything is tracked from the root (`~`)

---

# 🚨 Why it’s powerful (and dangerous)

## ✅ Pros

- Tracks entire system configs
- No need to move files
- Reproducible environment
- Works across machines

## ⚠️ Cons

- Easy to accidentally track sensitive files
- Can include system noise if not curated
- Harder mental model than normal repos

---

# 📦 What it is used for

Primarily:

- dotfiles management
- shell configuration (`.zshrc`, `.bashrc`)
- editor configs (`nvim`, `tmux`, `kitty`)
- system tooling setup

---

# 🧭 One-line definition

> A bare Git repo is a Git database without a working directory, typically paired with a “work tree” so it can track dotfiles directly in the home directory.

---

If you want, I can also turn this into a **Zettelkasten link map** connecting:

- dotfiles systems
- symlinks
- XDG config standard
- stow vs bare repo patterns
