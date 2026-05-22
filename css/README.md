# A) File order (build-time composition)

```sh
theme.css
base.css
layout.css
utilities.css
```

> “what gets included first in the final CSS bundle”;

# B) Tailwind layers (cascade priority)

```sh
theme < base < components < utilities
```

> “what wins when two selectors conflict”
