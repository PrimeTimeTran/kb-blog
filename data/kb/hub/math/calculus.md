---
draft: false
tags:
  - math
  - calculus
  - hub
type: hub
---

# 🧮 Calculus Hub

> Calculus is the study of **change and accumulation**, forming the foundation for modeling motion, growth, optimization, and continuous systems.

---

Calculus answers two fundamental questions:

1. How does it **change**? → [[atom/math/calc/core/derivative|derivative]]
2. How much does it **accumulate**? → [[atom/math/calc/core/integral|integral]]

These are connected by the [[fundamental-theorem-of-calculus]].

---

# 📚 1. Foundations (Pre-Calculus Layer)

> Mathematical tools required before calculus

---

## 🔢 Pre-Calculus

- functions and graphs
- polynomials and rational functions
- exponential and logarithmic functions
- transformations of functions

---

## 📐 [[trig|Trigonometry]]

- [[unit-circle|unit circle]]
- sine, cosine, tangent
- identities
- inverse trig functions

---

## 🎯 Core Idea

> Understand functions as objects you can manipulate and analyze.

---

# 📈 2. [[hub/math/calculus-1|Calculus I]] - Single-Variable Calculus

> Study of change in one variable

---

## 🟦 [[hub/math/calc/limits|Limits]]

- [[approaching-values]]
  - intuition of “getting close to a value”
- [[evaluating-limits]]
  - algebraic simplification
  - factoring / rationalizing
  - direct substitution (when valid)
- [[one-sided-limits]]
  - left-hand limit $\lim_{x \to a^-} f(x)$
  - right-hand limit $\lim_{x \to a^+} f(x)$
- [[continuity-in-limits]]
  - connection between limits and continuity
  - condition: $\lim_{x \to a} f(x) = f(a)$
- [[formal-definition-of-a-limit]]
  - $\varepsilon$–$\delta$ definition

---

## 🟩 Derivatives ([[calc-1-differential|Differential Calculus - Rates of Change]])

- [[rates-of-change]]
- [[atom/math/calc/core/difference-quotient|difference-quotient]]
  ![[reference/calc/formula/difference-quotient|difference-quotient]]
- [[definition-of-derivative]]
  ![[reference/calc/formula/derivative|derivative]]
- [[derivative|notation]]
- [[7-rules-of-differentiation]]
  ![[7-rules-differentiation-table]]
- [[tangent-lines]]

---

### 🟨 Applications of Derivatives

- [[optimization]]
- [[related rates]]
- [[curve sketching]]
- [[motion]] (velocity, acceleration)

---

## 🟧 Integrals ([[integral-calculus-mastery|Accumulation - Area under the Curve]])

- [[antiderivative]]
- [[definite-integral]]
- [[indefinite-integral]]
- area under a curve

---

## 🧠 Fundamental Theorem of Calculus

- connects [[derivative]] and [[integral]]
- turns [[accumulation]] into evaluation

---

## 🎯 Core Idea

> Derivatives measure change, integrals measure accumulation.

---

# 📊 3. [[hub/math/calc/calculus-2|Calculus II]] - Advanced Integration & Series

> Extends integration and introduces infinite processes

---

## Advanced Integration Techniques (refined)

- [[u-substitution]] (or [[substitution]])
  - reverse chain rule
  - simplifies composite functions
- [[integration-by-parts]]
  - product rule in reverse
  - formula: $\int u,dv = uv - \int v,du$
- [[partial-fraction]]
  - decomposes rational functions
  - used for $\frac{P(x)}{Q(x)}$ where $\deg P < \deg Q$
- [[trigonometric-integral]]
  - integrals involving powers/products of trig functions
  - often use identities (Pythagorean, double-angle, etc.)
- [[trigonometric-substitution]]
  - replaces radicals with trig expressions
  - used for forms like $\sqrt{a^2 - x^2}, \sqrt{x^2 + a^2}, \sqrt{x^2 - a^2}$

---

## 📦 Applications of Integration

- area between curves
- volumes (disk, washer, shell methods)
- arc length
- surface area

---

## ♾ Infinite Sequences & Series

- [[sequence]]
  - ordered lists of numbers $a_1, a_2, a_3, \dots$
  - focus: behavior as $n \to \infty$
- [[series]]
  - sums of sequences
  - general form: $a_1 + a_2 + a_3 + \dots$
- [[convergence]] & [[divergence]]
- key types:
  - [[geometric|geometric-series]]
    - constant ratio between terms
    - form: $a + ar + ar^2 + ar^3 + \dots$
  - [[power|power-series]]
    - infinite polynomial centered at a point
    - form: $\sum_{n=0}^{\infty} c_n (x - a)^n$
  - [[taylor|taylor-series]]
    - representation of functions using derivatives at a point
    - special case of power series:
      - $f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n$

---

## 🎯 Core Idea

> Break complex accumulation into manageable pieces and infinite sums.

---

# 🌐 4. [[hub/math/calc/calculus-3|Calculus III]] - Multivariable Calculus

> Calculus in higher dimensions

---

## 📍 Multivariable Functions

- functions of several variables
- 3D graphs and surfaces
- level curves

---

## 🧮 Partial Derivatives

- [[derivatives-with-respect-to-one-variable]]
- [[gradients]]

---

## 📐 Multiple Integrals

- [[double-integral]]
- [[triple-integral]]
- [[change of variables]]

---

## 🧭 Vector Calculus

- [[vector-fields|Vector Fields]]
- [[line-integrals|Line Integrals]]
- [[surface-integrals|Surface Integrals]]

---

## 🧠 Major Theorems

- [[greens-theorem|Green’s Theorem]]
- [[stokes-theorem|Stokes’ Theorem]]
- [[divergence-theorem|Divergence Theorem]]
- [[theorem]]

---

## 🎯 Core Idea

> Extend change and accumulation into higher-dimensional spaces.

---

# 🧱 5. [[hub/math/linear-algebra|Linear Algebra]] - Support System

> Mathematical language of vectors and transformations

---

## 🟦 Vectors

- [[magnitude-and-direction]]
- [[vector-operations]]

---

## 🟩 Matrices

- [[matrix-operations]]
- [[systems-of-equations]]

---

## 🟨 Transformations

- [[linear-transformations]]
- [[eigenvalues and eigenvectors]]

---

## 🎯 Core Idea

> Describe space and transformations algebraically.

---

# 🔗 How Everything Connects

- [[precalculus]] → prepares function intuition
- [[calculus-1|Calculus 1]] → change (derivatives)
  - [[calc-1-differential]]
- [[calculus-2|Calculus 2]] → accumulation (integrals & series)
  - [[calc-2-integral]]
- [[calculus-3|Calculus 3]] → higher dimensions
  - [[calc-3-multivariable]]
- [[hub/math/linear-algebra|Linear Algebra]] → structure of space
- [[stochastic]] → extended to include random processes

---

# 🧠 Unified Mental Model

> Calculus is the mathematics of **continuous change and accumulation across dimensions**, built on functions and extended through geometry and algebra.

---

# 📌 Summary

> Calculus studies how quantities **change, accumulate, and interact across space and time**.

---

# 🌐 Reference

- [[reference/calc/symbols|Calculus Symbols]]
- [[function|Function Notation]]
- [[reference/calc/notation/derivative|Derivative Notation]]
- Reviews:
  - [[calc-1-differential]]
  - [[calc-2-integral]]
  - [[calc-3-multivariable]]

# Related

- [[hub/math|math]]
- [[EE]]
- [[CS]]
