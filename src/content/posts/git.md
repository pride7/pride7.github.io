---
title: git的基本使用
published: 2023-12-23
description: 关于git的基本使用，本文基于Pro Git第二版。
# image: 
tags: [git]
category: 技术
draft: false
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
- 创建并切换到分支：`git checkout -b branch_name`

## 基本分支和合并(例子)
1. 创建一个新的分支`iss53`用于在issue #53上继续进行。
2. 然后现在，需要需要切换回原来的`master`分支，修复一个bug。
3. 我们创建一个新的`hotfix`分支，来修复bug。
4. 修复好并测试之后，确保`hotfix`没问题，然后就可以进行合并工作，把`hotfix`合并到`master`分支：
  ```shell
  git checkout master
  git merge hotfix
  ```
5. 现在已经不需要`hotfix`分支，运行`git branch -d hotfix`删除该分支。
6. 切换回`iss53`分支，继续工作。
7. 现在issue #53已经完成，并且准备合并到`master`分支中。采取第4步相同的操作。（这会创建一个新的快照，并且master分支指向它）
8. 删除`iss53`分支。

## 合并中的分歧

如果发生分歧，此时并不会直接提交一个新的commit。可以使用`git status`来查看合并中的分歧。然后可以打开产生分歧的文件，里面会有git的标记。然后手动选择一个即可。最后再commit即可。
注意：还有一个技巧就是使用`git mergetool`。

## 分支管理
- 可以通过`git branch`或`git branch -v`查看，后面一项能看到最后一次提交的commit。
- `git branch --merged`来查看和当前分支（HEAD所指）合并的分支，`git branch --no-merged`来看没合并的。
- `git branch -d -D branch_name`可以强制删除(`-D`)分支。

## 分支工作流

### 持续时间长的分支


