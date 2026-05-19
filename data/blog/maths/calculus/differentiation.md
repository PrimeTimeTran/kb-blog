---
draft: true
date: '2025-01-03'
title: 'Differentiation Rules'
summary: 'x'
tags: ['calculus', 'derivatives', 'differentiation rules']
---

## Differentiation Rules

### Constant Rule

If $f(x) = c$ where $c$ is a constant, then:

$$
\frac{d}{dx}c = 0
$$

**Example:**
If $f(x) = 5$, then $f'(x) = 0$.

### Constant Multiple Rule

If $f(x) = c \cdot g(x)$, then:

$$
\frac{d}{dx}[c \cdot g(x)] = c \cdot g'(x)
$$

**Example:**
If $f(x) = 3x^2$, then $f'(x) = 3 \cdot 2x = 6x$.

### Sum Rule

If $f(x) = g(x) + h(x)$, then:

$$
\frac{d}{dx}[g(x) + h(x)] = g'(x) + h'(x)
$$

**Example:**
If $f(x) = x^2 + \sin x$, then $f'(x) = 2x + \cos x$.

### Difference Rule

If $f(x) = g(x) - h(x)$, then:

$$
\frac{d}{dx}[g(x) - h(x)] = g'(x) - h'(x)
$$

**Example:**
If $f(x) = x^3 - e^x$, then $f'(x) = 3x^2 - e^x$.

### Product Rule

If $f(x) = g(x) \cdot h(x)$, then:

$$
\frac{d}{dx}[g(x)h(x)] = g'(x)h(x) + g(x)h'(x)
$$

**Example:**
If $f(x) = x^2 \cdot \sin x$, then $f'(x) = 2x \sin x + x^2 \cos x$.

### Quotient Rule

If $f(x) = \frac{g(x)}{h(x)}$, then:

$$
\frac{d}{dx}\left[\frac{g(x)}{h(x)}\right] = \frac{g'(x)h(x) - g(x)h'(x)}{[h(x)]^2}
$$

**Example:**
If $f(x) = \frac{x^2}{x+1}$, then $f'(x) = \frac{2x(x+1) - x^2(1)}{(x+1)^2} = \frac{2x^2 + 2x - x^2}{(x+1)^2} = \frac{x^2 + 2x}{(x+1)^2}$.

### Chain Rule

If $f(x) = g(h(x))$, then:

$$
\frac{d}{dx}g(h(x)) = g'(h(x)) \cdot h'(x)
$$

**Example:**
If $f(x) = \sin(x^2)$, then $f'(x) = \cos(x^2) \cdot 2x$.

## Summary Table: Differentiation Rules

| Name                   | Formula                                                                               | Description                                                                                  | Example                                                            |
| ---------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Constant Rule          | $\frac{d}{dx}c = 0$                                                                   | Derivative of a constant is zero                                                             | $f(x) = 5 \implies f'(x) = 0$                                      |
| Constant Multiple Rule | $\frac{d}{dx}[c \cdot g(x)] = c \cdot g'(x)$                                          | Derivative of a constant times a function is the constant times the derivative               | $f(x) = 3x^2 \implies f'(x) = 6x$                                  |
| Sum Rule               | $\frac{d}{dx}[g(x) + h(x)] = g'(x) + h'(x)$                                           | Derivative of a sum is the sum of the derivatives                                            | $f(x) = x^2 + \sin x \implies f'(x) = 2x + \cos x$                 |
| Difference Rule        | $\frac{d}{dx}[g(x) - h(x)] = g'(x) - h'(x)$                                           | Derivative of a difference is the difference of the derivatives                              | $f(x) = x^3 - e^x \implies f'(x) = 3x^2 - e^x$                     |
| Product Rule           | $\frac{d}{dx}[g(x)h(x)] = g'(x)h(x) + g(x)h'(x)$                                      | Derivative of a product uses both functions and their derivatives                            | $f(x) = x^2 \sin x \implies f'(x) = 2x \sin x + x^2 \cos x$        |
| Quotient Rule          | $\frac{d}{dx}\left[\frac{g(x)}{h(x)}\right] = \frac{g'(x)h(x) - g(x)h'(x)}{[h(x)]^2}$ | Derivative of a quotient uses both functions and their derivatives                           | $f(x) = \frac{x^2}{x+1} \implies f'(x) = \frac{x^2 + 2x}{(x+1)^2}$ |
| Chain Rule             | $\frac{d}{dx}g(h(x)) = g'(h(x)) \cdot h'(x)$                                          | Derivative of a composition is the derivative of the outer times the derivative of the inner | $f(x) = \sin(x^2) \implies f'(x) = \cos(x^2) \cdot 2x$             |

# Conclusion
