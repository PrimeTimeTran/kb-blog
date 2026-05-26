### 1. The "Energy" Spectrum

Imagine you have a volume knob for your brand color.

- **Primary (Full Volume):** This is the loudest. It’s a solid block of your brand color. It grabs the eye instantly.
- _Use for:_ The "Submit" button, the "Create" FAB, a critical toggle.

- **Primary Container (Low Volume):** This is the "quiet" version of your brand. It’s your brand color mixed with a lot of white (light mode) or a lot of black (dark mode). It says "I am important, but I am a background."
- _Use for:_ The background of a search bar, the background of a selected list item, or a card that needs to stand out from other cards.

---

### 2. Containers vs. Surfaces (The "Ink" Rule)

This is where the "Borders vs. Background" question gets answered. You have two "worlds" of backgrounds:

#### **The Neutral World (Surfaces)**

Most of your app lives here.

- **Background:** `var(--low)`
- **Border:** `var(--outline)` or `var(--outline-variant)`
- **Text:** `var(--on-surface)`
- _Vibe:_ Calm, clean, functional.

#### **The Branded World (Containers)**

Use this when an element becomes **Active** or **Special**.

- **Background:** `var(--primary-container)`
- **Border:** Usually **none** (the color change is the boundary) or a darker version of the brand.
- **Text:** `var(--on-primary-container)`
- _Vibe:_ Highlighted, selected, purposeful.

---

### 3. Real World Example: The Search Bar

You mentioned search bars are containers with borders. Here is how you'd token them:

**State: Idle (Neutral)**

- **Bg:** `var(--level-highest)` (It looks like a shallow hole in the page).
- **Border:** `var(--outline)` (A subtle grey line).
- **Text:** `var(--on-surface-variant)` (Ghostly placeholder text).

**State: Active/Focused (Branded)**

- **Bg:** `var(--primary-container)` (The whole bar glows softly with your brand color).
- **Border:** `var(--primary)` (The border becomes the sharp, vibrant brand color).
- **Text:** `var(--on-primary-container)` (The text is now high-contrast against the brand tint).

---

### 4. The Golden Rule of "On-" Tokens

You asked if you should use `on-container` for borders. **Almost never.**

> **"On-" always means INK.**

If a variable starts with `on-`, it is meant for **Text** or **Icons**.

- **Background:** `primary-container`
- **Text inside it:** `on-primary-container`
- **Border around it:** `primary` (if you want it sharp) or `outline` (if you want it subtle).

---

### 5. Why do we need `Primary` AND `Primary Container`?

Look at your `TokenCard` code again.

- If you put white text on a `Primary` button (Blue), it’s easy to read.
- If you put white text on a `Primary Container` (Pale Blue), **you won't be able to read it.**

That is why `on-primary-container` exists—it is a special "Midnight Blue" (in light mode) or "Sky Blue" (in dark mode) calculated to have enough contrast specifically for that tinted background.

---

### Summary Table for OMNI UI

| Scenario           | Background Token        | Text/Icon Token        | Border Token      |
| ------------------ | ----------------------- | ---------------------- | ----------------- |
| **Standard Card**  | `surface-container-low` | `on-surface`           | `outline-variant` |
| **Selected Card**  | `primary-container`     | `on-primary-container` | `primary`         |
| **Warning Toast**  | `warning-container`     | `on-warning-container` | `warning`         |
| **Call to Action** | `primary`               | `on-primary`           | `none`            |

Does that help clear up the "Search bar" logic? You're basically switching the element from the **Neutral Surface Stack** into the **Branded Container Stack** once the user interacts with it.
