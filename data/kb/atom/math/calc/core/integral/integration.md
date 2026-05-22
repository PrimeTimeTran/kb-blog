---
draft: false
tags:
  - calculus
  - calc-1
  - integrals
---

# 🧩 Integration

## Core idea

Integration is the process of **accumulating small changes to recover a whole**.

It is the inverse operation of differentiation.

---

## 1. Two main meanings

### (A) Antiderivative view

Integration finds a function whose derivative is known:

$$
\int f(x),dx = F(x) \quad \text{where } F'(x)=f(x)
$$

So:

> Integration “undoes” differentiation

---

### (B) Accumulation (area) view

Integration measures total accumulation over an interval:

$$
\int_a^b f(x),dx
$$

Meaning:

> sum of infinitely many tiny pieces of area

---

## 2. Geometric meaning

- $f(x)$ gives heights
- Integration adds up infinitely thin rectangles
- Result = **net area under the curve**

---

## 3. Intuition

Think:

- Derivative → breaks things into instantaneous rate
- Integral → rebuilds total from those rates

---

## 4. Fundamental connection

$$
\frac{d}{dx} \left(\int f(x),dx\right) = f(x)
$$

$$
\int f'(x),dx = f(x) + C
$$

So:

> differentiation and integration are inverse processes

---

## 5. Constant of integration

$$
+ C
$$

Reason:

- Derivatives lose constant information
- Integration must restore _all possible originals_

---

## 6. Mental model

- Derivative = “how fast is it changing right now?”
- Integral = “how much has accumulated over time?”
