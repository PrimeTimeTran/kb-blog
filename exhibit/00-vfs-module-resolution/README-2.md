# Mini React VFS + Module Runtime Progress

## TODO

- CJS: snapshot copy
- Graph
- ESM: static binding reference table

## Canonicalization.

```
/a.tsx === /a.tsx
./a === /src/a.tsx
```

## Parallels

```
| Concept      | You        | Turbopack        |
| ------------ | ---------- | ---------------- |
| graph        | partial    | full             |
| caching      | basic flag | multi-layer      |
| resolution   | custom     | production-grade |
| execution    | runtime    | staged           |
| invalidation | none       | core feature     |
| HMR          | not yet    | first-class      |

```

## Stack

```
1. resolution → find modules
2. graph → understand relationships
3. cache → avoid recomputation
4. invalidation → know what changed
5. HMR → re-execute minimal subset
```
