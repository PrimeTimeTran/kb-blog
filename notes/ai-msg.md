```tree
app/(lab)/slots
├── @left
│   ├── default.tsx
├── @right
│   ├── default.tsx
├── layout.tsx
└── v2
    ├── @left
    │   ├── [...slug]
    │   │   └── page.tsx
    ├── @right
    │   ├── default.tsx
    ├── [...slug]
    │   └── page.tsx
    ├── layout.tsx
```

- app/(lab)/slots/layout/page.tsx # uses left & right slots
- app/(lab)/slots/@left/default.tsx
- app/(lab)/slots/v2/layout/page.tsx # uses left & right slots of it's scope...
- app/(lab)/slots/v2/@left/[...slug]/page.tsx
- app/(lab)/slots/v2/[...slug]/page.tsx
- app/(lab)/slots/@right/default.tsx
- app/(lab)/slots/v2/@right/default.tsx

The reason why @right renders default for `app/(lab)/slots/v2/[...slug]/page.tsx` is because
`/@right/[...slug]/page.tsx` does not exist
