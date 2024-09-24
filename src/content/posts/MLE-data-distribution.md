---
title: How Log-Likelihood Helps Approximate the True Data Distribution?
published: 2024-09-19
description: Some thoughts about why we use log-likelihood as the loss function when we approximate the true data distribution.
tags:
  - MLE
  - ML
category: 学习
draft: false
---

We have a true data distribution $p_{\mathrm{data}}(x)$, and our goal is to make our model distribution $p_{\theta}(x)$ to approximate $p_{\mathrm{data}}(x)$. We often choose MLE as the loss function. However, why maximizing $\log p_{\theta}(x)$ can approximate $p_{\mathrm{data}}(x)$?

Usually, if we want to describe or quantize the difference between two distributions, we choose KL divergence as the metrics. For example, in this case, we care about minimizing $\mathrm{KL}(p_{\mathrm{data}}||p_{\theta})$, and

$$
\begin{align}
\mathrm{KL}(p_{\mathrm{data}}||p_{\theta}) &= \mathbb{E}_{p_{\mathrm{data}}(x)} \left[ \log \frac{p_{\mathrm{data}}(x)}{p_{\theta}(x)} \right] \\
&= \mathbb{E}_{p_{\mathrm{data}}(x)} [\log p_{\mathrm{data}}(x)] - \mathbb{E}_{p_{\mathrm{data}}(x)} [\log p_{\theta}(x)] \\
&=\mathrm{Constant} - \mathbb{E}_{p_{\mathrm{data}}(x)} [\log p_{\theta}(x)]
\end{align}
$$

Therefore, minimizing $\mathrm{KL}(p_{\mathrm{data}}||p_{\theta})$ is equivalent to maximizing $\mathbb{E}_{p_{\mathrm{data}}(x)} [\log p_{\theta}(x)]$. That is,
$$
\min\ \text{KL}(p_{\text{data}} \, \| \, p_{\theta}) \iff \max\ \mathbb{E}_{p_{\text{data}}} [\log p_{\theta}]
$$

Notably, we care about the **expectation on the whole data distribution**. As a result, in practice, we have the dataset $\mathcal{D}=\{ x_{1},x_{2},\dots,x_{n} \}$, and then we use these samples to approximate expected log likelihood:

$$
\mathcal{L}(\theta)=\frac{1}{n} \sum_{i=1}^{n} \log p_{\theta}(x_{i})
$$

According to the Law of large numbers, $\mathcal{L}(\theta)$ will approximate expected log likelihood as $n\to \infty$. So, if we have enough samples, approximate $\theta$ will converge to the actual $\theta_{0}$, which means $p_{\theta}(x)$ will converge to $p_{\mathrm{data}}(x)$.
