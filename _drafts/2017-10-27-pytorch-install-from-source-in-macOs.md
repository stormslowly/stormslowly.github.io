---
layout: post
title:  "[afterCode] 从源代码安装 pytorch "
date:   2017-10-20 10:50:00
categories:  aftercode pytorch
---

# 0x0

macOs 上虽让用 pip 可以很方便的安装 pytorch, 但是安装 pytorch 是不支持 CUDA 的. 在训练复杂
网络的时候就会比较耗费时间. 按照 pytorch 的官网看的话需要支持 CUDA 的话需要自行编译. 
自己编译了一次记录在此.


#前提

* brew 安装








```text
export CMAKE_PREFIX_PATH=/Users/administrator/miniconda3
conda install numpy pyyaml setuptools cmake cffi

MACOSX_DEPLOYMENT_TARGET=10.9 CC=clang CXX=clang++ python setup.py install

```


# 完
希望大家喜欢.