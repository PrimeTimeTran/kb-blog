---
draft: true
date: '2025-09-10'
title: 'x'
summary: 'x'
tags: ['databases', 'sql', 'group by']
---

-

```sql
select teacher_id, count(distinct subject_id) as cnt
from teacher
group by teacher_id
```

- Using group by without an aggregate function produces indeterminate values for columns which aren't properly handled using an aggregate funciton.

```sql
select *
from teacher
group by teacher_id
```
