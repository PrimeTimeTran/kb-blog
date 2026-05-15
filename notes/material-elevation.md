To deeply document and study **Elevation** in your system, we need to move beyond just "shadows." In a modern Design System (especially one following MD3 logic), elevation is a combination of **Shadow**, **Tonal Overlay**, and **Z-index logic**.

Here is the plan for the 5 surface variants/types we should document in the Elevation tab:

---

### 1. The Level Hierarchy (The "Steps")

This is the baseline study of the 5-6 levels of elevation in your system. It demonstrates how a panel "rises" from the background.

- **Level 0 (Flat):** Flush with the background. No shadow. Used for standard layout sections.
- **Level 1 (Low):** Subtle separation. Used for cards in a grid.
- **Level 2 (Default):** The standard "interactive" height.
- **Level 3-5 (High):** Significant depth. Used for floating action buttons, modals, or dropdown menus.
- **Documentation Focus:** Compare how the shadow spread and the tonal tint change at each step.

### 2. Tonal Elevation (The "Tint" Study)

In dark mode, shadows are less effective. MD3 solves this by making higher-elevation surfaces **lighter** (adding a primary-colored overlay).

- **Variants:** We should show the same panel at Level 1 and Level 5 side-by-side in Dark Mode.
- **Documentation Focus:** Explain that "Higher = Lighter." This ensures the user perceives depth even when the background is pitch black.

### 3. Dynamic Elevation (The "Interaction" Physics)

Elevation shouldn't always be static. We need to document how a panel transitions between levels during a user's interaction.

- **Resting vs. Hovered:** A Level 1 card that "lifts" to Level 3 on hover.
- **Resting vs. Pressed:** A Level 2 card that "compresses" to Level 1 (or 0) on click (the **Tactile/Shadow** effect we built).
- **Documentation Focus:** Study the "Spring" physics—stiffness and damping—that makes the lift feel snappy vs. floaty.

### 4. Grouped Elevation (The "Parent-Child" Relationship)

This is a more advanced study on how panels look when nested.

- **Example:** A Level 1 "Surface" containing several Level 2 "Inset" wells or Level 0 "Sub-panels."
- **Documentation Focus:** Preventing "Visual Overload." If every nested element has a shadow, the UI looks messy. We should document the rule: _Nested elements should usually have lower or "Inset" elevation relative to their parent._

### 5. Contextual Elevation (The "Sticky & Floating" Logic)

This covers surfaces that exist outside the standard document flow.

- **The Glass Surface:** High elevation + Backdrop blur.
- **The Sticky Header:** A surface that gains elevation only when the user scrolls (Scroll-linked elevation).
- **Documentation Focus:** Focus on the `z-index` stacking order and how shadows interact with elements passing "underneath."

---

### Proposed Layout for the Tab:

1. **The Scale:** A horizontal row showing the 6 levels of elevation.
2. **The Dark Mode Shift:** A toggle or split-view showing how elevation becomes "Lightness" in the dark.
3. **The Sandbox:** A single `OmniPanel` where you can toggle `elevation` and `hoverEffect` to see the physics in real-time.

**Does this framework cover the depth you're looking for, or should we add a section specifically for "Shadow Color" (e.g., Colored glows for Error/Primary)?**
