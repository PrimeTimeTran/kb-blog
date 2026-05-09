---
draft: false
slug: atom/git-worktree-submodule-monorepo
date: "2026-05-03"
title: "Git Worktree vs Git Submodule vs Monorepo"
summary: "Three different ways to structure multi-context development in Git: worktrees for parallel branches, submodules for pinned external repos, and monorepos for unified multi-project codebases. Each trades off isolation, complexity, and workflow speed."
tags: ["git", "version-control", "architecture", "dev-tools"]
---

# Git Worktree vs Git Submodule vs Monorepo (Atom Note)

These three approaches solve a similar problem—working across multiple codebases or states—but they differ in _how_ they structure and isolate code.

---

# 1. Git Worktree

**Idea:** Multiple working directories for the same repository.

### What it is

- A single Git repo
- Multiple checkouts (worktrees) pointing to different branches/commits

### Mental model

> “Same repo, multiple folders, different branches.”

### Example use

- Work on `main` in one folder
- Simultaneously fix a bug in `feature-x` in another folder

### Key traits

- Shares `.git` data
- No duplication of history
- Very fast switching (no stash/checkout juggling)

### Pros

- Lightweight
- No extra cloning
- Great for parallel branch work

### Cons

- Still one repo (not separate projects)
- Not suitable for truly independent codebases

---

# 2. Git Submodule

**Idea:** A repo inside another repo.

### What it is

- Parent repo tracks a _specific commit_ of another repo
- Submodule is its own independent Git repository

### Mental model

> “Pinned external dependency repo inside my repo.”

### Example use

- Including a shared library
- Vendor SDKs
- Microservices dependency pinning

### Key traits

- Nested `.git` repos
- Requires explicit updates (`git submodule update`)
- Parent repo stores only commit pointers

### Pros

- Strong isolation
- Explicit version pinning
- Good for third-party dependencies

### Cons

- Hard to work with (init/update confusion)
- Easy to forget syncing submodules
- Dev friction is high

---

# 3. Monorepo

**Idea:** Many projects in a single repository.

### What it is

- One repo contains multiple apps/packages/services
- Shared tooling, shared version control

### Mental model

> “One repo to rule multiple projects.”

### Example structure

```
/apps/web
/apps/mobile
/packages/ui
/packages/utils
```

### Key traits

- Single Git history
- Often uses tooling like Nx, Turborepo, Bazel
- Shared dependencies and CI pipelines

### Pros

- Easy code sharing
- Atomic cross-project changes
- Unified tooling and CI

### Cons

- Repo can grow large
- Build tooling complexity
- Access control is harder

---

# Quick Comparison

| Feature      | Worktree             | Submodule     | Monorepo               |
| ------------ | -------------------- | ------------- | ---------------------- |
| Repo count   | 1                    | Many          | 1                      |
| Isolation    | Low                  | High          | Medium                 |
| Setup cost   | Low                  | Medium–High   | Medium–High            |
| Best for     | Parallel branch work | External deps | Multiple internal apps |
| Dev friction | Low                  | High          | Medium                 |

---

# Intuition Summary

- **Worktree:** “Same repo, multiple desks”
- **Submodule:** “Repo inside a repo, locked version”
- **Monorepo:** “One repo, many projects living together”
