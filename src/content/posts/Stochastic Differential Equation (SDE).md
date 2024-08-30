---
title: Stochastic Differential Equation (SDE)
published: 2024-08-27
description: Note for "Tutorial on Diffusion Models for Imaging and Vision"
tags:
  - 生成式AI
category: 学习
draft: false
---
## Content
## 1 Forward and Backward Iterations in SDE
The basic idea comes from gradient descent algorithm.
$$
\begin{align}
\mathbf{x}_i=\mathbf{x}_{i-1}-\tau'\nabla f(\mathbf{x}_{i-1})+\mathbf{z}_{i-1}\\ \Longrightarrow\quad\mathbf{x}(t+\Delta t)=\mathbf{x}(t)-\tau\nabla f(\mathbf{x}(t))+\mathbf{z}(t).
\end{align}
$$
Now, let' s define a random process $\mathbf{w} ( t)$ such that z$( t) = \mathbf{w} ( t+ \Delta t) - \mathbf{w} ( t) \approx \frac {d\mathbf{w} ( t) }{dt}\Delta t$ for a very small $\Delta t.$ In computation, we can generate such a $\mathbf{w}(t)$ by integrating z$(t)$ (which is a Wiener process). With w$(t)$ defined, we can write

$$
\begin{align}
\mathbf{x}(t+\Delta t)&=\mathbf{x}(t)-\tau\nabla f(\mathbf{x}(t))+\mathbf{z}(t)\\ \Longrightarrow\quad\mathbf{x}(t+\Delta t)-\mathbf{x}(t)&=-\tau\nabla f(\mathbf{x}(t))+\mathbf{w}(t+\Delta t)-\mathbf{w}(t)\\ 
\Longrightarrow\quad \quad \quad \quad \quad \quad \quad d\mathbf{x}&=-\tau\nabla f(\mathbf{x})dt+d\mathbf{w}.
\end{align}
$$

> Note that we often use $d\mathbf{w} =\sqrt{ \Delta t} \mathbf{z}(t)$, which is different from this equation.

> [!IMPORTANT] 
> **Forward Diffusion**
> $$
> d\mathbf{x}=\underbrace{\mathbf{f}(\mathbf{x},t)}_{\mathrm{drift}}\:dt+\underbrace{g(t)}_{\mathrm{diffusion}}\:d\mathbf{w}.
> $$


> [!IMPORTANT] 
> **Reverse SDE**
> $$
> d\mathbf{x}=\underbrace{[\mathbf{f}(\mathbf{x},t)}_{\mathrm{drift}}-g(t)^2\underbrace{\nabla_\mathbf{x}\log p_t(\mathbf{x})]}_{\text{score function}}\:dt\quad+\underbrace{g(t)d\overline{\mathbf{w}}}_{\text{reverse-time diffusion}},
> $$
> where $p_t(\mathbf{x})$ is the probability distribution of $\mathbf{x}$ at time $t$, and $\overline{\mathbf{w}}$ is the Wiener process when time flows backward.

## 2 Stochastic Differential Equation for DDPM

We consider the discrete-time DDPM iteration. For $i=1,2,\dots,N$:
$$
\begin{aligned}\mathbf{x}_i&=\sqrt{1-\beta_i}\mathbf{x}_{i-1}+\sqrt{\beta_i}\mathbf{z}_{i-1},\quad&\mathbf{z}_{i-1}\sim\mathcal{N}(0,\mathbf{I}).\end{aligned}
$$

> [!IMPORTANT] 
> The forward sampling equation of **DDPM** can be written as an SDE via
> $$
> d\mathbf{x}=\underbrace{-\frac{\beta(t)}2\textbf{ x}}_{=\mathbf{f}(\mathbf{x},t)}dt+\underbrace{\sqrt{\beta(t)}}_{=g(t)}d\mathbf{w}.
> $$

> Note that here $\mathbf{w}$ is the Wiener process.

- DDPM iteration itself is solving the SDE. (a first order method)

> [!IMPORTANT] 
> The reverse sampling equation of **DDPM** can be written as an SDE via
> $$
> d\mathbf{x}=-\beta(t)\left[\frac{\mathbf{x}}{2}+\nabla_{\mathbf{x}}\log p_t(\mathbf{x})\right]dt+\sqrt{\beta(t)}d\overline{\mathbf{w}}.
> $$

$$
\begin{aligned}
&\mathbf{x}(t)-\mathbf{x}(t-\Delta t)=-\beta(t)\Delta t\left\lfloor\frac{\mathbf{x}(t)}{2}+\nabla_\mathbf{x}\log p_t(\mathbf{x}(t))\right\rfloor-\sqrt{\beta(t)\Delta t}\mathbf{z}(t) \\
&\implies\quad\mathbf{x}(t-\Delta t)=\mathbf{x}(t)+\beta(t)\Delta t\left[\frac{\mathbf{x}(t)}{2}+\nabla_{\mathbf{x}}\operatorname{log}p_t(\mathbf{x}(t))\right]+\sqrt{\beta(t)\Delta t}\mathbf{z}(t). \\
\end{aligned}
$$
By grouping the terms, and assuming that $\beta(t)\Delta t\ll1$, we recognize that
$$
\begin{aligned}
\mathbf{x}(t-\Delta t)& \begin{aligned}&=\mathbf{x}(t)\left[1+\frac{\beta(t)\Delta t}{2}\right]+\beta(t)\Delta t\nabla_\mathbf{x}\log p_t(\mathbf{x}(t))+\sqrt{\beta(t)\Delta t}\mathbf{z}(t)\end{aligned} \\
&\approx\mathbf{x}(t)\left[1+\frac{\beta(t)\Delta t}2\right]+\beta(t)\Delta t\nabla_\mathbf{x}\log p_t(\mathbf{x}(t))+\frac{(\beta(t)\Delta t)^2}2\nabla_\mathbf{x}\log p_t(\mathbf{x}(t))+\sqrt{\beta(t)\Delta t}\mathbf{z}(t) \\
&=\left[1+\frac{\beta(t)\Delta t}{2}\right]\left(\mathbf{x}(t)+\beta(t)\Delta t\nabla_\mathbf{x}\log p_t(\mathbf{x}(t))\right)+\sqrt{\beta(t)\Delta t}\mathbf{z}(t)
\end{aligned}
$$
Then, following the discretization scheme, we can show that
$$
\begin{aligned}\mathbf{x}_{i-1}&=(1+\frac{\beta_i}2)\bigg[\mathbf{x}_i+\frac{\beta_i}2\nabla_\mathbf{x}\log p_i(\mathbf{x}_i)\bigg]+\sqrt{\beta_i}\mathbf{z}_i\\&\approx\frac1{\sqrt{1-\beta_i}}\left[\mathbf{x}_i+\frac{\beta_i}2\nabla_\mathbf{x}\log p_i(\mathbf{x}_i)\right]+\sqrt{\beta_i}\mathbf{z}_i,\end{aligned}
$$
where $p_i(\mathbf{x})$ is the probability density function of $\mathbf{x}$ at time $i.$ For practical implementation, we can replace $\nabla_\mathbf{x}\log p_i(\mathbf{x}_i)$ by the estimated score function $\mathbf{s}_\boldsymbol{\theta}(\mathbf{x}_i).$

## 3 Stochastic Differential Equation for SMLD
Although there isn't a forward diffusion step, if we divide the noise scale (e.g., $\mathbf{x}+\sigma \mathbf{z}$) in the SMLD training into $N$ levels, then the recursion should follow a Markov chain
$$
\mathbf{x}_i=\mathbf{x}_{i-1}+\sqrt{\sigma_i^2-\sigma_{i-1}^2}\mathbf{z}_{i-1},\quad i=1,2,\ldots,N.
$$
If we assume that the variance of $\mathbf{x}_{i-1}$ is $\sigma_{i-1}^2$, then we can show that
$$
\begin{aligned}
\mathrm{Var}[\mathbf{x}_{i}]&=\mathrm{Var}[\mathbf{x}_{i-1}]+(\sigma_{i}^{2}-\sigma_{i-1}^{2})\\&=\sigma_{i-1}^{2}+(\sigma_{i}^{2}-\sigma_{i-1}^{2})=\sigma_{i}^{2}.
\end{aligned}
$$
Therefore, given a sequence of noise levels, above equation will indeed generate estimates $\mathbf{x}_i$ such that the noise
statistics will satisfy the desired property.

Assuming that in the $\operatorname*{limit}\left\{\sigma_i\right\}_{i=1}^N$becomes the continuous time $\sigma(t)$ for $0\leq t\leq1$, and $\{\mathbf{x}_i\}_i=1^N$ becomes $\mathbf{x}(t)$ where $\mathbf{x}_i=\mathbf{x}(\frac iN)$ if we let $t\in\{0,\frac1N,\ldots,\frac{N-1}N\}.$ Then we have
$$\begin{aligned}\mathbf{x}(t+\Delta t)&=\mathbf{x}(t)+\sqrt{\sigma(t+\Delta t)^2-\sigma(t)^2}\mathbf{z}(t)\\&\approx\mathbf{x}(t)+\sqrt{\frac{d[\sigma(t)^2]}{dt}\Delta t}\:\mathbf{z}(t).\end{aligned}$$
At the limit when $\Delta t\to0$, the equation converges to
$$d\mathbf{x}=\sqrt{\frac{d[\sigma(t)^2]}{dt}}\:d\mathbf{w}.$$

> [!NOTE] 
> The forward sampling equation of **SMLD** can be written as an SDE via
> $$
> d\mathbf{x}=\sqrt{\frac{d[\sigma(t)^2]}{dt}}\:d\mathbf{w}.
> $$
****


> [!NOTE] 
> The reverse sampling equation of **SMLD** can be written as an SDE via
> $$
> d\mathbf{x}=-\left(\frac{d[\sigma(t)^2]}{dt}\nabla_\mathbf{x}\log p_t(\mathbf{x}(t))\right)dt+\sqrt{\frac{d[\sigma(t)^2]}{dt}}\:d\overline{\mathbf{w}}.
> $$

For the discrete-time iterations, we first define $\alpha(t)=\frac{d[\sigma(t)^2]}{dt}.$ Then, using the same set of discretization setups as the DDPM case, we can show that
$$
\begin{aligned}
\mathbf{x}(t+\Delta t)-\mathbf{x}(t)&=-\Big(\alpha(t)\nabla_{\mathbf{x}}\log p_{t}(\mathbf{x})\Big)\Delta t-\sqrt{\alpha(t)\Delta t}\:\mathbf{z}(t)\\
\Rightarrow \quad \quad \quad \quad \quad \quad \mathbf{x}(t)&=\mathbf{x}(t+\Delta t)+\alpha(t)\Delta t\nabla_{\mathbf{x}}\log p_{t}(\mathbf{x})+\sqrt{\alpha(t)\Delta t}\:\mathbf{z}(t)\\
\Rightarrow \quad \quad \quad \quad \quad \quad \mathbf{x}_{i-1}&=\mathbf{x}_{i}+\alpha_{i}\nabla_{\mathbf{x}}\log p_{i}(\mathbf{x}_{i})+\sqrt{\alpha_{i}}\:\mathbf{z}_{i}\\
\Rightarrow \quad \quad \quad \quad \quad \quad \mathbf{x}_{i-1}&=\mathbf{x}_{i}+(\sigma_{i}^{2}-\sigma_{i-1}^{2})\nabla_{\mathbf{x}}\log p_{i}(\mathbf{x}_{i})+\sqrt{(\sigma_{i}^{2}-\sigma_{i-1}^{2})}\:\mathbf{z}_{i},
\end{aligned}
$$
which is identical to the SMLD reverse update equation.
## 4 Solving SDE

**Predictor-Corrector Algorithm**： 
If we have already trained the score function $s_{\boldsymbol{\theta}}(\mathbf{x}_{i}, i)$, we can run the score-matching equation. For example, in the $N$ time steps (reverse process), we can run $M$ times score-matching equation to make the correction.

**Accelerate the SDE Solver:** 

> [!NOTE] 
> **Theorem** [Variation of Constants]. Consider the ODE over the range $[s,t]:$
> $$
> \frac{dx(t)}{dt}=a(t)x(t)+b(t),\quad\mathrm{where}\:x(t_0)=x_0.
> $$
> The solution is given by
> $$
> x(t)=x_0e^{A(t)}+e^{A(t)}\int_{t_0}^te^{-A(\tau)}b(\tau)d\tau.
> $$
> where $A(t)=\int_{t_{0}}^{t}a(\tau)d\tau.$


