---
title: "Convex functions"
published: 2024-01-27
description: convex optimization第三章笔记。
# image: 
tags: [数学]
category: 学习
draft: false
---

## Table of Contents

## 3.1 Basic properties and examples
### 3.1.1 Definition
> [!note]  Convex
> $f: \mathbb{R}^{n} \to \mathbb{R}$ is convex if $\text{dom}\ f$ is convex set and 
> $$ 
> f(\theta x + (1-\theta)y) \leq \theta f(x) + (1-\theta) f(y) 
> $$
> for all $x,y \in \text{dom} f, 0\leq \theta \leq 1 $

> [!tip] 注意
> - $f: \mathbb{R}^{n} \to \mathbb{R}$ 这里不是指定义域
> - 凸函数要求两个条件：（1）定义域是凸集；（2）满足 Jensen 不等式

> [!note] 充要条件：Restriction of a convex function to a line
> $f:\mathbb{R}^{n} \to \mathbb{R}$ is convex if and only if the function $g: \mathbb{R} \to \mathbb{R}$
> $$
> g(t)=f(x+tv), \quad \text{dom}\ g=\{t|x+tv \in \text{dom} f\}
> $$
> is convex for any $x\in \text{dom}f,\text{and all }v\in \mathbb{R}^n$

>[!tip] 注意
> - can check convexity of $f$ by checking convexity of functions of one variable. (换句话讲，可以限制在一条线上来判断是否是凸函数，这也就变成一个标量) 

> 定义 (矩阵仿射函数): $f(X)=\text{tr}(A^{T}X)+b$
### 3.1.2 Extended-value extensions

> [!NOTE] Extended-value extension
> - 通常用 $\tilde{f}$ 来表示。
> - 非定义域的函数值直接取 $\infty$，保证整个函数 convex

> [!tip] 注意：恢复定义域
> we can **recover the domain of the original function** $f$ from the extension $\tilde{f}$ as $\textbf{dom}\ f=\{ x|\tilde{{x}}<\infty \}$.
> - 主要原因在于，凸函数一定存在下界，而在定义域中的值，必定不是正无穷，否则不满足 Jensen 不等式。

**采用 extended-value extension 的好处是**
- 不需要考虑定义域，例如，在定义时，或者考虑两个凸函数的和

>[!attention] Indicator function of a convex set
> $$
> \tilde{I}_{C}(x)=\begin{cases} 0\quad x \in C \\ \infty \quad x \notin C \end{cases}
> $$ 
> <span style="background:#d3f8b6">关于这个函数有一些很重要的 trick：</span>
> - $\underset{C}{\min}\ f =\min\ f+\tilde{I}_{C}$ ：这个技巧在后面很有用
### 3.1.3 Fist-order conditions
>[!note] First-order condition
>Suppose $f$ is differentiable. Then $f$ is convex if and only if  $\textbf{dom}\ f$ is convex and 
> $$
> f(y)\geq f(x) + \nabla f(x)^{T}(y-x)
> $$ 
> for all $x,y \in \text{dom} f$
> - 右边的项实际上提供了一个 **global lower bound**，也是从局部到整体的一个信息，可以说是凸函数最重要的性质。
> - 凸函数一定存在最小值：例如存在 $\nabla f(x)=0$
> - 同样该性质可以描述 `严格凸`（此时注意等号仅 $x=y$ 时成立）<span style="background:#d3f8b6">(充要条件)</span>
> - 对于凹函数，也可以得到类似的性质
> - <span style="background:#d3f8b6">这个证明过程非常值得学习，首先从定义的等价性出发，转化为只需要证明标量的情况，然后就可以方便求导。</span>
### 3.1.4 Second-order conditions
>[!note] Second-order conditions
>Assume that $f$ is twice differentiable. Then $f$ is convex if and only if $\textbf{dom }f$ is convex and its Hessian is positive semidefinite: for all $x \in \textbf{dom }f$,
> $$
> \nabla^{2}f(x) \succeq 0 
> $$
> - 该性质如果不取等，可以推出严格凸，但反之不成立, e.g., $x^4$. <span style="background:#d3f8b6">(充分条件)</span>

>Note: $\textbf{dom }f$ is convex cannot be dropped from the first- or second-order characterizations of convexity and concavity. (e.g. $f(x)=\frac{1}{x^2}$ is not a convex function)
### 3.1.5 Examples
>[!example] Examples
>- Quadratic function
>- Least squares objective
>- Quadratic-over-linear function
>- Los-sum-exp function: $f(x)=\log \sum_{k=1}^{n} \exp x_{k}$ is convex. (算是 max 函数的一个近似)
>- Geometric mean: concave

>这些证明很值得一看
>注意：证明正交，要想到可能可以用柯西不等式，因此有平方和。

> 结论 1： $A>0 \iff R^{T}AR>0$，对任意非奇异矩阵 $R$。也就是说乘以非奇异矩阵不会破坏正定性质。<font color="#ff0000">非奇异矩阵保留正定性。</font>
> 结论 2：$PAP^{-1}$ 保留特征值（特征值不变）。<font color="#ff0000">可逆矩阵保留特征值。</font>
> 结论 3：实对称矩阵一定可以相似对角化。
### 3.1.6 Sublevel set

>[!note] Sublevel set
> The $\alpha$-**sublevel set** of $f: \mathbb{R}^{n} \to \mathbb{R}$:
> $$
> C_{\alpha}=\{ x \in \text{dom} f | f(x) \leq \alpha \}
> $$
> - Sublevel sets of convex functions are convex, for any value of $\alpha$.
> - The converse is not true. e.g., $f(x)=-e^x$.
> - If $f$ is concave, then its $\alpha$ -superlevel set, given by $\{ x \in \textbf{dom }f | f(x) \geq \alpha \}$, is a convex set.
> - 这是证明一个集合是凸集的办法。

### 3.1.7 Epigraph
>[!note] Epigraph
> for  $f:\mathbb{R}^{n} \to R$
> $$
> \text{epi}\ f = \{(x,t) \in \mathbb{R}^{n+1}| x \in \text{dom} f , f(x) \leq t \}
> $$
> -  $f$ is convex if and only if $\text{epi}\ f$ is a convex set. 
> - similarly, a function is concave if and only if its **hypograph**, defined as 
> $$
> \textbf{hypo }f=\{ (x,t)|t \leq f(x) \}
> $$ 
> is a convex set.
> - 这条性质建立了凸集和凸函数的联系。（充要）
### 3.1.8 Jensen's inequality and extensions
>[!note] Jensen's inequality
>**Extenstion:** if $f$ is convex, then
> $$
> f(\mathbf{E}z \leq \mathbf{E} f(z))
> $$
> for any random variable $z$
> - We can interpret it as follows. Suppose $x \in \textbf{dom }f \subseteq \mathbb{R}^{n}$ and $z$ is any zero mean random vector in $\mathbb{R}^n$. Then we have $$\mathbb{E}f(x+z) \geq f(X)$$
## 3.2 Operations that preserve convexity
>[!note] methods for establishing convexity of a function
> - verify definition (often simplified by restricting to aline)
> - for twice differentiable functions, show $\nabla^{2}f(x)\geq0$
> - show that $f$ is obtained from simple convex functions by operations that preserve convexity
### 3.2.1 Nonnegative weighted sums
### 3.2.2 Composition with an affine mapping
### 3.2.3 Pointwise maximum and supremum
> [!tip] maximum 与 supremum 的区别
> - 在有限点集上是一样的，在无限点集上，maximum 可能不存在，但 supremum 一定存在。因为 supremum 并不需要取到最大的那个点。
> - supreme 用于 infinite set

> [!note] pointwise supremum
> If for each $y \in \mathcal{A}$, $f(x,y)$ is convex in $x$, then the function $g$, defined as 
> $$
> g(x)=\underset{y \in \mathcal{A}}{\sup} f(x,y)
> $$ 
> is convex in $x$.Here the domain of $g$ is 
> $$
> \textbf{dom }g = \{ x|(x,y) \in \textbf{dom }f \text{ for all }y\in \mathcal{A}, \underset{y\in \mathcal{A}}{\sup}f(x,y)< \infty \}
> $$
>- Similarly, the pointwise infimum of a set of concave functions is a concave function.
>- The pointwise supremum of functions corresponds to the intersection of epigraphs.
>- 判断时，其实就是给定 $y$，看是否是 $x$ 的凸函数。

> [!example] Some examples
> - Support function of a set: 对应与集合 $C$ 中元素点积最大的元素。
> - <span style="background:#d3f8b6">Maximum eigenvalue of a symmetric matrix.</span> $f(X)=\lambda_{\max}(X)$, with $\textbf{dom }f=S^m$, is convex.
> - Norm of a matrix. (maximum singular value)

> Fact: $\lvert \lvert z \rvert \rvert_{a} = \sup \{ u^Tz|\lvert \lvert u \rvert \rvert_{a^*} =1\}$

>[!note] Representation as pointwise supremum of affine functions
>A good method for establishing convexity of a function: by expressing it as the pointwise supremum of a family of affine functions.
>- Almost every convex function can be expressed as the pointwise supremum of a family of affine functions.
>- For example, if $f:\mathbb{R}^{n}\to \mathbb{R}$ is convex, with $\textbf{dom }f=\mathbb{R}^n$, then we have $$f(x)=\sup \{ g(x)|g \text{ affine},\ g(z)\leq f(z)\text{ for all }z \}$$

### 3.2.4 Composition
> We examine conditions on $h:\mathbb{R}^{k}\to \mathbb{R}$ and $g:\mathbb{R}^{h}\to \mathbb{R}^k$ that guarantee convexity or concavity of their composition $f=h\circ g:\mathbb{R}^{n}\to \mathbb{R}$, defined by
> $$f(x)=h(g(x)), \textbf{dom }f = \{ x \in \textbf{dom }g|g(x) \in \textbf{dom }h \}$$

>[!note] Scalar composition
> $$
> f''(x)=h''(g(x))g'(x)^{2}+ h'(g(x)) g''(x)
> $$
> - $f,h$ 凹凸性一致（外部一致），注意一定是要求 $\tilde{h}$ 在整个 $\mathbb{R}$ 上。
> - $h'(x)g''(x)\geq 0$；要求凹的话，就小于等于 0

> **Note:** <span style="background:#d3f8b6">the requirement that monotonicity hold for the extended-value extension</span> $\tilde{h}$, and not just the function $h$, cannot be removed.

>[!note] Vector composition
>Suppose $$f(x)=h(g(x))=h(g_{1}(x),g_{2}(x),\dots,g_{k}(x)$$
>with $h: \mathbb{R}^{k}\to \mathbb{R}, g_{i}: \mathbb{R}^{n}\to R$ . We have
> $$
> f''(x)=g'(x)^{T}\nabla^{2}h(g(x)) g'(x) + \nabla h(g(x))^{T}g''(x)
> $$
> $f$ is convex if $h$ is convex and for each $i$, one of the following three cases holds:
> - $g_{i}$ is convex and $\tilde{h}$ nondecreasing in its $i$-th argument
> - $g_{i}$ is concave and $\tilde{h}$ nonincreasing in its $i$ -th argument
> - $g_{i}$ is affine.
> - 注意是 $\tilde{h}$，<span style="background:#d3f8b6">非常重要！</span>

### 3.2.5 Minimization
>[!note] Minimization
>If $f$ convex in $(x,y)$, and $C$ is a convex nonempty set, then the function 
> $$
> g(x)=\underset{y \in C}{\inf} f(x,y)
> $$
> is convex in $x$, provided $g(x)<\infty$ for some $x$. The domain of $g$ is the projection of $\textbf{dom }f$ on its $x$-coordinates, i.e., 
> $$
> \textbf{dom } g=\{ x|(x,y) \in \textbf{dom } f \text{ for some }y \in C \}
> $$

>[!attention] 注意
> $\inf$ 这里的 $C$ 需要独立于 $x$，可以通过重新定义的方法（扩充到正无穷）去掉 $C$ 的限制。

>[!note] infimum convolution
> $$
> \begin{align}h(x)&=\underset{y}{\inf}\ f(x)+g(x-y)\\ &= \underset{x_{1}+x_{2}=x}{\inf}\ f(x_{1})+g(x_{2}) \end{align}
> $$
### 3.2.6 Perspective of a function

>[!note] Perspective of a function
>If $f:\mathbb{R}^{n}\to \mathbb{R}$, then the perspective of $f$ is the function $g:\mathbb{R}^{n}\to \mathbb{R}$ defined by 
> $$
> g(x,t)=tf(x/t)
> $$ 
> with domain 
> $$
> \textbf{dom }g=\{ (x,t)|x/t\in \textbf{dom }f,t>0 \}
> $$

## 3.3 the conjugate function
### 3.3.1 Definition and examples
>[!note] conjugate function
>Let $f:\mathbb{R}^{n}\to \mathbb{R}$. The function $f^*:\mathbb{R}^{n}\to \mathbb{R}$, defines as 
> $$ 
> ^{*}(y)=\underset{x \in \textbf{dom }f}{\sup}\ (y^Tx-f(x))
> $$ 
> is called the **conjugate** of the function $f$.
>- 简单理解:  给定 $y$ 也就确定了一条直线，实际上这个就是求直线与 $f(x)$ 图像竖直距离的最大值。
>- <span style="background:#d3f8b6">定义域：</span>要求 supremum 是有限的，e.g., 考虑 $f(x)=ax+b$, 那么 $f^*(y)$ 的定义域是 $\{ a \}$.
>- <font color="#ff0000">一定是凸函数</font>
>- 当 $f$ 是凸函数时，就没必要限制 $x$ 在定义域了。

>[!warning] 注意
>- 可以看出来，最重要的一点就是找 $y$ 的定义域了。那么就关于 $x$ **求导**，取最大即可。
>- 关键在于找该函数取最大时，$x$ 的值。

### 3.3.2 Basic properties
>[!note] conjugate of the conjugate
>If $f$ is convex, and $f$ is closed (i.e., $\textbf{dom }f$ is a closed set), then $f^{**}=f$.
## 3.4 quasiconvex functions
>[!note] Quasiconvex function
>A function $f:\mathbb{R}^n\to \mathbb{R}$ is called **quasiconvex** or **unimodal** if its domain ad all its sublevel sets 
> $$
> S_{\alpha}=\{ x \in \textbf{dom }f | f(x) \leq \alpha \}
> $$ 
> for $\alpha \in \mathbb{R}$, are convex.
>- 这是从集合的角度来定义的，一是要求定义域是凸集，二是要求所有 sublevel 集合也是凸集。
>- Similarly, a function is **quasiconcave** if $-f$ is quasiconvex, i.e., every superlevel set $\{ x|f(x)\geq \alpha \}$ is convex.
>- For a function on $\mathbb{R}$, quasiconvexity requires that **each sublevel set be an interval**.
>- 甚至不要求函数连续
>- 一般通过定义来证明
### Basic properties
>[!note] Modified Jensen inequality
>for quasiconvex $f$, $0\leq \theta\leq 1$ 
> $$
> f(\theta x + (1-\theta)y) \leq \max\{ f(x),f(x) \}
> $$

>[!note] First-order condition
>differentiable $f$ with convex domain is quasiconvex iff 
> $$
> f(y)\leq f(x) \to \nabla f(x)^{T}(y-x)\leq 0
> $$
>- 竖直方向的增量是负的

>[!note] Sums
>sums of quasiconvex functions are not necessarily quasiconvex
## 3.5 Log-concave and log-convex functions
### 3.5.1 Definition
>[!note] Log-concave
>A function $f:\mathbb{R}^{n}\to \mathbb{R}$ is **logarithmically concave** or **log-concave**: if $f(x)>0$ for all $x \in \textbf{dom }f$ and $\log f$ is concave.

>[!note] Another definition
>A function $f:\mathbb{R}^{n}\to \mathbb{R}$, with convex domain and $f(x)>0$ for all $x \in \textbf{dom }f$, is log-concave if and only if for all $x,y \in \textbf{dom }f$ and $0\leq \theta\leq 1$, we have
> $$
> f(\theta x + (1-\theta)y) \geq f(x)^{\theta} f(y)^{1-\theta} 
> $$
> - A log-convex function is convex.
> - A non-negative concave function is log-concave.
> - many common probability densities are log-concave.
> - cdf of a Gaussian density is log-concave.
### 3.5.2 Properties
- Twice differentiable log-convex/concave functions
- Multiplication, addition, and integration
  - closed for multiplication and positive scaling
  - the sum of two log-convex functions is log-convex 
  - if $f(x,y)$ is log-convex in $x$ for each $y \in C$ then $$g(x)=\int _{C} f(x,y) \, dy $$ is log-convex.
- Integration of log-concave functions: if $f:\mathbb{R}^{n}\times \mathbb{R}^{m}\to \mathbb{R}$ is log-concave, then 
$$
g(x,y)=\int f(x,y) \, dy 
$$ 
is log-concave. (这个就是要求同时关于 x $x,y$ 都是 log-concave)
>[!note] Consequences of integration property
>convolution $f * g$ of log-concave functions $f,g$ is log-concave

>[!example] Yield function
> $$
> Y(x)=\textbf{prob}(x+w \in S)
> $$
> If $S$ is convex and $w$ has a log-concave p.d.f., then 
> - $Y$ is log-concave
> - yield regions $\{ x|Y(x) \geq \alpha \}$ are convex.
