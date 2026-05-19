---
draft: false
slug: atom/CS
date: '2026-04-30'
title: 'Preview: CS'
summary: 'x'
tags: ['KB/MD/Obsidian/Blog']
---

# ∫ Calc 2 Review ♻️

## 🧩 Puzzle Pieces

| Technique/Concept       | Integral Example                                                  | What it Solves                                                                                                     |
| ----------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| The Definite Integral   | ![[definite-integral2]]                                           | Computes **net area under a curve** over an interval ([a,b]).                                                      |
| The Fundamental Theorem | ![[fundamental-theorem-of-calculus-2]]                            | Connects **derivatives and integrals**, letting you evaluate definite integrals using antiderivatives.             |
| Antiderivative Patterns | $\int x^n , dx = \frac{x^{n+1}}{n+1} + C$                         | Finds **basic antiderivatives directly** using power rules and known forms.                                        |
| u-Substitution          | ![[reference/calc/formula/u-substitution\|u-substitution]]        | Simplifies **composite functions** by substituting inner expressions.                                              |
| Integration by Parts    | $\int x e^x , dx$                                                 | Handles **products of functions** (polynomial × exponential, trig × log, etc.).                                    |
| Partial Fractions       | $\int \frac{1}{x^2-1} dx$                                         | Breaks **rational functions** into simpler fractions for integration.                                              |
| Improper & Numerical    | $\int_{1}^{\infty} \frac{1}{x^2} dx$ or trapezoidal rule for data | Evaluates **infinite limits or non-elementary integrals numerically** when exact solutions are hard or impossible. |
|                         |                                                                   |                                                                                                                    |

## First Principles(Accumulation)

How to find the exact area under the curve $f(x) = x^2$ from $x=0$ to $x=1$?

## 1️⃣ Motivating Problem 🐣 📝

$$\int_{0}^{1} x^2 \, dx$$

![[int-1.png]]

#### Strategy

Step 1:
Approximate area using rise over run between two points on the curve.

Step 2:
Increase number of rectangles....

Step 3:
Increase number of rectangles....

> [!info]- Accumulation Steps Illustration...
> ![[integration-process]]

### Riemann Sum

This process to find the sum/area/[[definite-integral]] using an approximation is formally called the [[Riemann-Sum]].

![[reference/calc/formula/definite-integral|definite-integral]]

### 🔐 Key 💡 Idea

> A Riemann sum approximates the area under a curve by adding areas of many thin rectangles. As the number of rectangles increases, the approximation approaches the exact value of the definite integral.

## Fundamental Theorem of Calculus(FTC)

The FTC turns accumulation (Riemann sums) into a computation problem using [[antiderivative|antiderivatives]]. instead of infinite sums.

![[fundamental-theorem-of-calculus-2]]

---

## 1️⃣ Motivating Problem 🐣 📝

$$\int_{0}^{1} x^2 \, dx$$

#### 1️⃣ Find the Antiderivative

We compute an antiderivative of $f(x) = x^2$:

$$F(x) = \int x^2 \, dx = \frac{x^3}{3}$$

---

#### 2️⃣ Apply FTC-2

FTC-2 states:

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

So:

$$\int_0^1 x^2 \, dx = F(1) - F(0)$$

---

#### 3️⃣ Substitute bounds

$$F(1) = \frac{1^3}{3} = \frac{1}{3}$$
$$F(0) = \frac{0^3}{3} = 0$$

---

#### 4️⃣ Compute final result

$$
\int_0^1 x^2 \, dx = \frac{1}{3} - 0 = \frac{1}{3}
$$

---

### ✅ Solution

$$\int_0^1 x^2 \, dx = \frac{1}{3}$$

### 🔐 Key 💡 Idea

The FTC turns a limit of infinitely many small area pieces into a simple evaluation
using antiderivatives. Instead of approximating area with many rectangles (as in Riemann sums), we compute it exactly with one function evaluation.

## FTC Unified Form

![[fundamental-theorem-of-calculus-unified-form-core-identity]]

Read:

> “The derivative with respect to x of the accumulated area from a to x is f(x).”

## 2️⃣ Motivating Problem 🐣 📝

Composition function:

$$
\int 2x\cos(x^2),dx
$$

There is a clear structure “signal” in the integrand:

- an inner function $x^2$
- and its derivative $2x$

---

#### 🧨 U Substitution

Reverse the chain rule with [[u-substitution]].

---

##### 1️⃣ Choose $u$

$$
u = x^2
$$

---

##### 2️⃣ Differentiate $u$

$$
\frac{du}{dx} = 2x \Rightarrow du = 2x,dx
$$

---

##### 3️⃣ Substitute

Replace expressions in terms of $x$:

$$
\int 2x\cos(x^2),dx \to \int \cos(u),du
$$

---

##### 4️⃣ Integrate

$$
\int \cos(u),du = \sin(u) + C
$$

---

##### 5️⃣ Back substitute

Replace $u = x^2$:

$$
\sin(x^2) + C
$$

---

#### ✅ Solution

$$
\int 2x\cos(x^2),dx = \sin(x^2) + C
$$

### 🔐 Key 💡 Idea

We can check our answer by differentiating the answer with the [[atom/math/calc/core/derivative/differentiation/chain-rule|chain-rule]].

## 3️⃣ Motivating Problem 🐣 📝

$$\int x^3 (x^4 + 5)^6 dx$$

#### 🧨 U-Substition

##### 1️⃣ Choose $u$

$$
u = x^4 + 5
$$

---

##### 2️⃣ Differentiate $u$

$$
\frac{du}{dx} = 4x^3
$$

So,

$$
du = 4x^3 , dx
$$

Rearrange:

$$
x^3 , dx = \frac{1}{4} du
$$

---

##### 3️⃣ Substitute

$$
\int x^3 (x^4 + 5)^6 , dx
$$

becomes

$$
\int u^6 \cdot \frac{1}{4} , du
$$

---

##### 4️⃣ Integrate

$$
\frac{1}{4} \int u^6 , du
$$

$$
= \frac{1}{4} \cdot \frac{u^7}{7}
$$

$$
= \frac{u^7}{28}
$$

---

##### 5️⃣ Back substitute

$$
\frac{(x^4 + 5)^7}{28} + C
$$

---

#### ✅ Solution

$$
\int x^3 (x^4 + 5)^6 , dx = \frac{(x^4 + 5)^7}{28} + C
$$

$$
	\int_{0}^{1} e^{5x+1} \, dx
$$

## 4️⃣ Motivating Problem 🐣 📝

$$\int_{0}^{1} e^{5x+1} , dx$$

#### 🧨 U Substitution with Definite Integral

- Use when the integrand is a composition of functions where an inner function and (a multiple of) its derivative appear. Works for both definite and indefinite integrals — definite integrals just require adjusting limits or back-substituting.

##### 1️⃣ Choose $u$

$$
u = 5x + 1
$$

---

##### 2️⃣ Differentiate $u$

$$
\frac{du}{dx} = 5 ;;\Rightarrow;; du = 5,dx
$$

Rearrange:

$$
dx = \frac{1}{5} du
$$

---

##### 3️⃣ Change the limits

Since this is a **definite integral**, convert bounds:

- when $x = 0$:
  $$u = 5(0) + 1 = 1$$
- when $x = 1$:
  $$
  u = 5(1) + 1 = 6
  $$

---

##### 4️⃣ Substitute

$$
\int_{0}^{1} e^{5x+1} , dx  \to
\int_{1}^{6} e^u \cdot \frac{1}{5} , du
$$

---

##### 5️⃣ Integrate

$$
\frac{1}{5} \int_{1}^{6} e^u , du
$$

$$
= \frac{1}{5} \left[ e^u \right]_{1}^{6}
$$

---

##### 6️⃣ Evaluate

$$
\frac{1}{5} \left( e^6 - e^1 \right)
$$

---

#### ✅ Solution

$$
\int_{0}^{1} e^{5x+1} , dx = \frac{e^6 - e}{5}
$$

---

### 🔐 Key 💡 Idea

For **definite integrals with u-sub**, you have two valid approaches:

- change bounds (what we did here)
- or back-substitute at the end

This version is cleaner because:

> the variable $x$ disappears completely after substitution.

## 5️⃣ Motivating Problem 🐣 📝

$$\int x\cos(x),dx$$

---

#### 🧨 Integration by Parts

Use [[integration-by-parts]] (product of functions).

- Use when no choice of $u$ simplifies the integral.

---

##### 1️⃣ Choose $u$ and $dv$

$$
u = x \quad\quad dv = \cos(x),dx
$$

---

##### 2️⃣ Find $du$ and $v$

$$
du = dx
$$

$$
v = \int \cos(x),dx = \sin(x)
$$

---

##### 3️⃣ Apply formula

$$
\int u,dv = uv - \int v,du
$$

$$
\int x\cos(x),dx = x\sin(x) - \int \sin(x),dx
$$

---

##### 4️⃣ Integrate remaining term

$$
\int \sin(x),dx = -\cos(x)
$$

So:

$$
x\sin(x) - (-\cos(x))
$$

---

##### 5️⃣ Simplify

$$
x\sin(x) + \cos(x)
$$

---

#### ✅ Solution

$$
\int x\cos(x),dx = x\sin(x) + \cos(x) + C
$$

---

### 🔐 Key 💡 Idea

When you see:

- polynomial × trig (or exponential)

→ think **integration by parts**, not u-sub.

# 🌐 Reference

- [[hub/math/calc/calculus-2|calculus-2]]
  - [[antiderivative-cheatsheet]]
  - [[reference/calc/symbols|Calculus Symbols]]
- [https://www.youtube.com/watch?v=1gVIExRNoE0&t=8s](https://youtu.be/1gVIExRNoE0?t=1235)
