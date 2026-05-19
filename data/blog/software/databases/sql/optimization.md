---
draft: true
date: '2025-09-10'
title: 'x'
summary: 'x'
tags: ['']
---

- View Indexes

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'cerberus' AND tablename = 'orats_strikes_hist';
```

- Create Index

```sql
CREATE INDEX idx_ticker_tradedate ON cerberus.orats_strikes_hist (ticker, "tradeDate");
```

- Explain
- Analyze
