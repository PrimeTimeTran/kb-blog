# CSS Deep Drive

```css
:root {
  --color-coca: #f40000;
  --color-pepsi: #005cbf;
}

@theme {
  --color-coca: #f40000;
  --color-pepsi: #005cbf;
}

@theme inline {
  --color-coca: #f40000;
  --color-pepsi: #005cbf;
}
```

Given above CSS.

<div className="bg-coca">   // Applies #f40000
<div className="bg-pepsi">   // Applies #005cbf

And many other Tailwind utility classes

.text-coca, .border-coca, .decoration-coca, .on-coca, etc.
