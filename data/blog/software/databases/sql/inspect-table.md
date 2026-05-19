---
draft: true
date: '2025-08-10'
title: 'x'
summary: 'x'
tags: ['postgres', 'sql', 'databases', 'devops', 'cloud', 'question', 'guide']
---

- View table columns & data types.

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'cerberus'
  AND table_name = 'chart_premiums_paid';
```
