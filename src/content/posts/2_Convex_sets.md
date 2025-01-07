---
title: "Convex sets"
published: 2024-01-21
description: convex optimization第二章笔记。
# image: 
tags: [数学]
category: 学习
draft: false
---

- Affine sets
  - Line through points
  - <font color="#ff0000"> <strong>等价性：</strong></font>与 linear equation $\{x|Ax=b\}$ 等价
- Convex sets
  - Line segment between points
  - Convex cone
    - Conic (nonnegative) combination of points $x_{1}​,x_{2}​: x=\theta_1x_1+ \theta_2x_2, \forall \theta_1 \ge0, \theta_2 \ge 0$
    - Convex cone: a set that contains all conic combinations of points in the set.
- <font color="#ff0000">Some important examples of convex sets</font>
  - Hyperplanes and halfspaces
    - hyperplanes are affine and convex
    - halfspaces are convex
  - Euclidean balls and ellipsoids
    - (Euclidean) ball: $B(x_c,r)=\{ x|\ ||x-x_c||_2 \le r \} = \{ x_c+ru|\ ||u||_2 \le 1 \}$
    - Ellipsoid: $\{ x|(x-x_c)^T P^{-1} (x-x_c) \le 1 \}$, with $P$ symmetric positive definite.
      - other representation: $\{ x_c + Au|\ ||x_u||_2 \le 1 \}$
      - decomposition of symmetric positive definite matrix
        - cholesky decomposition: $P=R^TR=LL^T$
        - half power decomposition: $P=P^{\frac{1}{2}} P^{\frac{1}{2}}$
      - Principal axes
        - eigendecomposition
          - eigenvectors $q_i$ of $P$ give the principal axes
          - the width corresponding to $q_i$ is $2 \sqrt{\lambda_i}$​​
  - Norm
    - Common vector norms
      - Euclidean norm
      - $p$ -norm $(p \ge 1)$
      - Chebyshev norm ($\infty$-norm)
      - quadratic norm: $||x||_A = (x^T A x)^{\frac{1}{2}}$ ​, with $A$ symmetric positive definite
    - Common matrix norm
      - Frobenius norm: $||X||_F = (\sum_{i=1}^m \sum_{j=1}^n X_{ij}^2) ^{\frac{1}{2}}$
      - <span style="background:#fff88f">2-norm:</span> $||X||_2 = \underset{y \ne 0}{\sup} \frac{||Xy||_2}{ ||y||_2}=\sigma _{\max} (X)$
  - Norm balls and norm cones
    - **Norm ball:** $\{ x|\ ||x-x_c|| \le r \}$
      convex sets
    - **Norm cone:** $\{ (x,t) |\ ||x|| \le t \}$
      convex cone
  - polyhedra
  - positive semidefinite cone  
     注意半正定是 convex，但正定不是，因为正定不能取 0,所以系数也不能取 0.
    - $S^n_+$​ is a convex cone
- Operations that preserve convexity
  - 证明 convexity 的两种方法
    - 定义
    - 通过操作获得
  - intersection
  - <font color="#ff0000">affine functions </font>
    - the **image** of a convex set under $f$ is convex
    - the **inverse image** $f^{-1}(C)$ of a convex set under $f$ is convex.
      - $C \subseteq \mathbb{R}^m$ convex $\to$ $f^{-1}(C) = \{ x \in \mathbb{R}^m | Ax + b \in C \}$ is convex.  
         注意，这里没要求$A$可逆，也就是说，原像有多个也行。
    - Examples
      - scaling, translation, projection
      - <font color="#ff0000">hyperbolic cone</font>
      - <font color="#ff0000">solution set of linear matrix inequality </font>
        - $\{ x|x_1 A_1 + \cdots + x_m A_m \le B \}$, with $A_i, B \in S^p$.
  - perspective function
  - linear-fractional functions
- Generalized inequalities
  - proper cone: a convex cone $K \subseteq \mathbb{R}^n$ that satisfies three properties
    - K is closed
    - K is solid
    - K is pointed
  - generalized inequality: $x \le_K y \iff y -x \in K$.
    - $\le_K$ ​ is <font color="#ff0000">not in general a linear ordering</font>: we can have $x \nleq_K y$ and $y \nleq_K xy \nleq_K xy≰K​x$.
    - two definitions of the **minimum element**.
      - 其他元素都比它大
      - 没有比它小
- Dual cones
  - Inner products
    - Matrix: $<X,Y> =\text{tr}(X^TY)$
  - **Dual cone** of a cone K: $K^*=\{ y|<y,x> \ \geq 0 \ \forall x \in K \}$
    note: definition depends on choice of **inner product**
  - ![[Convex sets 2024-01-20 20.27.25.excalidraw]]

> [!note] 迹运算
>
> - 性质：$\text{tr}(ABC)=\text{tr}(BCA)=\text{tr}(CAB)$
>   因此，就可以得到下列表达式
>   $$ \text{tr}(qq^{T}X) = q^{T}X q $$
>   利用交换性质，以及标量的迹是其本身这个性质，很方便。
