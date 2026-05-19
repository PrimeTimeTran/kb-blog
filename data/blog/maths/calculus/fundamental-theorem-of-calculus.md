---
draft: true
date: '2025-01-03'
title: 'Fundamental Theorem of Calculus'
summary: 'x'
tags:
  - math
  - calculus
  - core-theorem
---

# 📘 Fundamental Theorem of Calculus

The Fundamental Theorem of Calculus (FTC) connects [[derivatives]] and [[integrals]], showing they are inverse processes.

---

# 🧠 Core Idea

> Differentiation and integration undo each other.

- Derivatives measure _instantaneous change_
- Integrals measure _accumulated change_
- FTC links both views into one system

---

# FTC Part 1 (Derivative of an Integral)

## Setup

Let $f$ be continuous on $[a, b]$.

Define the accumulation function:
![[fundamental-theorem-of-calculus-1]]

---

## Result

If:

- $F(x) = \int_a^x f(t)\,dt$

Then:

$$
F'(x) = f(x)
$$

---

## Meaning

- Differentiation reverses accumulation
- The derivative of an accumulated area function returns the original function

---

## Interpretation

- Integration builds a function from a rate of change
- Differentiation retrieves the original rate from accumulated change

---

## Big Idea

> Derivatives and integrals are inverse processes: accumulation and instantaneous change undo each other

# FTC Part 2 (Evaluation of Definite Integrals)

If $f$ is continuous on $[a,b]$ and $F$ is any antiderivative of $f$ (so $F'(x) = f(x)$), then:

![[fundamental-theorem-of-calculus-2]]

---

## Result

$$
\int_a^b f(x)\,dx = F(b) - F(a)
$$

---

## Meaning

- A definite integral can be computed using any antiderivative of the function
- Integration over an interval reduces to evaluating a function at endpoints

---

## Procedure

- Find $F(x)$ such that $F'(x) = f(x)$
- Evaluate $F$ at the upper and lower bounds
- Subtract:

$$
F(b) - F(a)
$$

---

## Interpretation

- Integration measures total accumulation over $[a,b]$
- Antiderivatives convert continuous accumulation into endpoint differences

---

## Big Idea

> Definite integrals compute total change by turning accumulation into endpoint evaluation via antiderivatives

---

# 🔁 Unified Form

![[fundamental-theorem-of-calculus-2-evaluation-form]]

---

## 🧭 Core Identity (Leibniz Interpretation)

$$
\frac{d}{dx}\left(\int_a^x f(t)\,dt\right) = f(x)
$$

---

## 🧠 Meaning

- Integration accumulates a quantity from $a$ to $x$
- Differentiation removes that accumulation, recovering the original function

---

## 🔗 Notation Clarification

- $f(x)$: original function (integrand)
- $F(x)$: antiderivative of $f(x)$

Relationship:

$$
F'(x) = f(x)
$$

---

## 🧠 Intuition

- Derivative → measures local change (zoom in)
- Integral → measures total accumulation (sum up)

FTC connects them:

> Differentiating an accumulated quantity returns the original rate of change.

---

## 📌 Procedure for Evaluation

To compute:

$$
\int_a^b f(x)\,dx
$$

1. Find an antiderivative $F(x)$ such that $F'(x) = f(x)$
2. Evaluate $F(b)$
3. Evaluate $F(a)$
4. Subtract:
   $$
   F(b) - F(a)
   $$

---

# 📌 Why It Matters

FTC is the foundation of:

- efficient computation of definite integrals
- physics (work, energy, motion)
- probability (continuous distributions)
- modeling accumulation in applied math

---

# ⚠️ Common Misconception

FTC does not mean:

- “integrals are just area”

Instead:

> A definite integral measures net accumulation of a rate of change over an interval.

---

# 📌 Summary

The Fundamental Theorem of Calculus states that:

- differentiation and integration are inverse operations
- accumulation and instantaneous change are two sides of the same process
- definite integrals can be evaluated using antiderivatives
