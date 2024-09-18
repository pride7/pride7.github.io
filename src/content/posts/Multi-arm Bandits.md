---
title: Multi-arm Bandits
published: 2024-09-18
description: "Note for Chapter 2 of RL: an introduction"
tags:
  - RL
category: 学习
draft: false
date_created: 2024-09-18-周三
---
Reinforcement learning uses training information to
- evaluate the actions taken
- rather than instruct by giving correct actions

## 1 Action-Value Methods

Sample-average methods:
$$
Q_t(a)=\frac{R_1+R_2+\cdots+R_{N_t(a)}}{N_t(a)}.
$$
This <font color="#ff0000">greedy</font> action selection method can be written as
$$
A_t=\underset{a}{\operatorname*{\arg\max}}Q_t(a).
$$
$\varepsilon$-greedy methods: with small probability $\varepsilon$ to select randomly.
- An advantage of these methods is that, in the limit as the number of plays increases, every action will be sampled an infinite number of times, guaranteeing that $N_t(a)\to\infty$ for all $a$, and thus ensuring that all the $Q_t(a)$ converge to $q(a).$ 

## 2 Incremental Implementation
$$
NewEstimate\leftarrow OldEstimate+StepSize\begin{bmatrix}Target-OldEstimate\end{bmatrix}.
$$
## 3 Tracking a Nonstationary Problem

If the bandit is changing over time, we can use a constant step-size parameter.
$$
Q_{k+1}=Q_k+\alpha\Big[R_k-Q_k\Big],
$$
where the step-size parameter $\alpha\in(0,1]$ is constant. This results in $Q_{k+1}$ being a weighted average of past rewards and the initial estimate $Q_{1}$:
$$
Q_{k+1}=\quad(1-\alpha)^kQ_1+\sum_{i=1}^k\alpha(1-\alpha)^{k-i}R_i.
$$
A well-known result in stochastic approximation theory gives us the conditions required to assure convergence with probability 1:
$$
\sum_{k=1}^\infty\alpha_k(a)=\infty\quad \quad\mathrm{and}\quad \sum_{k=1}^\infty\alpha_k^2(a)<\infty.
$$
- The first condition is required to guarantee that the steps are large enough to eventually overcome any initial conditions or random fluctuations. 
- The second condition guarantees that eventually the steps become small enough to assure convergence.

## 4 Optimistic Initial Values

For methods with constant α, the bias is permanent. 
- The downside is that the initial estimates become, in effect, a set of parameters that must be picked by the user, if only to set them all to zero. 
- The upside is that they provide an easy way to supply some prior knowledge about what level of rewards can be expected.

## 5 Upper-Confidence-Bound Action Selection

When exploration, it would be better to select among the non-greedy actions according to their potential for actually being optimal, taking into account both how close their estimates are to being maximal and the uncertainties in those estimates. One effective way of doing this is to select actions as
$$
A_t=\arg\max_a\left[Q_t(a)+c\sqrt{\frac{\ln t}{N_t(a)}} \right],
$$
where the number $c > 0$ controls the degree of exploration. If $N_{t}(a) = 0$, then a is considered to be a maximizing action.

- The idea of UCB action selection is that the square-root term is a measure of the uncertainty or variance in the estimate of $a$'s value.
- Each time $a$ is selected the uncertainty is presumably reduced.
- The use of the natural logarithm means that the increase gets smaller over time, but is unbounded, so all actions will eventually be selected.

## 6 Gradient Bandits

In this section we consider learning a numerical preference $H_{t}(a)$ for each action $a$. Then, the action probability is
$$
\Pr\{A_t{=}a\}=\frac{e^{H_t(a))}}{\sum_{b=1}^ne^{H_t(b)}}=\pi_t(a),
$$
There is a natural learning algorithm for this setting based on the idea of <font color="#ff0000">stochastic gradient ascent</font>. On each step, after selecting the action $A_t$ and receiving the reward $R_t$, the preferences are updated by:
$$
\begin{aligned}H_{t+1}(A_t)&=H_t(A_t)+\alpha\big(R_t-\bar{R}_t\big)\big(1-\pi_t(A_t)\big),\quad&\text{and}\\H_{t+1}(a)&=H_t(a)-\alpha\big(R_t-\bar{R}_t\big)\pi_t(a),\quad&\forall a\neq A_t,\end{aligned}
$$

where $\alpha>0$ is a step-size parameter, and $\bar{R}_t\in\mathbb{R}$ is the average of all the rewards up through and including time $t$, which can be computed incrementally. The $\bar{R}_t$ term serves as a baseline with which the reward is compared. If the reward is higher than the baseline, then the probability of taking $A_t$ in the future is increased, and if the reward is below baseline, then probability is decreased. The non-selected actions move in the opposite direction.

## 7 Associative Search (Contextual Bandits)
