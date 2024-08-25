---
title: obsidian同步
published: 2023-10-10
description: 关于实现obsidian三端同步的方法。
# image: 
tags: [github, obsidian]
category: 技术
draft: false
---

通过 github 来保持 obsidian 电脑端，手机端和平板端的同步。
<!--more-->

1.首先通过 github 创建一个私人仓库。

2.将私人仓库拉取到本地。步骤

- github：Settings—Developer Settings—Personal access tokens—Tokens(classic)—Generate new token。 然后复制 token。替换 Token 即可，`https://user:Token@ghproxy.com/https://github.com/.../....git`，得到 clone 的地址。然后再采用 git clone …即可。

  3.把.git 文件 copy 到 obsidian 的库中

  4.obsidian 安装 obsidian git 插件（然后全部 push 即可）

  5.移动端下载 GMit，首先修改库的路径，然后生成 ssh 密钥，在 github 中加入 ssh 密钥。

  6.移动端通过 github 的 ssh 地址拉取。




