---
title: pytorch的使用
author: pride7
pubDatetime: 2023-12-17
slug: pytorch
featured: false
# ogImage:
tags:
  - python
  - pytorch
description: "简单记录一下使用pytorch应注意的地方"
---

pytorch已经用了很长一段时间了，但有时依然会遇到一些问题，先简单记录一下使用时应注意的地方。

## tensor的维度
在使用神经网络时，经常会遇到，因为tensor维度，导致报错的情况。最需要注意的一点就是，$1 \times n& 的2维tensor，以及长度为n的1维tensor。前者通常是`[[1],[1],[1]]`这种类型，后者则是`[1,1,1]`这类。
### 获取tensor的大小 
Tensor.size(dim=None) :会直接返回`self`tensor的大小，如果`dim`没有指定，那么返回指使`torch.Size`（`tuple`的子集）。
### 调整大小
降维: $1 \times n$ - 1维 \
可以采用`torch.squeeze(input, dim)`函数，如果不输入参数dim，那么会将`size`中所有为1的全部去掉，否则，只去掉指定维度。

升维：\
刚好相反，可以采用`torch.unsqueeze(input, dim)`函数，dim表示，在第几个维度增加一个维度。简单来讲，dim是指"1"会加哪一个维度，例如，对于size为(3,2)的tensor，如果作用于dim=0,也就是1加在第0个维度，或者说成为第0个维度，那么新的size为(0,3,2)。

当然，最直接的函数是采用`tensor.view()`调整，例如`a.view(4, 4)`。

## torch.tensor()与torch.Tesnor()
- torch.Tensor实际上是一个类，也是torch.FloatTensor的别名。所以如果传入数据，实际上就是调用相应的构造函数，并且`type`为`torch.Tensor`也即`torch.FloatTensor`,`dtype`为`torch.float32`。在调用时，不能指定dtype。
- torch.tensor(data, dtype=None, device=None, requires_grad=False)是一个函数。调用时，可以指定`dtype`，如果不指定，会根据数据进行推断。如果是整数的话，就是`torch.int64`。
- torch.Tensor()可以创建一个空张量，而torch.tensor()不行。
- 输入为一个数字，torch.Tensor(7)会输出一个一维张量，长度为7。而torch.tensor(7)则是只会输出一个数字。

## 损失函数
运算过程中，由于不合适的操作，比如通过`list`然后再转化为`Tensor`导致梯度消失，损失函数不更新。\
loss(input, target),注意`target`一定要是一个不能被训练更新的量，(通常会使用`.detach()`)