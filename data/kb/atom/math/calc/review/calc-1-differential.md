---
draft: false
slug: atom/CS
date: '2026-04-30'
title: 'Preview: CS'
summary: 'x'
tags: ['KB/MD/Obsidian/Blog']
---

# ∑ Calc 1 Review

> The mathematics of change. Notation,

## 🧩 Puzzle Pieces

| Category            | Function $f(x)$ | Derivative $f'(x)$                     | When to Use It                                        | 2-Second Recognition Rule                                                            |
| ------------------- | --------------- | -------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Basic Rules         | $c$ (constant)  | $0$                                    | When the function is just a number (no $x$ involved). | If there’s **no $x$ at all → answer is 0**                                           |
|                     | $x^n$           | $n x^{n-1}$                            | When you see a single power of $x$ (polynomials).     | If it’s **one term like $x^3, x^5, x^{10}$ → power rule**                            |
| Essential Functions | $e^x$           | $e^x$                                  | Exponential growth/decay base $e$.                    | If it’s **$e$ raised to $x$ → it stays the same**                                    |
|                     | $\ln(x)$        | $\frac{1}{x}$                          | Logarithms with single variable.                      | If you see **$\ln(x)$ → flip it to $1/x$**                                           |
| Trigonometric       | $\sin(x)$       | $\cos(x)$                              | Wave/oscillation problems.                            | If it’s **$\sin$ → becomes $\cos$**                                                  |
|                     | $\cos(x)$       | $-\sin(x)$                             | Wave/oscillation problems.                            | If it’s **$\cos$ → becomes $-\sin$**                                                 |
| Combination Rules   | $f(x)g(x)$      | $f'(x)g(x) + f(x)g'(x)$ (Product Rule) | Two functions multiplied together.                    | If it’s **“this × that” and both depend on x → product rule**                        |
|                     | $f(g(x))$       | $f'(g(x))g'(x)$ (Chain Rule)           | Nested functions inside other functions.              | If it’s **“function inside function” (parentheses inside parentheses) → chain rule** |
|                     |                 |                                        |                                                       |                                                                                      |

> [!info]- Derivative Notation
> ![[reference/calc/notation/derivative|derivative]]

> [!info]- Symbols for Calculus
> ![[reference/calc/symbols|symbols]]
> ![[reference/calc/symbols|symbols]]

> [!info]- 7 Rules of Differentiation
> ![[7-rules]]

### ⚖️ 7 Rules of Differentiation

![[]]

# 🤔 💭 Problems 🗂️

## 1️⃣ Motivating Problem 🐣 📝

WATCH WHAT HAPPENS AS WE GET CLOSER TO T = 2...

**Calculation:** Average Speed  
**Context:** Position $p(t) = t^2$

| Time Interval $$[t_1, t_2]$$ | Change in Time $$\Delta t$$ | Change in Position $$\Delta p$$ | Average Speed $$\frac{\Delta p}{\Delta t}$$ |
| ---------------------------- | --------------------------- | ------------------------------- | ------------------------------------------- |
| $$[2, 3]$$                   | $$1.0$$                     | $$9 - 4 = 5$$                   | $5.0$ m/s                                   |
| $$[2, 2.1]$$                 | $$0.1$$                     | $$4.41 - 4 = 0.41$$             | $4.1$ m/s                                   |
| $$[2, 2.01]$$                | $$0.01$$                    | $$4.0401 - 4 = 0.0401$$         | $4.01$ m/s                                  |
| $$[2, 2.001]$$               | $$0.001$$                   | $$4.004001 - 4 = 0.004001$$     | $4.001$ m/s                                 |
| $$[2, 2.000001]$$            | $$0.000001$$                | $$\cdots$$                      | $4.000001$ m/s                              |

### limit of a function as $x$ approaches $c$

$$
\lim_{ x \to c } f(x) = L
$$

### Connecting Notation to our example

| Component | Meaning                                 | Example                                                          |
| --------- | --------------------------------------- | ---------------------------------------------------------------- |
| $lim$     | The "approaching" process               | $lim$                                                            |
| $x \to c$ | Variable $x$ approaches value $c$       | Our interval in $\Delta t$ approaches $0$. So, $\Delta t \to 0$  |
| $f(x)$    | The function we are observing           | Our average speed formula: $\frac{p(2+\Delta t)-p(2)}{\Delta t}$ |
| $L$       | The limit. The value $f(x)$ approaches. | The value our speed squeezed towards: $4$.                       |

---

### ✅ Solution

---

## 2️⃣ Motivating Problem 🐣 📝

### Definition of Derivative

> ![[reference/calc/formula/derivative|derivative]]

---

## 3️⃣ Motivating Problem 🐣 📝

### 💎 Product Rule

![[reference/calc/formula/product-rule|product-rule]]

---

## 4️⃣ Motivating Problem 🐣 📝

### 💎 Quotient Rule

![[quotient-rule-mnemonic]]

---

## 5️⃣ Motivating Problem 🐣 📝

### 💎 Chain Rule

![[reference/calc/formula/chain-rule|chain-rule]]

Outer and inner functions

---

## 6️⃣ Motivating Problem 🐣 📝

### Implicit Differentiation

[[implicit-differentiation]]

# 🌐 Reference

- [[reference/math/calc/symbols|Calculus Symbols]]
- https://www.youtube.com/watch?v=AKVmWqIPSAk&t=2003s
