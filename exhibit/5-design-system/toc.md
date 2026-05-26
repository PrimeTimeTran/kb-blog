## The Architectural Design System (TOC)

### I. The Philosophy of Constraints

- **The Problem with "Pixel Perfect":** Why manual styling leads to technical debt.
- **Design Tokens as the "Source of Truth":** Defining semantic variables (colors, spacing, typography) that transcend specific technologies (CSS, Swift, Android).
- **Systems Thinking 101:** Moving from "pages" to "parts." The Atomic Design paradigm (revisited for modern modularity).

### II. The Token Taxonomy

- **Global vs. Alias vs. Component Tokens:** Creating a hierarchy that allows for light/dark mode and multi-brand theming.
- **The API of Design:** Treating design tokens like an interface contract between Design and Engineering.
- **Fluidity by Default:** Designing for the "Fluid Web" (using viewport units, `clamp()`, and intrinsic layout algorithms rather than static breakpoints).

### III. Component Engineering (The "Component API")

- **Prop-Driven Design:** How to write components that are reusable but not bloated.
- **The Inversion of Control:** Using Slot patterns to keep components flexible without adding 50 props.
- **State Machines:** Why visual state (hover, loading, error, disabled) should be handled via logic rather than just CSS class toggling.
- **Compound Components:** Solving the "Prop Drilling" mess by letting parents and children talk to each other (e.g., `Tabs.List`, `Tabs.Panel`).

### IV. Cross-Platform Consistency

- **The Abstraction Layer:** Writing components that can be "rendered" as React, raw HTML/CSS, or even native mobile views.
- **Styling Strategies:** Pros/Cons of CSS-in-JS, Utility-First (Tailwind), and CSS Modules at scale.
- **The Bridge:** How to map your Design Token JSON files to different platforms.

### V. Accessibility as a System

- **Beyond `aria-label`:** Integrating a11y into the component lifecycle so it's impossible to "forget."
- **Keyboard Navigation Patterns:** Building robust accessible primitives (modals, focus traps, focus rings) that work out of the box.
- **Semantic HTML as a First-Class Citizen:** Why the DOM structure is part of your component API.

### VI. Documentation as a Product

- **Living Styleguides:** Why static PDFs are dead.
- **Playgrounds & Sandboxes:** The importance of live-editing components within docs.
- **Version Control for Design:** Handling breaking changes in a component library (SemVer for UI).

### VII. Governance and Adoption

- **The "Opt-in" Culture:** Why forcing developers to use your system is a losing battle.
- **System Maintenance:** Building a pipeline for contributions from the wider team.
- **The "Design Debt" Audit:** How to slowly migrate an existing, messy app into your new system without a full rewrite.

---

### A Note on the "Audience Assumption"

By focusing on **System/Architecture** over **Syntax**, you can frame your lessons as:

> _"We aren't discussing how to apply a border radius; we are discussing the **intent** of a 4px corner radius versus a 12px one, and how we enforce that across 50 different micro-services."_

**Would you like me to expand on any of these sections to help you start outlining the actual content for your first lesson?**
