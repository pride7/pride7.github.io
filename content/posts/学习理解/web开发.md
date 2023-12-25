---
title: web开发
slug: web
date: 2023-12-24
categories:
  - 学习
tags:
  - html
  - css
summary: "这是学习网页开发的一些笔记。"
---

## HTML 文档结构

首先，html 是一门标记语言。对于每一个 html 文档，其实就是用这种语言告诉计算机每一部分应该表达什么内容。

html 文档的结构，一般是下列形式：

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body></body>
</html>
```

首先需要告诉计算机文档类型，也就是使用什么语言去翻译它。然后就是创建一个`html`元素。每一个`html`元素中包含两个部分：

- head：用于指定文档的一些信息，不会显示在网页中。其中一定包含一个`<title>`元素。
- body：网页的具体内容。也就是用户看到的部分

# 基本元素

- `<h1></h1>`：一共有 6 级标题。注意每一个网页应只有 1 个一级标题，虽然不会报错。
- `<p></p>`：段落
- `<strong></strong>`：加粗
- `<em></em>`：斜体，em 其实就是 emphasis，强调。
- `<ol></ol>`：表示有序列表，而对于每一个列表项用`<li></li>`,表示 list item。
- `<ul></ul>`：表示无序列表，列表项同样。

# 图片与属性

`<img>`是一个特殊的标签，因为它没有内容，所以也没有结束标签。所以我们直接使用`<img />`

我们采用特征`Attributes`来描述这个元素，例如,我们要添加图片, `<img src="" />`。下面简单整理一下`<img>`的特征：

- `src`：src=""指定图片的路径
- `alt`：alt=""。表示 alternative text，用于描述图像。可以用于搜索引擎认知该图像
- `width`：wid="500"。指定图像的宽度
- `height`: height="200"。指定图像的高度

同样，对于`<html>`元素，可以指定`lang="en"`来表示其内容的语言
而对于网页内部的比如字符编码，则是在`<head>`中指定。采用`<meta>`元素，这也表示 meta data，也即元数据，或者说数据的数据。

```html
<head>
  <meta charset="UTF-8" />
</head>
```

`<meta>`元素有一个`charset`属性。
