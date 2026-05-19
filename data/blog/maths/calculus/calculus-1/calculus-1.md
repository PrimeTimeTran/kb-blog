---
draft: true
date: '2025-01-03'
title: 'x'
summary: 'x'
tags: ['maths', 'calculus']
---

# Introduction

## Functions: f(x)

- Set of inputs to a set of outputs
- One to one or many to one
- Vertical line test

## Limits:

Describe how a function behaves near a point, not on the point itself

- Value a function approaches but never touches

## Continuity

- Discontinuous
  - Diverge or don't exist
  - Whole: Looks continuous except at the point
  - Jump: Continuous until a certain point, where the function jumps to another value & then continues
  - Infinity: Asymptotes force the function to diverge

### Continuous:

- Defined at a point
- Limit at a point

## Derivatives:

- Used to observe the rate of change of functions
- Allows us to analyze the instantaneous rate of change at a certain point.

### Lagrange vs Leibniz

    | Concept           | Lagrange Notation | Leibniz Notation     |
    |-------------------|-------------------|----------------------|
    | Function          | f(x)              | f                    |
    | Derivative        | f'(x)             | $\frac{df}{dx}$      |
    | Second Derivative | f''(x)            | $\frac{d^2f}{dx^2}$  |
    | Higher Derivative | $f^{(n)}(x)$      | $\frac{d^n f}{dx^n}$ |

## Differentiation

The process of finding a function's derivative, which represents its instantaneous rate of change

- Constant Rule
- Constant Multiple Rule
- Sum Rule
- Difference Rule
- Product Rule
- Quotient Rule
- Chain Rule

### Common Derivative Rules

| Rule                   | Formula                                                                               | Example                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Constant Rule          | $\frac{d}{dx}[c] = 0$                                                                 | $\frac{d}{dx}[5] = 0$                                                                   |
| Constant Multiple Rule | $\frac{d}{dx}[c f(x)] = c f'(x)$                                                      | $\frac{d}{dx}[3x^2] = 3 \cdot 2x = 6x$                                                  |
| Sum Rule               | $\frac{d}{dx}[f(x) + g(x)] = f'(x) + g'(x)$                                           | $\frac{d}{dx}[x^2 + \sin x] = 2x + \cos x$                                              |
| Difference Rule        | $\frac{d}{dx}[f(x) - g(x)] = f'(x) - g'(x)$                                           | $\frac{d}{dx}[x^2 - \sin x] = 2x - \cos x$                                              |
| Product Rule           | $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$                                      | $\frac{d}{dx}[x^2 \sin x] = 2x \sin x + x^2 \cos x$                                     |
| Quotient Rule          | $\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$ | $\frac{d}{dx}\left[\frac{x^2}{\sin x}\right] = \frac{2x \sin x - x^2 \cos x}{\sin^2 x}$ |
| Chain Rule             | $\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$                                        | $\frac{d}{dx}[\sin(x^2)] = \cos(x^2) \cdot 2x$                                          |

### Applications of Derivatives

- Used to know instantaneous velocity of an object given a displacement function
- Optimization: Get max/min of a value of a quantity

## Integration

Find the areas/volumes under curves by summing infinity small slices under the function.

## Types of Integrals

### Indefinite

Outputs function
$\int f(x)dx = F(x) + C$

    Outputs the antiderivative of a function.
    Taking the antiderivative gives back original function

### Definite

Outputs number

    $\int_a^{b} f(x)dx = F(b) + F(b)$

Area under the curve from x = a to x = b

## 🌐 References

- https://www.youtube.com/watch?v=yfajBIaDf1Q&t=23s
