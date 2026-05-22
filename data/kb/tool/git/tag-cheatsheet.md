---
draft: false
slug: tool/git/tag-cheatsheet
date: '2026-05-03'
title: 'Git Tag Cheatsheet'
summary: 'Reference table for git tag cli commands'
tags: ['git', 'version-control', 'architecture', 'dev-tools']
---

| 👨🏻‍💻 Command                        | 🆔 Name                       | ℹ️ Desc                                               |
| --------------------------------- | ----------------------------- | ----------------------------------------------------- |
| `git tag`                         | list tags                     | shows all local tags                                  |
| `git tag -l "v1.*"`               | filtered list                 | lists tags matching pattern                           |
| `git tag v1.0.0`                  | lightweight tag               | creates a simple pointer to current commit            |
| `git tag -a v1.0.0 -m "message"`  | annotated tag                 | full tag object with metadata (author, message, date) |
| `git tag -a v1.0.0 <commit>`      | tag specific commit           | attaches annotated tag to a past commit               |
| `git tag v1.0.0 <commit>`         | lightweight specific commit   | tags a specific commit without metadata               |
| `git show v1.0.0`                 | inspect tag                   | displays tag details + commit diff                    |
| `git push origin v1.0.0`          | push single tag               | pushes one tag to remote                              |
| `git push origin --tags`          | push all tags                 | pushes all local tags to remote                       |
| `git push --follow-tags`          | push commits + annotated tags | pushes commits and only annotated tags together       |
| `git checkout v1.0.0`             | checkout tag                  | detached HEAD at tag state                            |
| `git switch --detach v1.0.0`      | modern checkout tag           | same as above (newer syntax)                          |
| `git tag -d v1.0.0`               | delete local tag              | removes tag locally only                              |
| `git push origin --delete v1.0.0` | delete remote tag             | removes tag from remote repo                          |
| `git tag -f v1.0.0`               | force retag                   | moves tag to a new commit locally                     |
| `git push -f origin v1.0.0`       | force update remote tag       | overwrites remote tag (dangerous)                     |
| `git describe`                    | version hint                  | shows nearest tag + commits since                     |
| `git describe --tags`             | include all tags              | uses any tag (not just annotated)                     |
| `git tag -s v1.0.0 -m "msg"`      | signed tag                    | GPG-signed tag for verification                       |
| `git tag -v v1.0.0`               | verify tag                    | validates signed tag integrity                        |
