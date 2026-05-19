---
draft: true
date: '2025-09-10'
title: 'x'
summary: 'x'
tags: ['']
---

```sql
SELECT n.nspname AS schema,
       p.proname AS procedure_name,
       p.oid::regprocedure AS signature,
       pg_get_userbyid(p.proowner) AS owner
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.prokind = 'p'   -- p = procedure, f = function, a = aggregate, w = window func
  AND n.nspname NOT IN ('pg_catalog', 'information_schema')
ORDER BY schema, procedure_name;
```

```sql
\dfp
```
