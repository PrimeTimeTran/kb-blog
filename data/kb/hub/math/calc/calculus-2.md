---
draft: true
tags:
  - math
  - calculus
  - calc-2
---

# 📘 Calculus 2 Hub

## 🧠 Core Idea

> Calculus 2 is about turning continuous change into **accumulated quantities and infinite representations**

Everything reduces to:

- summation (finite → infinite)
- approximation (exact → limit)
- transformation (complex → simpler forms)

## 🧠 Purpose

Calculus 2 is the study of **accumulation and infinite processes**.

It explains how we:

- add infinitely many small contributions (integrals)
- analyze infinite sums (series)
- approximate functions using polynomials
- work with curves that aren’t functions of x

---

# 🧱 1. Integration Fundamentals

> [[Integration]] is accumulation

- [[atom/math/calc/core/integral/definite-integral|definite-integral]] → signed accumulation
  ![[reference/calc/formula/definite-integral|definite-integral]]
- [[indefinite-integral]] → antiderivatives
  ![[indefinite-integral]]
- [[fundamental-theorem-of-calculus]] → link between derivative and integral
  ![[fundamental-theorem-of-calculus-unified-form-core-identity]]
- [[riemann-sum|Riemann Sums]] → definition of the integral as a limit
- [[accumulation|Area as Accumulation]] → geometric interpretation

---

# 🧮 2. Integration Techniques

> Methods for rewriting integrals into solvable forms

- [[substitution|U-Substitution]] → reverse chain rule
- [[integration-by-parts]] → reverse product rule
- [[partial-fractions|Partial Fraction Decomposition]] → rational simplification
- [[integration-of-rational-functions|Rational Function Integration]]
- [[trigonometric-integral]]
- [[trigonometric-substitution]]
- [[improper-integrals|Improper Integrals]] → infinite or discontinuous integrals

---

# 📊 3. Applications of Integration

> Using integrals to model real-world quantities

- Area between curves
- Volume (disk / washer / shell methods)
- Arc length
- Surface area of revolution
- Work (force over distance)
- Average value of a function
- Center of mass

---

# 🔁 4. Sequences & Series

> Extending sums to infinity

[[sequence-and-series|Sequences & Series Notation]]

## Sequences ($Σ$)

- [[limits-of-sequences]]
- [[convergence]] vs [[atom/math/calc/core/divergence|divergence]]

## Series ($aₙ$)

- [[infinite-sum]]
- behavior of partial sums

---

### ⚙️ Convergence & Divergence Tests 🧪

Every infinite series does exactly one of two things:

- **Converges** → approaches a finite value
- **Diverges** → does not

So every “convergence test” is really:

> a **convergence/divergence test**>

---

### 🔹 Benchmark Series (memorize these)

- Used by other tests:
  - Comparison Test → _"Does this behave like a p-series?"_
  - Comparison Test → _"Does this behave like a p-series?"_
  - Comparison Test → _"Does this behave like a p-series?"_
- # [[geometric|Geometric Series]]

> [!info]- $\sum ar^n$
>
> - converges if $|r| < 1$
> - diverges if $|r| \ge 1$

- # [[p-series|P-Series]]

> [!info]- $\sum \frac{1}{n^p}$
>
> - converges if $p > 1$
> - diverges if $p \le 1$

---

### 🔹 Tests 🧪

##### Quick Elimination

- # [[divergence|Divergence Test]]

##### General-Purpose (can prove both)

- # [[comparison|Comparison Test]]
- # [[integral|Integral Test]]
- # [[root|Root Test]]
- # [[ratio|Ratio Test]]

##### Special Case

- # [[alternating-series|Alternating Series Test]]

> [!info]- Convergence/Divergence Flow Chart
> ![[convergence-divergence-flow-chart.png]]

---

### 🔹 Special Types of Series

#### ⚡️ Power Series

> [!info]- ![[power-series]]
>
> - radius of convergence
> - interval of convergence
> - local function representation

It behaves like a **machine that depends on $x$**, and its behavior changes based on where you are relative to $c$.

#### 🧠 Taylor & Maclaurin Series

- [[taylor|Taylor Series]] → power series representing a function

> [!info]- ![[taylor-series]]
>
> - $f^{(n)}(c)$ = $n$th derivative of $f$ evaluated at $c$
> - $n!$ = factorial (scaling factor)
> - $(x - c)^n$ = how far you are from the center

- [[maclaurin|Maclaurin Series]] → Taylor series centered at $x = 0$

> [!info]- ![[taylor-series]]
>
> A Maclaurin series is just a Taylor series centered at $c = 0$:

#### 🔐 Key Idea

Both are:

> infinite polynomials that approximate a function using its derivatives

They work because:

- the function is being “matched” at a point
- slope, curvature, and higher-order behavior are encoded via derivatives

---

## 🧠 One-line intuition

> Sequences and series turn calculus from computing quantities into understanding infinite processes and building functions from them.

> [!info]- Big Picture: Why Sequences & Series Exist
> ![[why-sequence-and-series-exist.md]]

# 🧭 5. Parametric & Polar Systems

> Coordinates beyond y = f(x)

## 📍 Parametric Equations

- curves defined by parameter t
- velocity interpretation
- arc length in parametric form

## 📍 Polar Coordinates

- [[polar-coordinates|Polar Coordinates]] → (r, θ) representation
- area in polar form
- conversion between Cartesian and polar

---

# 🧠 6. Key Theorems & Unifying Ideas

- [[fundamental-theorem-calculus-FTC|Fundamental Theorem of Calculus]] (bridge concept)
- Integration by Parts identity
- Ratio & Root test logic
- Alternating Series convergence behavior
- [[taylor theorem]] (approximation + error)
- Trig identities (structural simplification tools)

---

# 🧩 7. Core Mental Model

> Calculus 2 is the study of integration, infinite series, and alternative coordinate systems used to model accumulation and approximation in continuous mathematics.

## 🧠 Three Big Ideas

### 1. Accumulation

Integrals sum infinitely many infinitesimal parts.

### 2. Decomposition

Complex expressions become solvable via transformation.

### 3. Infinite Representation

Functions can be represented as infinite sums.

---

## 🧠 System View

Calculus 2 is the bridge between:

- finite → infinite
- exact → approximate
- geometric → algebraic

---

# 🧭 8. Learning Progression

## Phase 1 — Foundations

- [[definite-and-indefinite-integrals]]
- [[fundamental-theorem-of-calculus]]
- [[substitution]]

## Phase 2 — Techniques

- [[atom/math/calc/core/integral/integration-by-parts|integration-by-parts]]
- [[partial-fractions]]
- [[trigonometric-substitution]]
- [[improper-integrals]]

## Phase 3 — Applications

- area / volume / arc length / work

## Phase 4 — Infinite Series

- [[convergence|convergence tests]]
- [[power|power series]]
- [[taylor|Taylor series]]

## Phase 5 — Coordinate Systems

- [[parametic-equations]]
- [[polar-coordinates|polar coordinates]]

# Related

- [[antiderivative]]
  - [[antiderivative-cheatsheet]]
- [[atom/math/calc/core/integral|integral]]
  - [[atom/math/calc/core/integral/integration-by-parts|integration-by-parts]]
  - [[integration-cheatsheet]]
- [[sequence-and-series|Sequences & Series Notation]]
- [[trigonometry|Trigonometry Hub]]
- [[algebra|Algebra Hub]]
- [[calculus-1|Calculus 1 Hub]]
- [[calculus-3|Calculus 3 Hub]]
- [[hub/math/linear-algebra|Linear Algebra Hub]]
