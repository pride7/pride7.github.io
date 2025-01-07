---
title: 使用HPC遇到的问题
published: 2023-09-09
description: 这篇帖子将简述本人在连接学校服务器运行代码过程中遇到的问题。
# image: 
tags: [CLI, Linux]
category: 工具
draft: false
---

​为了使用 HPC，即学校的服务器跑代码，我遇到了诸多困难，在这个过程中，感谢友人 C 的帮助，最终得以成功，下面讲简单阐述这个过程中遇到的问题。（注意我使用的是 Windows11 系统）

## 1 Linux 基本命令及理解

​ 简单来说，Linux 指令基本是通过`可执行文件 + 参数`这种形式构成。

​ 而第一个可执行文件通常情况下，是需要告诉 shell 可执行文件在哪里，因此需要加上相应的路径。而如果我们配置了**环境变量**，那么 shell 首先会在当前目录下查找可执行文件，然后会依次在环境变量的路径下查找可执行文件。

## 2 连接远程服务器

### 2.1 通过 ssh 命令连接远程服务器

​ 这是第一步。首先需要连接上相应的服务器。

​ 在 Windows11 系统下，由于自带了 OpenSSH，所以我们可以直接在 Power Shell 中采用`ssh username@target_ip`进行连接。

​ 正常情况下，这样连接需要输入密码，反复这样操作是相当麻烦的。因此，我们可以通过配置密钥文件实现**免密连接**。具体操作如下：

1. 在命令行中输入`ssh-keygen -t rsa`。这样会在`C:/Users/username/.ssh/`目录下生成`id_rsa`以及`id_rsa.pub`文件，第一个文件是我们的私钥，第二个是公钥。

2. 将公钥拷贝到目标服务器`~/.ssh/authorized_keys/`目录(用户目录)下。采用`scp c:/users/…/.ssh/id_rsa.pub username@target_ip:/~/.ssh/authorized_keys`命令。

3. 直接采用 ssh 命令连接目标服务器即可。

### 2.2 设置跳板机

​ 由于连接该服务器需要先进入内网，所以需要先连接跳板机，然后再连接该服务器才行。

​ 常见的方式是 `ssh -J username@jump_ip username@target_ip`

​ 不过这样连接会很麻烦，因此需要设置配置文件。

​ 找到`C:/Users/username/.ssh/config`用记事本打开（没有就新建）。然后可以采用如下格式设置。

```shell
Host JumpProxy
  HostName
  User
  Port

Host targetServer
  HostName
  User
  Port
  ProxyJumpy JumpProxy
```

​ 然后直接采用`ssh targetServer`即可。

### 2.3 ssh 连接超时中断

​ 最后，还有一个问题：ssh 超时，连接中断。即连接上目标服务器后，如果一段时间没有操作，那么连接就会中断。关于这点，我们直接在上面`config`配置文件中，targetProxy 后加上`ServerAliveInterval 60`即可。这样 ssh 会每 60 秒发送一个 KeepAlive 请求，保证终端不会因为超时空闲而断开连接。

## 3 提交任务

​ 该服务器上使用 TorquePBS 命令进行提交任务。

​ 对于用时较短的任务，可以使用交互式操作。通过`qsub -I `再加上其他参数，例如`-l walltime=30:00`，`-l nodes=1:vortex:ppn=8`等，然后就可以分配到相应的节点直接操作即可。

​ 对于用时较长的任务，需要使用 batch system。此时，需要编写相应的脚本。相关操作命令如下

```shell
touch script #创建一个新的脚本
vim script #进行编辑，内容如下
cat script #可查看脚本的内容

qsub script #提交脚本
qstat #查询所有job
qsu #查询当前用户job
qdel job_ID #移除job
```

​ 脚本内容如下所示：

```shell
#!/bin/tcsh
#PBS -N job_name
#PBS -l nodes=1:vortex:ppn=12
#PBS -l walltime=1:00:00
#PBS -j oe
cd #PBS_O_WORKDIR
module add anaconda3
conda activate pytorch
python ~.py
```

此处需要注意，`#PBS -l nodes=1:vortex:ppn=12`中 vortex 指定节点类型，此处应设置与 ssh 连接的服务器节点类型一致，否则会存在添加 module 失败的问题;`cd #PBS_O_WORKDIR`可以让服务器 cd 到用户提交 job 的路径;而`module add anaconda3`添加模块后，环境变量中才会有 anaconda，在第 8 行中才可以直接使用 conda 命令，否则需要采用绝对路径。
