---
title: Duality
published: 2024-02-23
description: Convex Optimization第五章笔记。对偶性理论的详细推导与解释。
# image: 
tags: [数学]
category: 学习
draft: false
---
## 1 The Lagrange dual function

### 1.1 The Lagrangian

### 1.2 The Lagrange dual function

- is always concave.
- take care the case where the $L$ is not differentiable.

### 1.3 Lower bounds on optimal value

### 1.4 Linear approximation interpretation

The Lagrangian and lower bound property can be interpreted as a linear approximation of the indicator functions of the sets $\{ 0 \}$ and $-\mathbb{R}_{+}$.

$$
\text{minimize} \quad f_{0}(x)=\sum_{i=1}^{m}I_{-}(f_{i}(x))+\sum_{i=1}^{p}I_{0}(h_{i}(x))
$$

Where $I_{-}:\mathbb{R} \to \mathbb{R}$ is the indicator function for the nonpositive reals,

$$
\begin{align}
I_{-}(u)=
\begin{cases}
0  \quad &u \le 0 \\
\infty & u>0
\end{cases}
\end{align}
$$

and similarly, $I_{0}$ is the indicator function of $\{ 0 \}$.

> Note: 通过 indicator function 去除 constraints，如果不满足则设置很大的惩罚。
> Note: 整个思想其实就是， replacing the **hard** constraints with **soft** versions.

### 1.5 Examples

- Least-squares solution of linear equations
- Standard form LP
- **Equality constrained norm minimization** (!!!)
- Two-way partitioning problem (nonconvex)

> [!note] the infimum of a quadratic form $x^{T}S x$
>
> - if $S\ge 0$, the infimum is 0.
> - if $S \ngeq 0$, then we can find a vector $y$ such that $y^{T}S y<0$, let $x=ty, t \in \mathbb{R}$. then $x^{T}Sx=t^{2}y^{T}Sy\to \infty$, when $t\to \infty$. **(This is a frequently used trick)**

> [!note] Dual norm
>
> $$
> \lVert v \rVert_{*} = \underset{\lVert u \rVert\leq 1}{\sup} u^{T}v
> $$

> Obtain the lower bound:
>
> - **Lagrangian** is a good way to obtain a lower bound for some problem. This can be useful when we need to analyze some algorithms. (I guess)
> - A another way to get o lower bound is to **augment its feasible set**. (relaxation with constraints)

### 1.6 The Lagrange dual function and conjugate functions

Consider an optimization problem with linear inequality and equality constraints,

$$
\begin{align}
\text{minimize} \quad &f_{0}(x) \\
\text{subject to} \quad &Ax\leq b \\
& Cx = d
\end{align}
$$

Then we can write the dual function as

$$
g(\lambda, \nu)= -b^{T}\lambda - d^{T}\nu - f_{0}^{*}(-A^{T}\lambda - C^ {T}\nu)
$$

The domain of $g$ follows from the domain of $f_{0}^*$:

$$
\mathbf{dom}\ g = \{ (\lambda, \nu) | -A^{T}\lambda - C^{T}\nu \in \mathbf{dom}\ f_{0}^* \}
$$

**Examples:**

- Equality constrained norm minimization #confusion
- Entropy maximization: the conjugate of the function $u\log u$, with scalar variable $u$, is $e^{v-1}$.
- Minimum volume covering ellipsoid

> Note: an equivalent form of $x^{T}Sx$: $\mathbf{tr}(xx^{T}S)$.

## 2 The Lagrange dual problem

$$
\begin{align}
&\text{maximize} &&g(\lambda,\nu) \\
&\text{subject to} &&\lambda\geq 0
\end{align}


$$

- The **dual feasible** is to describe a pair $(\lambda,\nu)$ with $\lambda \geq 0$ and $g(\lambda,\nu)>-\infty$.
- The Lagrange dual problem is **a convex optimization problem**. This is the case whether or not the primal problem is convex.

### 2.1 Making dual constraints explicit

The domain of the dual function

$$
\mathbf{dom}\ g = \{ (\lambda, \nu)\ |\ g(\lambda,\nu) > -\infty \}
$$

- Lagrange dual of standard form LP
- Lagrange dual of inequality form LP

### 2.2 Weak duality

We denote the optimal value of the Lagrange dual problem as $d^*$. Then, we have a simple inequality:

$$
d^{*}\leq p^*
$$

- The weak duality inequality holds when $d^*$ and $p^*$ are infinite.
- The _optimal duality gap_ of the original problem is $p^*-d^*$, which is always nonnegative.

### 2.3 Strong duality and Slater's constraint qualification

If the equality

$$
d^*=p^*
$$

holds, then we say that _strong duality_ holds.

- does not hold in general
- (usually) holds for convex problems
- sufficient conditions that guarantee strong duality in convex problems are called _constraint qualifications_

**Slater's condition**: There exists an $x \in \mathbf{relint}\ D$ such that

$$
f_{i}(x)<0, \quad i=1,\dots,m, \quad Ax=b.
$$

Such a point is sometimes called strictly feasible. Slater's theorem states that strong duality holds, if Slater's condition holds and **the problem is convex**.

- also guarantees that the dual optimum is **attained** when $d^*>-\infty$.
- The affine inequalities do not need to hold with strict inequality.

### 2.4 Examples

- Least-squares solution of linear equations
- Lagrange dual of LP: One of the two is feasible, then the strong duality holds.
- Lagrange dual of QCQP:
- Entropy maximization
- Minimum volume covering ellipsoid
- <font color="#ff0000">A nonconvex quadratic problem with strong duality</font>: trust region problem

> Note: for $Ax=b$, when $b \notin \mathcal{R}(A)$, there is a $z$ with $A^{T}z=0,b^{T}z\ne 0$. (**A trick**)
> Note: strong duality holds for any optimization problem with quadratic objective and one quadratic inequality constraint.

### 2.5 Mixed strategies for matrix games 

## 3 Geometric interpretation

### 3.1 Weak and strong duality via set of values

$$
\mathcal{G}=\{(f_1(x),\ldots,f_m(x),h_1(x),\ldots,h_p(x),f_0(x))\in\mathbf{R}^m\times\mathbf{R}^p\times\mathbf{R}\mid x\in\mathcal{D}\}
$$

which is the set of values taken on by the constraint and objective functions. The optimal value $p^\star$ of primal problem is easily expressed as

$$
p^{\star}=\inf\{t\mid(u,v,t)\in\mathcal{G},\ u\preceq 0,\ v=0\}
$$

Then, we have

$$
g(\lambda,\nu)=\inf\{(\lambda,\nu,1)^{T}(u,v,t)\ | \ (u,v,t)\in\mathcal{G}\}
$$

In particular, the inequality

$$
(\lambda,\nu,1)^{T}(u,v,t)\geq g(\lambda,\nu)
$$

defines a supporting hyperplane to $\mathcal{G}$. (non vertical)

- **Epigraph variation**

### 3.2 Proof of strong duality under constraint qualification 

### 3.3 Multicriterion interpretation 

## 4 Saddle-point interpretation 

## 5 Optimality conditions

If strong duality holds, then $x$ is primal optimal and $(\lambda,\nu)$ is dual optimal if:

- $x$ is feasible
- $(\lambda,\nu)$ is feasible
- $f_{0}(x)=g(\lambda,\nu)$

### 5.1 Certificate of suboptimality and stopping criteria 

### 5.2 Complementary slackness

assume $x$ satisfies the primal constraints and $\lambda\geq0$

$$
\begin{align}
g(\lambda,\nu)& \begin{aligned}=\quad\inf_{\tilde{x}\in\mathcal{D}}\left(f_0(\tilde{x})+\sum_{i=1}^m\lambda_if_i(\tilde{x})+\sum_{i=1}^p\nu_i^\star h_i(\tilde{x})\right)\end{aligned}  \\
&\leq\quad f_0(x)+\sum_{i=1}^m\lambda_if_i(x)+\sum_{i=1}^p\nu_ih_i(x) \\
&\leq\quad f_0(x)
\end{align}
$$

equality $f_0(x)=g(\lambda,\nu)$ holds if and only if the two inequalities hold with equality:

- first inequality: $x$ minimizes $L(\tilde{x},\lambda,\nu)$ over $\tilde{x}\in\mathcal{D}$
- 2nd inequality: $\lambda_if_i(x)=0$ for $i=1,\ldots,m,ie.$
  $$\lambda_i>0\quad\Longrightarrow\quad f_i(x)=0,\quad f_i(x)<0\quad\Longrightarrow\quad\lambda_i=0$$
  this is known as complementary slackness.

### 5.3 KKT optimality conditions

if strong duality holds, then $x$ is primal optimal and $(\lambda,\nu)$ is dual optimal if

1. $f_i(x)\leq0$ for $i=1,\ldots,m$ and $h_i(x)=0$ for $i=1,\ldots,p$
2. $\lambda\geq0$
3. $\lambda_if_i(x)=0$ for $i=1,\ldots,m$
4. $x$ is a minimizer of $L(\cdot,\lambda,\nu)$

conversely, these four conditions imply optimality of $x,(\lambda,\nu)$ and strong duality

if problem is **convex** and the functions $f_i,h_i$ are differentiable #4 can written as
4'. the gradient of the Lagrangian with respect to $x$ vanishes:

$$
\nabla f_{0}(x)+\sum_{i=1}^{m}\lambda_{i}\nabla f_{i}(x)+\sum_{i=1}^{p}\nu_{i}\nabla h_{i}(x)=0
$$

conditions 1,2,3,4' are known as Karush-Kuhn- Tucker (KKT) conditions.

## 6 Perturbation and Sensitivity analysis

### 6.1 The perturbed problem

$$
\begin{align}
&\text{minimize} && f_{0}(x) \\
&\text{subject to} && f_{i}(x)\leq u_{i}, \quad i=1,\dots,m \\
& &&h_{i}(x)\leq v_{i},\quad i=1,\dots,p
\end{align}
$$

- $u_{i}$ is positive: relax the $i$ th inequality constraint
- $u_{i}$ is negative: tight the $i$ th inequality constraint

we define $p^*(u,v)$ as the _optimal value_ of the perturbed problem:

$$
p^{*}(u,v) = \inf \{ f_{0}(x)\;|\; \exists x \in \mathcal{D}, f_{i}(x)\leq u_{i},\; i=1,\dots,m,\;h_{i}(x)=v_{i},\;i=1,\dots,p \}
$$

- we can have $p^{*}(u,v)=\infty$
- $p^{*}(0,0)=p^{*}$
- when the original problem is convex, the function $p^{*}$ is a convex function of $u$ and $v$.

### 6.2 A global inequality

Assume that **strong duality holds**, and that the dual optimum is attained. Let $(\lambda^{*},v^{*})$ be optimal for the dual of the _unperturbed problem_. Then for all $u$ and $v$ we have

$$
p^{*}(u,v)\geq p^{*}(0,0)- \lambda^{* \ T}u-v^{*\ T}v
$$

**Sensitivity interpretations:**
![[b21a7823aef5cf9d0fb8973dff1540e 1.jpg|450]]

- If $\lambda_{i}^{*}$ is large and we tighten the $i$ th constraint (i.e., choose $u_{i} < 0$), then the optimal value $p^{*}(u,v)$ is guaranteed to increase greatly.
- If $\nu^{*}_{i}$ is large and positive and we take $v_{i} < 0$, or if $\nu^{*}_{i}$ is large and negative and we take $v_{i}>0$, then the optimal value $p^{*}(u,v)$ is guaranteed to increase greatly.
- If $\lambda_{i}^{*}$ is small, and we loosen the $i$ th constraint ($u_{i} > 0$), then the optimal value $p^{*}(u,v)$ will not decrease too much.
- If $\nu^{*}_{i}$ is small and positive, and $v_{i} > 0$, or if $\nu^{*}_{i}$ is small and negative and $v_{i}<0$, then the optimal value $p^{*}(u,v)$ will not decrease too much.

> The inequality just gives a **lower bound** on the perturbed optimal value.

### 6.3 Local sensitivity analysis

Suppose that $p^{*}(u,v)$ is differentiable at $u=0,v=0$. Then, provided strong duality holds, the optimal dual variables $\lambda^{*},\nu^{*}$ are related to the gradient of $p^{*}$ at $u=0,v=0$:

$$
\lambda^{*}_{i}=-  \frac{\partial p^{*}(0,0)}{\partial u_{i}}, \quad \nu^{*}_{i}=-  \frac{\partial p^{*}(0,0)}{\partial v_{i}}
$$

If $f_{i}(x^{*})<0$, then the constraint is inactive, and it follows that the constraint can be tightened or loosened a small amout without affecting the optimal value.
We suppose that $f_{i}(x^{*})=0$ (active). The $i$ th optimal Lagrange multiplier tells us how active the constraint is:

- If $\lambda_{i}^{*}$ is small, the constraint can be loosened or tightened a bit without much effect on the optimal value
- If $\lambda_{i}^{*}$ is large, it means that if the constraint is loosened or tightened a bit, the effect on the optimal value will be great

## 7 Examples

Simple equivalent reformulations of a problem can lead to very different dual problems.

- Introducing new variables and equality constraints: can add information for the Lagrangian dual function
- Transforming the objective
- Implicit constraints: make the explicit constraints implicit

## 8 Semidefinite optimization

$$
\begin{align}
&\text{minimize} && c^Tx \\
&\text{subject to} &&x_1F_1+\cdots+x_nF_n\leq G
\end{align}
$$

matrices $F_1,\ldots,F_n,G$ are symmetric $m\times m$ matrices

**Lagrangian and dual function**
· we associate with the constraint a Lagrange multiplier $Z\in\mathbb{S}^m$
· define Lagrangian as

$$
\begin{gathered}
L(x,Z) \begin{aligned}=\quad c^Tx+\mathrm{tr}\left(Z(x_1F_1+\cdots+x_nF_n-G)\right)\end{aligned} \\
=\quad\sum_{i=1}^n(\operatorname{tr}(F_iZ)+c_i)x_i-\operatorname{tr}(GZ)
\end{gathered}
$$

· dual function

$$
\left.g(Z)=\inf_xL(x,Z)=\left\{\begin{array}{ll}-\operatorname{tr}(GZ)&\operatorname{tr}(F_iZ)+c_i=0,&i=1,\ldots,n\\-\infty&\text{otherwise}\end{array}\right.\right.
$$

### 8.1 Dual semidefinite program

$$
\begin{align}
&\text{maximize} && -\text{tr}(GZ) \\
&\text{subject to} && \text{tr}(F_{i} Z) + c_{i} = 0, \quad i=1,\dots,n \\
& &&Z\geq 0
\end{align}
$$

- **Weak duality**: $p^{*}\geq d^{*}$ always
- **Strong duality**: $p^{*}=d^{*}$ if primal SDP or dual SDP is strictly feasible

> we can readily check whether strong duality holds before we start to solve the problem

> if $X\geq 0,Z\geq 0$, then $\text{tr}(XZ)\geq 0$

> [!note] Matrix decomposition
> For a matrix $X\geq 0$, we can decompose $X$ as
>
> $$
> X=U U^T
> $$
>
> For example, let $X=Q\Sigma^{\frac{1}{2}}\Sigma^{\frac{1}{2}}Q^T=VV^T$

### 8.2 complementary slackness

the primial and dual object values at feasible $x, Z$ are equal if

$$
0= \text{tr}(XZ) \quad \text{where} \ X=G-x_{1}F_{1}-\cdots - x_{n}F_{n}
$$

## 9 Theorems of alternatives

**two related fesibility problems**

- weak alternatives: if at most one is feasible
- strong alternatives: if exactly one is feasible

> wear alternative is easy to check, for strong alternatives, we need to check both infeasible is impossible

### 9.1 Nonlinear inequalities

### 9.2 Theorem of alternatives for linear matrix inequality

> we can see that the proof of above questions is achieved by **strong duality**.
