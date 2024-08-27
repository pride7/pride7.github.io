---
title: Typst制作slides模板
published: 2024-08-25
description: 使用Typst制作slides模板的教程
tags:
  - typst
category: 技术
draft: false
---
在制作 Slides 过程中，配置文件的设置是关键的一步。这意味着，在使用模板时，我们会输入新的配置信息，并且所有相关的函数都应该以这些新的配置信息为输入。

在 LaTeX 中，加入配置信息非常简单，可以直接使用 `\author{}` 这样的方式。然而，在 Typst 中，设置相对麻烦一些。通常有两种常见的方法：
1. 使用闭包
2. 设置全局变量

## 1 使用闭包
使用闭包可以通过两种方式实现。 

**方式一**：

首先，正常编写需要的函数，例如 `slide` 函数，这些函数需要配置信息作为输入。然后，通过一个函数（例如 `register`），将这些配置信息作为输入，重新定义之前的函数，并以闭包形式返回。这样，就不需要每次都手动输入配置信息了。
```typst
#let register(title: none, author: none, datetime: none) = {
  //闭包
  (
    title-slide: () => {
      title-slide(
        title: title,
        author: author,
        datetime: datetime,
      )
    },
    outline-slide: (spacing: 50pt) => {
      outline-slide(title:title, spacing: spacing)
    },
    section-slide: (numbering: true, body) => {
      section-slide(title: title, numbering: numbering, body)
    },
    section-slide-n: (numbering: false, body) => {
      section-slide(title: title, numbering: numbering, body)
    },
    slide: body => {
      slide(
        title: title,
        author: author,
        datetime: datetime,
        body,
      )
    },
    slides: body => {
      slides(title: title, body)
    },
  )
}
```
**方式二**：  
直接编写一个 `register` 函数，并在函数内部定义其他函数，最后返回闭包。这样相对于第一种方式的优势在于，其他函数不需要每次将配置信息作为输入，只需要 `register` 函数的输入即可。

## 2 设置全局变量
使用全局变量的好处在于不需要闭包，并且无需返回多个函数，使用起来更加方便。不过，可能会因为使用到 `context` 而稍微影响速度。
首先，可以在模板中定义全局变量，例如：
```typst
// 定义初始配置
#let initial-config = (
  title: "Default Presentation Title",
  primary-color: blue,
  secondary-color: gray,
  font-size: 24pt,
)

// 创建一个状态变量来存储配置
#let config-state = state("config", initial-config)

// 更新配置的函数
#let update-config(new-config) = {
  config-state.update(current => current + new-config)
}
```
然后在编写 `slide` 函数时，直接调用全局变量即可，而无需将其作为输入。但需要注意，调用全局变量时使用 `get()` 函数，并且必须在 `context` 环境下，因此通常的写法是：
```typst
#let slide(args: none) = context {
  ...
}
```
在使用模板时，直接使用 `#update-config()` 函数更新配置即可。这种方式相对简洁。