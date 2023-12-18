---
title: pytorch的使用
date: 2023-12-18
categories:
  - 编程
tags:
  - python
  - pytorch
autoThumbnailImage: yes
#thumbnailImagePosition: left
#thumbnailImage: //d1u9biwaxjngwg.cloudfront.net/chinese-test-post/vintage-140.jpg
---

pytorch已经用了很长一段时间了，但有时依然会遇到一些问题，先简单记录一下使用时应注意的地方。
<!--more-->

# tensor的维度
在使用神经网络时，经常会遇到，因为tensor维度，导致报错的情况。最需要注意的一点就是，$1 \times n&的2维tensor，以及长度为n的1维tensor。前者通常是`[[1],[1],[1]]`这种类型，后者则是`[1,1,1]`这类。

降维: $1 \times -n$ - 1d
可以采用`torch.squeeze(input, dim)`函数，如果不输入参数dim，那么会将`size`中所有为1的全部去掉，否则，只去掉指定维度。

升维：
刚好相反，可以采用`torch.unsqueeze(input, dim)`函数，dim表示，在第几个维度增加一个维度。简单来讲，dim是指"1"会加哪一个维度，例如，对于size为(3,2)的tensor，如果作用于dim=0,也就是1加在第0个维度，或者说成为第0个维度，那么新的size为(0,3,2)。
