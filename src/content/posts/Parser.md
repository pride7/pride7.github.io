---
title: Python中Parser的使用
published: 2024-08-30
description: 学习如何在Python中使用argparse模块来定义和管理命令行参数。
tags:
  - python
  - cli
category: 技术
draft: false
---
在使用Python脚本时，能够灵活地管理命令行参数是非常有帮助的，尤其是在运行一些实验的代码时。`argparse`模块就是这样一个强大的工具，它能让你轻松定义和处理各种命令行参数。接下来，让我们通过一个简单的例子来了解它的使用方法。

## 入门argparse

要使用`argparse`，首先需要创建一个`ArgumentParser`对象，添加你想要的参数，然后解析命令行输入。以下是一个基本示例：
```python
import argparse

parser = argparse.ArgumentParser(description='一个简单的示例程序')
parser.add_argument('--foo', type=int, help='一个整数参数')
args = parser.parse_args()

print(f"foo的值是: {args.foo}")
```
用法非常简单，首先创建一个参数解析器，然后使用`add_argument()`方法来添加一个命令行参数`--foo`，最后用`parse_args()`方法来获取命令行中传递的参数。

## 实例化ArgumentParser
`ArgumentParser`是`argparse`模块的核心，用于管理命令行参数。创建时可以设置一些基本信息：
```python
parser = argparse.ArgumentParser(
                    prog='ProgramName',
                    description='What the program does',
                    epilog='Text at the bottom of help')
```
虽然这些参数不是必需的，但给`description`设置一个简单的描述可以帮助用户更好地了解你的程序。

## 使用add_argument()来添加参数

接下来，我们可以使用`add_argument()`方法来添加命令行参数。以下是一个例子：
```python
parser.add_argument('filename')           # positional argument
parser.add_argument('-c', '--count')      # option that takes a value
parser.add_argument('-v', '--verbose',
                    action='store_true')  # on/off flag
```

首先是参数名的设置，`filename`将设置一个位置(positional)参数，该参数是必要的，并且在输入时不需要制定参数名字，而是按照输入的顺序对应参数。`--count`和`-c`是指定一个可选(optional)参数以及其对应的缩写。

- **位置(positional)参数**：`filename`是一个位置参数，表示必须提供这个参数，它会按照输入顺序解析。
- **可选(optional)参数**：`--count`和`-c`是一个可选参数及其简写。

### add_argument()的常用参数
`add_argument()`有很多有用的参数，以下是一些常用的选项：
- **`type`**：指定参数的类型，比如`int`或`float`，默认情况下所有参数都是字符串。
- **`help`**：帮助信息，当用户使用`--help`或`-h`时显示。
- **`default`**：参数的默认值，如果命令行没有提供该参数，就会使用这个默认值，默认情况下`default=None`。
- **`nargs`**：指定参数接受的值的数量，所有输入的值（如果有）会被放到一个列表中，比如：
    - `'?'`：最多接收一个值
    - `'*'`：接收任意数量的值
    - `'+'`：至少接收一个值
    - `N`：接收固定数量的值
示例：
```python
parser.add_argument('--foo', nargs='?', help='可选参数，最多接收一个值')
parser.add_argument('--bar', nargs='*', help='任意数量的值')
parser.add_argument('--baz', nargs='+', help='至少一个值')
parser.add_argument('--qux', nargs=2, help='需要两个值')
```

- **`action`**：指定在解析到参数时要执行的动作，例如：
    - `'store'`（默认）：将值存储到变量中。
    - `'store_true'`/`'store_false'`：存储布尔值`True`或`False`，通常用于启用或禁用特定行为的开关。
    - `'store_const'`：存储一个预定义的常量值，常与 `const` 一起使用。通常用于标志（flags），不需要值，只需要指定该选项就能触发操作。
    - `'version'`：显示程序的版本信息并退出，通常与 `--version` 参数一起使用。
示例
```python
parser.add_argument('--foo', action='store_const', const=42, help='存储常量 42')
```
在命令行中执行`--foo`后，`args.foo`的值会被设置为42。
```python
parser.add_argument('--version', action='version', version='%(prog)s 1.0')
```
运行 `--version` 后，将输出类似于 `my_program 1.0` 并退出。

## 解析命令行参数：parse_args()
调用`parser.parse_args()`会自动读取命令行中的参数，并返回一个包含所有参数的对象。你可以通过点号语法（`.`）访问每个参数的值。

示例：
```python
import argparse

# 创建 ArgumentParser 对象
parser = argparse.ArgumentParser(description='一个示例程序')

# 添加命令行参数
parser.add_argument('--foo', type=int, help='一个整数参数')
parser.add_argument('--bar', type=str, help='一个字符串参数', default='默认值')
parser.add_argument('--verbose', action='store_true', help='启用详细模式')

# 解析命令行参数
args = parser.parse_args()

# 使用解析的参数
print(f"foo: {args.foo}")
print(f"bar: {args.bar}")
print(f"verbose: {args.verbose}")
```

运行此代码时，可以传入不同的命令行参数来看到不同的输出结果。