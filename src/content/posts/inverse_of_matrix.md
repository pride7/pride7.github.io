---
title: 矩阵的逆
published: 2023-10-25
description: 关于矩阵逆的一些简单理解。
# image: 
tags: [数学]
category: 学习
draft: false
---

下面是关于矩阵逆的一些理解。

## 1 方阵的逆

对于一个方阵$A_{n\times n}$，我们可以直接通过$\det(A)$进行判断该方阵$A$是否可逆。
我们把$A$的逆矩阵记为$A^{-1}$。简单来看，我们知道，其满足如下性质

$$
AA^{-1}=I
$$

$$
A^{-1}A=I
$$

注意，通常情况下，矩阵乘法不满足交换律

实际上，我们会进一步定义左逆矩阵和右逆矩阵。下面给出粗略的定义。

**定义 1**：我们称满足$BA=I$的矩阵$B$为$A$的左逆矩阵，满足$AC=I$的矩阵$C$为 A 的右逆矩阵。

对于方阵而言，左逆矩阵和右逆矩阵是相同的。

$$
B=B(AC)=(BA)C=C
$$

同时，该过程也同时说明，逆矩阵的唯一性，由此，我们得到如下结论

**结论 1**：对于方阵而言，右逆矩阵与左逆矩阵相同

**结论 2**：对于方阵而言，逆矩阵具有唯一性。

## 2 矩阵的逆

下面，我们将逆的概念推广到一般的矩阵$A_{m\times n}$.

再次给出左逆矩阵和右逆矩阵的定义

**定义 2(左逆矩阵)**：对于一个矩阵$A_{m\times n}$，如果存在矩阵$B_{n\times m}$,满足$BA=I_{n\times n}$,我们称矩阵$A_{m\times n}$是**左可逆的**，并且$B$矩阵叫做$A$的**左逆矩阵**。

**定义 3(右逆矩阵)**：对于一个矩阵$A_{m\times n}$，如果存在矩阵$C_{n\times m}$,满足$AC=I_{m\times m}$,我们称矩阵$A_{m\times n}$是**右可逆的**，并且$C$矩阵叫做$A$的**右逆矩阵**。

如果一个矩阵同时存在左逆矩阵和右逆矩阵，我们可以根据前面的推导过程得出，左逆矩阵和右逆矩阵是相同的。

但实际上，一个矩阵同时存在左逆矩阵和右逆矩阵当且仅当该矩阵为方阵。为了说明这一点，我们先从矩阵的本质，线性映射的角度来看。

## 3.逆的本质

<div align=center>
    <img src="/src/pages/posts/images/map.jpg" alt="map" style="width:75%;" />
</div>

矩阵$A$将$x$映射为$b$，也即$Ax=b$.

如果矩阵可逆，也即存在一个逆操作，可以将矩阵$A$的效果抵消。

我们分别从向量空间$V$和$W$来看。

从$V$来看，我们通过矩阵$A$将向量$x$映射到$b$,即$Ax=b$。我们希望$Bb=x$，能将$b$映射回去，变为$x$，抵消$A$的效果。

从这个角度来看，我们要找的$B$矩阵是$A$的左逆矩阵，因为我们先进行 A 操作（向右），然后再进行 B 操作（向左），用式子表达为$BAx=x$,也即$BA=I$。可以看到左逆矩阵后操作。

那什么样的条件，$B$才存在呢？

其实根据上面的步骤，我们可以看到，$B$的作用是根据$b$确定唯一的$x$，也就是说对于式子$Ax=b$要存在唯一解才行，这实际上也是要求$A$的零空间为$\{\mathbf 0\}$。因此要求矩阵$A$列满秩。

当矩阵$A$列满秩时，我们可以构造$B=A^T(AA^T)^{-1}$为$A$的左逆矩阵。

**结论 3**：左逆矩阵存在当且仅当矩阵$A$列满秩

从$W$来看，我们通过$B$将$b$映射到$x$，即$Bb=x$,然后又希望$A$可以映射回$b$,即$Ax=b$。

注意到，此时我们希望满足$ABb=Ax=b$，即$AB=I$。$B$矩阵先作用，因此也在右边，所以叫做右逆矩阵。

类似，满足什么样的条件$B$才存在呢？

需要当$B$的零空间为$\{\mathbf0\}$，此时$Bb=x$有唯一解，相应的有$A$行满秩。

构造$B=(A^TA)^{-1}A^T$

**结论 4**：右逆矩阵存在当且仅当矩阵$A$行满秩

由此我们可以发现，左逆矩阵和右逆矩阵同时存在当且仅当$A$行列都满秩，即$A$为方阵。

**结论 5**：左逆矩阵和右逆矩阵同时存在当且仅当方阵$A$满秩

进一步，对于一般矩阵而言，如果仅满足行或列满秩，那么仅存在右逆矩阵或左逆矩阵。

此时，我们无法通过前面的证明来说明$A$的左逆矩阵或右逆矩阵是唯一的。因此，我们有

**结论 6**：对于一个矩阵$A_{m\times n}$($m\ne n$)，如果其存在左逆矩阵或右逆矩阵，那么其左逆矩阵或右逆矩阵不是唯一的。
