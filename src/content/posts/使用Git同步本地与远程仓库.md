---
title: 使用Git同步本地与远程仓库
published: 2024-09-23
description: 在做项目时，经常会遇到在本地和远程都需要跑项目的时候，这种时候利用git进行同步管理就很方便。
tags:
  - git
category: 技术
draft: false
---
该教程主要源自于我跑项目代码时，大多数时候在服务器上跑，少部分时候会在自己电脑上测试，因此也需要进行同步，方便管理。

## 1 创建裸仓库

首先，SSH登录到诚服务器，并创建一个裸仓库：
```bash
mkdir -p /path/to/repo.git
cd /path/to/repo.git
git init --bare
```

## 2 配置`post-receive`钩子
接着，配置 `post-receive` 钩子，使代码在推送后自动同步到工作目录：
```bash
nano /path/to/repo.git/hooks/post-receive
```
添加以下内容：
```bash
#!/bin/sh
GIT_WORK_TREE=/path/to/your/project GIT_DIR=/path/to/repo.git git checkout -f
```
保存后，赋予执行权限：
```bash
chmod +x /path/to/repo.git/hooks/post-receive
```

## 3 本地推送代码
在本地仓库中，添加远程仓库并推送代码：
```bash
git remote add origin ssh://your_user@server:/path/to/repo.git
git push origin master
```
推送后，代码会自动同步到 `/path/to/your/project` 目录。

以上方式十分简洁，适合快速配置Git裸仓库和自动部署。