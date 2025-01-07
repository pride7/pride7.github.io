---
title: Python并行处理之多线程
published: 2024-08-28
description: 在跑项目代码中利用python多线程技术的总结。
tags:
  - DevTools
category: 工具
draft: false
---
本文将简单讨论Python中的多线程技术。

## 1 基本概念：并发vs并行

在深入Python的多线程之前，我们需要理解两个关键概念：

- **并发（Concurrency）**：是指程序的逻辑结构。并发程序有多个独立的执行单元，它们可以独立运行，也可以相互交互。
- **并行（Parallelism）**：是指程序的运行状态。并行是指多个任务同时在不同的物理处理器上执行。

并发是关于结构，并行是关于执行。一个并发的程序可能在单核处理器上运行（此时不是并行的），也可能在多核处理器上并行运行。

## 2 Python中的GIL（全局解释器锁）

GIL是Python解释器（CPython）中的一个机制，它确保同一时刻只有一个线程在执行Python字节码。这意味着在CPython中，多线程并不能充分利用多核处理器来实现真正的并行计算。

然而，这并不意味着多线程在Python中毫无用处。对于I/O密集型任务，多线程仍然可以显著提高程序的性能。

## 3 多线程编程：threading模块

Python的`threading`模块提供了创建和管理线程的基本工具。以下是一个简单的例子：
```python
import threading
import time

def worker(name):
    print(f"Worker {name} starting")
    time.sleep(2)
    print(f"Worker {name} finished")

threads = []
for i in range(5):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print("All workers finished")
```
这个例子创建了5个工作线程，每个线程都会"工作"（在这里模拟为睡眠）2秒钟。

## 4 高级线程管理：concurrent.futures
`concurrent.futures`模块提供了更高级的工具来管理线程（和进程）。特别是`ThreadPoolExecutor`类，它实现了一个线程池，可以更有效地管理和重用线程。
```python
from concurrent.futures import ThreadPoolExecutor, as_completed 
import time 

def worker(name): 
    print(f"Worker {name} starting") 
    time.sleep(2) 
    return f"Worker {name} finished" 

with ThreadPoolExecutor(max_workers=3) as executor: 
    futures = [executor.submit(worker, i) for i in range(5)] 
    for future in as_completed(futures): 
        print(future.result()) 
        
print("All workers finished")
```

一些说明：
- 这个例子创建了一个最多包含3个线程的线程池，并提交了5个任务。
- `future.result()` 会返回与 `Future` 对象关联的函数的 `return` 值。
- `as_completed` 函数返回一个迭代器，该迭代器在每个 `Future` 对象完成时依次生成它们。可以用它来处理结果，而不需要等待所有任务完成才开始处理。

## 5 实际案例：并行处理大规模数据
让我们看一个更实际的例子，假设我们需要处理一个大型列表，对每个元素进行耗时的计算：
```python
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

def process_item(item):
    # 模拟耗时操作
    time.sleep(0.1)
    return item * item

def process_list_parallel(item_list, max_workers=4):
    results = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [executor.submit(process_item, item) for item in item_list]
        for future in as_completed(futures):
            results.append(future.result())
    return results

# 创建一个大列表
large_list = list(range(100))

# 测量并行处理时间
start_time = time.time()
parallel_results = process_list_parallel(large_list)
end_time = time.time()
print(f"Parallel processing time: {end_time - start_time:.2f} seconds")

# 测量串行处理时间
start_time = time.time()
serial_results = [process_item(item) for item in large_list]
end_time = time.time()
print(f"Serial processing time: {end_time - start_time:.2f} seconds")
```
这个例子展示了如何使用`ThreadPoolExecutor`来并行处理一个大列表。尽管受到GIL的限制，对于I/O密集型任务，这种方法仍然可以显著提高性能。

## 6 性能考虑和最佳实践

在使用Python多线程时，需要考虑以下几点：

1. **I/O密集 vs. CPU密集**：对于I/O密集型任务，多线程可以显著提高性能。对于CPU密集型任务，考虑使用多进程（`multiprocessing`模块）来绕过GIL的限制。
2. **线程数量**：线程数量不是越多越好。通常，线程数量应该与CPU核心数相当。过多的线程可能会导致性能下降。
3. **资源共享和同步**：当多个线程访问共享资源时，使用锁（`Lock`）或其他同步原语来防止竞态条件。
4. **避免死锁**：小心设计你的程序，以避免死锁情况的发生。