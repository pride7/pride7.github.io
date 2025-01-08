---
title: d4rl安装-Linux
published: 2024-10-14
description: 在linux上部署d4rl所需的环境。
tags:
  - Linux
  - DevTools
  - 强化学习
category: 工具
draft: false
---
## 1 搭建mujoco210

首先下载mujoco210，放到`~/.mojoco/`路径下，可以直接采用以下脚本完成

```bash
MUJOCO_DIR=~/.mujoco
mkdir -p $MUJOCO_DIR

# 210
wget https://github.com/deepmind/mujoco/releases/download/2.1.0/mujoco210-linux-x86_64.tar.gz -O $MUJOCO_DIR/mujoco210.tar.gz
tar -xzf $MUJOCO_DIR/mujoco210.tar.gz -C $MUJOCO_DIR
rm $MUJOCO_DIR/mujoco210.tar.gz
```

然后需要把mujoco添加到环境变量，采用`vim ~/.bashrc`然后需要把mujoco添加到环境变量

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$HOME/.mujoco/mujoco210/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/nvidia
export MUJOCO_KEY_PATH=~/.mujoco${MUJOCO_KEY_PATH}
```

## 2 安装mujoco-py

```bash
pip install mujoco_py
```

可以进入python环境，导入看是否报错

```bash
import mujoco_py
```

### 常见错误1 --- `pip install 'cython<3'`​

注意：Cython的版本需要<3，运行

```bash
pip install 'cython<3'
```

### 常见错误2 --- `distutils.errors.CompileError: command 'gcc' failed with exit code 1`​

此时退出python环境，运行

```bash
sudo apt-get install libgl1-mesa-dev
```

或者

```bash
apt-get install -y libgl1-mesa-dev libgl1-mesa-glx libglew-dev libosmesa6-dev software-properties-common gcc
```

如果没有root的权限，例如在服务器上，参考一下步骤

首先

```bash
conda install -c conda-forge glew
conda install -c conda-forge mesalib
conda install -c menpo glfw3
```

然后要添加环境变量, 在当前conda环境下运行，也可以永久添加到.bashrc

```bash
export CPATH=$CONDA_PREFIX/include
```

### 常见错误3 ---`No module named 'numpy.core.\_multiarray\_umath'​`

这个是因为numpy的版本太新了，需要降级

```shell
conda install numpy=2.1.2
```

## 3 安装patchelf

```bash
pip install patchelf
```

## 4 安装d4rl

```bash
pip install git+https://github.com/Farama-Foundation/d4rl@master#egg=d4rl
```
