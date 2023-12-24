---
title: git的基本使用
slug: git
date: 2023-12-23
categories:
  - git
tags:
  - git
autoThumbnailImage: yes
#thumbnailImagePosition: left
#thumbnailImage: //d1u9biwaxjngwg.cloudfront.net/chinese-test-post/vintage-140.jpg
summary: "关于git的基本使用，本文基于Pro Git第二版。"
---

## Git基础
### 创建git仓库
- 初始化仓库：在当前目录下，终端输入`git init`，然后会得到一个`.git`文件，然后便完成了仓库的初始化。
- 克隆已有的仓库：`git clone [url]`。这会得到和克隆仓库相同的文件夹，同样也可以指定文件夹名，例如`git clone [url] mygit`。

## Git分支
### 分支
- 创建一个新的分支： `git branch name`。这会创建一个名叫`name`的指针指向当前的commit。但是这并不会让HEAD指针切换到`name`分支上。
- 查询方法：可以很简单的通过`git log`查询。但是一般情况下可以加上`--oneline`命令和`--decorate`命令，前者只会显示ID和提交信息，后者可以显示指向commit的所有指针（包括分支和标签）。也可以再结合`--graph`命令，这样会显示分支图。
- 切换分支：`git checkout branch_name`。




