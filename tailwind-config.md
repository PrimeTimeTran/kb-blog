1. Tailwind base layer system
2. Design tokens
3. Base document rules
4. Component/layout rules
5. Utilities
6. Vendor overrides
7. App overrides

Imports "don't matter" anymore.
Tailwinds innovation is that

```
@layer base {}
@layer components {}
@layer utilities {}
```

utilities ALWAYS beat components ALWAYS beat base

Composition of styles

styles/
├── theme.css // tokens only
├── base.css // html/body/reset/document rules
├── layout.css // app shell/layout structure
├── utilities.css // utility/helper classes
├── animations.css // keyframes + animation utilities
├── vendors.css // 3rd party overrides
└── tailwind.css // tailwind imports/layers only

tailwind.css
├── @tailwind base/components/utilities
├── theme.css (@theme only)
├── base.css (@layer base)
├── layout.css (@layer components)
├── utilities.css (@layer utilities)
├── animations.css (raw css)
├── vendors.css (raw overrides)
└── app.css (final overrides)

| Layer      | Purpose                                | Specificity | Example Use Case                |
| ---------- | -------------------------------------- | ----------- | ------------------------------- |
| Base       | Global resets and element-level styles | Lowest      | Typography, body bg, resets     |
| Components | Complex, reusable UI patterns          | Medium      | Buttons, Cards, Custom Navs     |
| Utilities  | Single-purpose "helper" classes        | Highest     | Custom spacing, specific colors |

| Keyword | Description                                                                  |
| ------- | ---------------------------------------------------------------------------- |
| @layer  | Tells Tailwind which part of the CSS cascade to place the code in.           |
| @apply  | "Inlines" existing Tailwind utility classes into your custom CSS rules.      |
| theme() | A function to grab values directly from your config (colors, spacing, etc).  |
| @theme  | (V4) Defines your design tokens (variables) directly in the CSS file.        |
| @config | Points Tailwind to your specific configuration file (e.g., tailwind.config). |
