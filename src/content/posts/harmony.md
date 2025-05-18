---
title: 鸿蒙开发入门
published: 2025-05-18
description: 简单记录一下鸿蒙入门的一些知识。
tags: [鸿蒙]
category: 开发
draft: false
---

这里可能还是以ArkTS为主，主要是因为ArkUI声明式的会比较方便，可能会面有需求再用仓颉，之前简单看过仓颉的语法，其实感觉有点把多个语言的特点缝合起来的感觉，也有rust的影子，可能未来对性能或一些特定功能有高需求才会使用。

## 入门

`struct`是用来实现组件的，不能有继承关系。

`@Entry`：用来标记某个自定义组件是该UI界面的“入口组件”。换句话讲，告诉鸿蒙“从这里开始”加载和渲染页面UI。

`@Component`: 这个的话，仅用于修饰`struct`类型，其实表面这个`struct`是UI组件，然后就需要对该`struct`实现`build()`方法，来描述如何构建UI界面的。

`@State`：给变量打上`@State`，表示这是一个响应式状态变量。当这个变量的值改变时，组件会自动重新渲染（调用 build()），更新界面对应部分。

`Column()`代表一个竖直方向的容器，里面的子组件会从上到下依次排列。

`Row()`：水平布局，子组件从左往右排列。

`RelativeContainer()`：给里面的子组件一个“参照框架”，让它们的绝对定位基于这个容器的位置来计算。

这样基本就能看懂下面这段代码了。
```ArkTs
@Component
struct MyComponent {
  @State count: number = 0;

  build() {
    Column() {
      Text('Count: ' + this.count.toString());
      Button() {
        Text('Increase');
      }.onClick(() => {
        this.count += 1;  // 修改@State变量，触发界面更新
      })
    }
  }
}
```