---
title: git本地配置不同账户
published: 2023-12-16
description: 关于在本地配置不同的github账号进行pull和push。
# image: 
tags: [git, github]
category: 技术
draft: false
---

由于同时使用多个 github 账号，在本地的 git 进行配置时，需要分别配置。简单来说需要分别配置本地和全局的。
对于全局的配置，很简单。

```shell
git config --global user.name "username"
git config --global user.email "useremail@163.com"
```

对于本地的配置，首先需要--local 命令修改 user 和 email。
不过，我直接修改`.git/config`文件

```text
[remote "origin"]
	url = https://localusername@github.com/localusername/localusername.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[user]
	name = localusername
	email = localuseremail@163.com

```
