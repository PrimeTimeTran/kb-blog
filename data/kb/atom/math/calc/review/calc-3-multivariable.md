---
draft: false
slug: atom/math/calc
date: '2026-04-30'
title: 'Preview: CS'
summary: ''
tags: ['KB/MD/Obsidian/Blog']
---
# ∇ Calc 3 Review

## 🧩 Puzzle Pieces

| Concept                    | Notation/Formula                                                        | What it Solves                                                         |       |                                                                   |
| -------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----- | ----------------------------------------------------------------- |
| The Gradient               | $\nabla f = \langle f_x, f_y, f_z \rangle$                              | Direction of steepest increase; rate of change in space                |       |                                                                   |
| The Jacobian               | $J_F = \frac{\partial (f_1,\dots,f_m)}{\partial (x_1,\dots,x_n)}$       | Linear approximation of multivariable functions; change under mappings |       |                                                                   |
| The Hessian                | $H_f = \begin{bmatrix} f_{xx} & f_{xy} \ f_{yx} & f_{yy} \end{bmatrix}$ | Classifying critical points (max/min/saddle)                           |       |                                                                   |
| Unconstrained Optimization | $\nabla f = 0$                                                          | Finding local maxima and minima of multivariable functions             |       |                                                                   |
| Lagrange Multipliers       | $\nabla f = \lambda \nabla g$                                           | Optimizing a function subject to a constraint                          |       |                                                                   |
| Double & Triple Integrals  | $\int!!\int f(x,y),dA,\quad \int!!\int!!\int f(x,y,z),dV$               | Accumulating volume, mass, or total quantity in higher dimensions      |       |                                                                   |
| Change of Variables        | $\iint f(x,y),dxdy = \iint f(u,v)\left                                  | \frac{\partial(x,y)}{\partial(u,v)}\right                              | dudv$ | Simplifying difficult integrals via transformation of coordinates |
# 🔐 Review

## 1️⃣ Motivating Problem 🐣 📝

You’re standing on a hill described by:  $h(x, y) = 100 - x^2 - 2y^2$  
At the point $(1,1)$, the height is $h(1,1)=97$.

---

#### 🧨 Gradient = Direction of Steepest Ascent

- Use when finding direction of fastest increase and rate of change on a surface.

---

##### 1️⃣ Compute partial derivatives

$h_x = -2x$  
$h_y = -4y$

---

##### 2️⃣ Form the gradient

$\nabla h = \langle -2x,,-4y \rangle$

---

##### 3️⃣ Evaluate at $(1,1)$

$\nabla h(1,1) = \langle -2,,-4 \rangle$

---

##### 4️⃣ Direction of steepest ascent

Steepest ascent is given by the gradient:  
$\langle -2,,-4 \rangle$

Unit direction (optional):  
$\frac{1}{\sqrt{20}}\langle -2,,-4 \rangle$

---

##### 5️⃣ Steepness (rate of increase)

$|\nabla h(1,1)| = \sqrt{(-2)^2 + (-4)^2} = \sqrt{20}$

---

### ✅ Solution

- Direction of steepest ascent: $\langle -2,,-4 \rangle$
- Steepness: $\sqrt{20}$

---

#### � Key 💡 Idea 

The gradient $\nabla h$ points in the direction of steepest increase, and its magnitude $|\nabla h|$ tells how steep the surface is at that point.


## 2️⃣ Motivating Problem 🐣 📝
## 3️⃣ Motivating Problem 🐣 📝
## 4️⃣ Motivating Problem 🐣 📝
## 5️⃣ Motivating Problem 🐣 📝
## 6️⃣ Motivating Problem 🐣 📝
## 7️⃣ Motivating Problem 🐣 📝


# Related
- [[reference/math/calc/symbols|Calculus Symbols]]
- https://www.youtube.com/watch?v=ZTxafDib4VU
