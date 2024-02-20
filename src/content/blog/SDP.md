---
title: 关于半正定规划(SDP)的一道有趣题目
author: pride7
pubDatetime: 2024-02-20
slug: SDP
featured: True
# ogImage:
tags:
  - optimization
  - postive semidefinite programming

description: "这道题目有点意思，想了很久"
---

For given $X \in S^m_+$, find the optimal value of the following SDP:

$$
\begin{aligned}
&\text{minimize} &&\mathbf{tr}\ V \\
&\text{subject to} &&
\begin{bmatrix}
X &U \\
U &I
\end{bmatrix}
\geq 0, \quad
\begin{bmatrix}
U &X \\
X &V
\end{bmatrix}
\geq 0,
\end{aligned}
$$

with variables $U,V \in S^m$.
