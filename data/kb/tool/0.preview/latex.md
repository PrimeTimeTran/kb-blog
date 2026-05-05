# Latex Preview

## Latex snippet on the left

$\sum_{n=1}^{\infty} C_n x^n$

## Latex snippet centered

$$
\sum_{n=1}^{\infty} C_n x^n
$$

## Multi-line: align\* (aligned with & symbol)

$$
\begin{aligned}
y &= x^2 + 2x + 1 \\
  &= (x+1)^2
\end{aligned}
$$

## Multi-line: gather\* (centered, no alignment)

$$
\begin{aligned}
x &= 1 \\
y &= 2 \\
z &= 3
\end{aligned}
$$

## Multi-line: cases (piecewise)

$$
f(x) =
\begin{cases}
x^2 & \text{if } x \ge 0 \\
-x & \text{if } x < 0
\end{cases}
$$

## Multi-line: split (long equation)

$$
\begin{aligned}
(x+y)^3 &= x^3 + 3x^2y + 3xy^2 + y^3 \\
        &= x^3 + y^3 + 3xy(x+y)
\end{aligned}
$$

## Multi-line: multline\* (auto line breaks)

$$
\begin{aligned}
f(x) &= (x+1)(x+2)(x+3) \\
     &= x^3 + 6x^2 + 11x + 6
\end{aligned}
$$

## Matrix example

$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

## Symbols

## Common Calculus 1-3 Symbols

| Symbol                      | LaTeX                         | Usage                           |
| --------------------------- | ----------------------------- | ------------------------------- |
| Derivative                  | `\frac{d}{dx}`                | $\frac{d}{dx}f(x)$              |
| Partial derivative          | `\frac{\partial}{\partial x}` | $\frac{\partial f}{\partial x}$ |
| Limit                       | `\lim_{x \to a}`              | $\lim_{x \to 0} f(x)$           |
| Integral                    | `\int`                        | $\int f(x) \, dx$               |
| Definite integral           | `\int_a^b`                    | $\int_0^1 x^2 \, dx$            |
| Double integral             | `\iint`                       | $\iint_D f(x,y) \, dA$          |
| Triple integral             | `\iiint`                      | $\iiint_V f(x,y,z) \, dV$       |
| Summation                   | `\sum_{i=1}^{n}`              | $\sum_{i=1}^{n} i$              |
| Product                     | `\prod_{i=1}^{n}`             | $\prod_{i=1}^{n} a_i$           |
| Gradient                    | `\nabla`                      | $\nabla f$                      |
| Divergence                  | `\nabla \cdot`                | $\nabla \cdot \mathbf{F}$       |
| Curl                        | `\nabla \times`               | $\nabla \times \mathbf{F}$      |
| Infinity                    | `\infty`                      | $\infty$                        |
| Approximately               | `\approx`                     | $x \approx 3.14$                |
| Proportional to             | `\propto`                     | $y \propto x$                   |
| Therefore                   | `\therefore`                  | $\therefore$                    |
| For all                     | `\forall`                     | $\forall x$                     |
| Exists                      | `\exists`                     | $\exists x$                     |
| Element of                  | `\in`                         | $x \in \mathbb{R}$              |
| Union                       | `\cup`                        | $A \cup B$                      |
| Intersection                | `\cap`                        | $A \cap B$                      |
| Real numbers                | `\mathbb{R}`                  | $\mathbb{R}$                    |
| Complex numbers             | `\mathbb{C}`                  | $\mathbb{C}$                    |
| Natural numbers             | `\mathbb{N}`                  | $\mathbb{N}$                    |
| Prime notation (derivative) | `f'(x)` or `f''(x)`           | $f'(x)$, $f''(x)$               |
